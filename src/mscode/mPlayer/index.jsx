import styles from './index.less';
import React, { Component } from 'react';
import Style from 'to-style';
import PlayerVm from './playerVm';
import KeyBoard from '../Keyboard/index.jsx';
import MonitorList from './monitor/containers/monitor-list.jsx';
import ConnectedIntlProvider from '@/lib/connected-intl-provider.jsx';
import imgPlayBtn from './images/btn_play.png';
import { Provider } from 'react-redux';
import redux from './store';
import Spin from '../Spin';
import Question from '@/containers/question.jsx';
import textProBase64 from './textProject';
import { Base64ToBlob, readAsArrayBuffer } from '../utils/base64';

const screenHeight = window.innerHeight;
const ratio = 0.75;
let submiting = false;

function preventTouchMove(e) {
  e.preventDefault();
}

class MPlayer extends Component {
  state = {
    loading: false,
    width: window.innerWidth,
    height: window.innerWidth * ratio,
    isLoadProject: false,
    isPlay: false,
    monitors: {},
    question: null,

    playerConStyle: {},
    canvasConStyle: {},
    stageSize: {
      widthDefault: 480,
      heightDefault: 320,
      width: window.innerWidth,
      height: window.innerWidth * ratio,
      scale: window.innerWidth / 480
    }
  };

  constructor(props) {
    super(props);
    this.playerVm = new PlayerVm();
  }

  componentDidMount() {
    this.playerVm.updateRect();
    this.canvasRef.appendChild(this.playerVm.canvas);
    this.playerVm.attachEvents(this.playerVm.canvas);

    // 监听变量
    this.playerVm.vm.on('MONITORS_UPDATE', monitors => {
      this.setState({ monitors });
    });
    this.playerVm.vm.runtime.addListener('QUESTION', this.questionListener);

    this.loadTextProject();
  }

  componentWillUpdate() {
    this.playerVm.updateRect();
  }

  componentWillUnmount() {
    this.playerVm.detachEvents(this.playerVm.canvas);
    this.playerVm.vm.stopAll();
    document.removeEventListener('touchmove', preventTouchMove);
    this.playerVm.vm.runtime.removeListener('QUESTION', this.questionListener);
  }

  setCanvasRef = ele => {
    this.canvasRef = ele;
  };

  questionListener = question => {
    this.setState({ question: question });
  };

  handleQuestionAnswered = answer => {
    this.setState({ question: null }, () => {
      this.playerVm.vm.runtime.emit('ANSWER', answer);
    });
  };

  // 先载入带文字的项目，修复自定义字体无法显示问题
  loadTextProject = async () => {
    try {
      const fileBlob = await Base64ToBlob(textProBase64);
      const fileArrayBuffer = await readAsArrayBuffer(fileBlob);
      this.playerVm.vm.clear();
      await this.playerVm.vm.loadProject(fileArrayBuffer);
    } catch (err) {}
  };

  // 加载项目
  loadProject = async () => {
    if (submiting) return;
    submiting = true;
    this.setState({ loading: true });
    try {
      const fileArrayBuffer = await this.props.getProject();

      this.playerVm.vm.clear();
      await this.playerVm.vm.loadProject(fileArrayBuffer);

      // 开始游戏
      this.playerVm.vm.greenFlag();
      this.setState({ isPlay: true, isLoadProject: true });
      document.addEventListener('touchmove', preventTouchMove, {
        passive: false
      });
    } catch (err) {
      console.log(err);
      $utils.errMsg(err);
    }
    this.setState({ loading: false });
    submiting = false;
  };

  // 开始游戏
  playGame = () => {
    if (this.state.isLoadProject) {
      this.playerVm.vm.greenFlag();
      this.setState({ isPlay: true });
      document.addEventListener('touchmove', preventTouchMove, {
        passive: false
      });
    } else {
      this.loadProject();
    }

    this.calculateStageSize();
  };

  // 停止游戏
  stopGame = () => {
    this.playerVm.vm.stopAll();
    this.setState({
      isPlay: false,
      stageSize: {
        widthDefault: 480,
        heightDefault: 320,
        width: window.innerWidth,
        height: window.innerWidth * ratio,
        scale: window.innerWidth / 480
      }
    });
    document.removeEventListener('touchmove', preventTouchMove);
  };

  // 计算舞台大小
  calculateStageSize() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let rem = (screenWidth / 375) * 100;
    let stageConBottom = 200 + 0.78 * rem;
    let stageConHeight = screenHeight - stageConBottom;

    if (screenWidth * 0.75 > stageConHeight) {
      this.setState({
        playerConStyle: {
          bottom: stageConBottom + 'px'
        },
        canvasConStyle: {
          width: 'auto',
          height: '100%'
        },
        stageSize: {
          widthDefault: 480,
          heightDefault: 320,
          width: stageConHeight / 0.75,
          height: stageConHeight,
          scale: stageConHeight / 320
        }
      });
    } else {
      this.setState({
        playerConStyle: {
          bottom: stageConBottom + 'px'
        },
        canvasConStyle: {
          width: '100%'
        },
        stageSize: {
          widthDefault: 480,
          heightDefault: 320,
          width: window.innerWidth,
          height: window.innerWidth * 0.75,
          scale: window.innerWidth / 480
        }
      });
    }
  }

  render() {
    const { data } = this.props;
    const {
      loading,
      stageSize,
      isLoadProject,
      isPlay,
      monitors,
      playerConStyle,
      canvasConStyle,
      question
    } = this.state;

    this.playerVm.canvas.style.cssText = Style.string({
      width: stageSize.width,
      height: stageSize.height
    });

    return (
      <Provider store={redux}>
        <div
          className={isPlay ? styles.fullscreen : styles.container}
          style={isPlay ? { height: screenHeight } : null}
        >
          <Spin spinning={loading} style={{ overflow: 'hidden' }}>
            <div className={styles.playerContainer} style={isPlay ? playerConStyle : {}}>
              <div
                className={styles.canvasCon}
                ref={this.setCanvasRef}
                style={isPlay ? canvasConStyle : {}}
              >
                <ConnectedIntlProvider>
                  <React.Fragment>
                    <MonitorList
                      draggable={false}
                      stageSize={stageSize}
                      monitors={monitors}
                      vm={this.playerVm ? this.playerVm.vm : {}}
                    />

                    {question === null ? null : (
                      <div className={styles.questionWrapper}>
                        <Question
                          question={question}
                          onQuestionAnswered={this.handleQuestionAnswered}
                        />
                      </div>
                    )}
                  </React.Fragment>
                </ConnectedIntlProvider>

                {!isPlay && (
                  <React.Fragment>
                    <div
                      className={styles.projectImg}
                      style={{ backgroundImage: `url(${data._coverUrl})` }}
                    />
                    <div className={styles.playBtn}>
                      <img src={imgPlayBtn} onClick={this.playGame} />
                    </div>
                  </React.Fragment>
                )}
              </div>

              <div className={styles.btnRow}>
                <div className={styles.btnCon} style={{ width: `${stageSize.width}px` }}>
                  <img
                    className={styles.startBtn}
                    src={require('../images/icon_start.svg')}
                    alt=""
                    onClick={this.playGame}
                  />

                  <img
                    className={styles.stopBtn}
                    src={require('../images/icon_stop.svg')}
                    alt=""
                    onClick={this.stopGame}
                  />
                </div>
              </div>
            </div>
          </Spin>
          <KeyBoard visible={isPlay} vm={this.playerVm.vm} />
        </div>
      </Provider>
    );
  }
}

export default MPlayer;
