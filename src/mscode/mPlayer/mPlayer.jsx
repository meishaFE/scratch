import React, { Component } from 'react';
import Style from 'to-style';
import PlayerVm from './playerVm';
import styles from './mPlayer.less';
import KeyBoard from '../keyboard/keyboard.jsx';
import MonitorList from './monitor/containers/monitor-list.jsx';
import ConnectedIntlProvider from '@/lib/connected-intl-provider.jsx';
import imgPlayBtn from './images/btn_play.png';
import { Provider } from 'react-redux';
import redux from './store';
import { Spin } from 'antd';

const ratio = 0.75;
let submiting = false;

function preventTouchMove(e) {
  e.preventDefault();
}

class Player extends Component {
  state = {
    loading: false,
    width: window.innerWidth,
    height: window.innerWidth * ratio,
    isLoadProject: false,
    isPlay: false,
    monitors: {},
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
  }

  componentWillUnmount() {
    this.playerVm.detachEvents(this.playerVm.canvas);
    this.playerVm.vm.stopAll();
    document.removeEventListener('touchmove', preventTouchMove);
  }

  componentWillUpdate() {
    this.playerVm.updateRect();
  }

  setCanvasRef = ele => {
    this.canvasRef = ele;
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
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
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
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
    } else {
      this.loadProject();
    }
  };

  // 停止游戏
  stopGame = () => {
    this.playerVm.vm.stopAll();
    this.setState({ isPlay: false });
    document.removeEventListener('touchmove', preventTouchMove);
  };

  render() {
    const { data } = this.props;
    const { loading, stageSize, isLoadProject, isPlay, monitors } = this.state;

    this.playerVm.canvas.style.cssText = Style.string({ width: stageSize.width, height: stageSize.height });

    return (
      <Provider store={redux}>
        <div className={isPlay ? styles.fullscreen : styles.container}>
          <Spin spinning={loading} style={{ overflow: 'hidden' }}>
            <div className={styles.playerContainer}>
              <div className={styles.canvasCon} ref={this.setCanvasRef}>
                <ConnectedIntlProvider>
                  <MonitorList
                    draggable={false}
                    stageSize={stageSize}
                    monitors={monitors}
                    vm={this.playerVm ? this.playerVm.vm : {}}
                  />
                </ConnectedIntlProvider>

                {!isLoadProject && (
                  <React.Fragment>
                    <div className={styles.projectImg} style={{ backgroundImage: `url(${data._coverUrl})` }} />
                    <div className={styles.playBtn}>
                      <img src={imgPlayBtn} onClick={this.playGame} />
                    </div>
                  </React.Fragment>
                )}
              </div>

              <div className={styles.btnRow}>
                <div className={styles.btnCon} style={{ width: `${stageSize.width}px` }}>
                  <svg className={`${styles.startBtn} icon`} aria-hidden="true" onClick={this.playGame}>
                    <use xlinkHref="#icon_detail_flagx" />
                  </svg>

                  <svg className={`${styles.stopBtn} icon`} aria-hidden="true" onClick={this.stopGame}>
                    <use xlinkHref="#icon_detail_stopx" />
                  </svg>
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

export default Player;
