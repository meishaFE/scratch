import styles from './index.less';
import React, { Component } from 'react';
import Style from 'to-style';
import PlayerVm from './playerVm';
import MonitorList from './monitor/containers/monitor-list.jsx';
import ConnectedIntlProvider from '@/lib/connected-intl-provider.jsx';
import { Provider } from 'react-redux';
import redux from './store';
import Spin from '../Spin';

const ratio = 0.75;
let submiting = false;

class Player extends Component {
  state = {
    loading: false,
    fullscreen: false,
    isLoadProject: false,
    monitors: {},

    stageSize: {
      widthDefault: 480,
      heightDefault: 320,
      width: 0,
      height: 0,
      scale: 1
    }
  };

  constructor(props) {
    super(props);
    this.playerVm = new PlayerVm();
  }

  componentDidMount() {
    this.setStageSize();
    this.initVm();
  }

  // 设置播放器大小
  setStageSize = () => {
    if (this.state.fullscreen) {
      const windowHeight = window.innerHeight;
      const stageHeight = windowHeight - 48;
      const stageWidth = stageHeight / ratio;
      this.setState({
        stageSize: {
          widthDefault: 480,
          heightDefault: 320,
          width: stageWidth,
          height: stageHeight,
          scale: stageWidth / 480
        }
      });
    } else {
      this.setState({
        stageSize: {
          widthDefault: 480,
          heightDefault: 320,
          width: this.props.width,
          height: this.props.width * ratio,
          scale: this.props.width / 480
        }
      });
    }
  };

  initVm = () => {
    this.playerVm.updateRect();
    this.canvasRef.appendChild(this.playerVm.canvas);
    this.playerVm.attachEvents(this.playerVm.canvas);

    // 监听变量
    this.playerVm.vm.on('MONITORS_UPDATE', monitors => {
      this.setState({ monitors });
    });
  };

  componentWillUnmount() {
    this.playerVm.detachEvents(this.playerVm.canvas);
    this.playerVm.vm.stopAll();
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
      this.setState({ isLoadProject: true });
    } catch (err) {
      console.error('加载作品失败');
      console.error(err);
      $utils.errMsg(err);
    }
    this.setState({ loading: false });
    submiting = false;
  };

  // 全屏/取消
  handleFullscreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen }, () => {
      this.setStageSize();
    });
  };

  // 开始游戏
  playGame = () => {
    if (!this.playerVm) {
      this.initVm();
    }

    if (this.state.isLoadProject) {
      this.playerVm.vm.greenFlag();
    } else {
      this.loadProject();
    }
  };

  // 停止游戏
  stopGame = () => {
    this.playerVm.vm.stopAll();
  };

  render() {
    const { data } = this.props;
    const { loading, fullscreen, stageSize, isLoadProject, monitors } = this.state;

    if (this.playerVm) {
      this.playerVm.canvas.style.cssText = Style.string({ width: stageSize.width, height: stageSize.height });
    }

    return (
      <Provider store={redux}>
        <div
          className={fullscreen ? styles.fullscreen : styles.normal}
          style={{ width: fullscreen ? '100%' : `${stageSize.width}px` }}
        >
          <Spin spinning={loading}>
            <div
              className={styles.canvasCon}
              ref={this.setCanvasRef}
              style={{ width: `${stageSize.width}px`, height: `${stageSize.height}px` }}
            >
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
                    <div className={styles.playBtnCon}>
                      <img
                        className={styles.playBtnImg}
                        src={require('./images/btn_play.png')}
                        onClick={this.playGame}
                      />
                      <img
                        className={styles.playBtnHover}
                        src={require('./images/btn_play_hover.png')}
                        onClick={this.playGame}
                      />
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>

            {/* 按钮 */}
            <div className={styles.btnRow}>
              <div className={styles.btnCon} style={{ width: `${stageSize.width}px` }}>
                <svg className={`${styles.fullscreenBtn} icon`} aria-hidden="true" onClick={this.handleFullscreen}>
                  <use xlinkHref="#icon_detail_full-scr" />
                </svg>

                <svg className={`${styles.startBtn} icon`} aria-hidden="true" onClick={this.playGame}>
                  <use xlinkHref="#icon_detail_flagx" />
                </svg>

                <svg className={`${styles.stopBtn} icon`} aria-hidden="true" onClick={this.stopGame}>
                  <use xlinkHref="#icon_detail_stopx" />
                </svg>
              </div>
            </div>
          </Spin>
        </div>
      </Provider>
    );
  }
}

export default Player;
