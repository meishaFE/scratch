import VM from 'scratch-vm';
import AudioEngine from 'scratch-audio';
import Renderer from 'scratch-render';
import { SVGRenderer as V2SVGAdapter } from 'scratch-svg-renderer';
import { BitmapAdapter as V2BitmapAdapter } from 'scratch-svg-renderer';
import ScratchStorage from 'scratch-storage';

class PlayerVm {
  constructor() {
    this.initVm();
  }

  initVm = () => {
    this.vm = new VM();
    this.canvas = document.createElement('canvas');

    this.vm.attachStorage(new ScratchStorage());
    this.vm.attachV2SVGAdapter(new V2SVGAdapter());
    this.vm.attachV2BitmapAdapter(new V2BitmapAdapter());
    this.vm.attachRenderer(new Renderer(this.canvas));
    this.vm.attachAudioEngine(new AudioEngine());
    this.vm.setCompatibilityMode(true);
    this.vm.start();
    this.vm.initialized = true;
  };

  /**
   * @description 绑定事件
   */
  attachEvents = canvas => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchmove', this.onMouseMove);
    document.addEventListener('touchend', this.onMouseUp);
    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('touchstart', this.onMouseDown);
    canvas.addEventListener('wheel', this.onWheel);
    window.addEventListener('resize', this.updateRect);
    window.addEventListener('scroll', this.updateRect);

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  };

  /**
   * @description 解除绑定
   */
  detachEvents = canvas => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('touchmove', this.onMouseMove);
    document.removeEventListener('touchend', this.onMouseUp);
    canvas.removeEventListener('mousedown', this.onMouseDown);
    canvas.removeEventListener('touchstart', this.onMouseDown);
    canvas.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('resize', this.updateRect);
    window.removeEventListener('scroll', this.updateRect);

    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  };

  /**
   * @description 更新rect，触发事件时需要调用
   */
  updateRect = () => {
    this.rect = this.canvas.getBoundingClientRect();
  };

  /**
   * @description 获取事件的x,y坐标
   */
  getEventXY = e => {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.changedTouches && e.changedTouches[0]) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  /**
   * @description mousedown事件
   */
  onMouseDown = e => {
    this.updateRect();

    const { x, y } = this.getEventXY(e);
    const mousePosition = [x - this.rect.left, y - this.rect.top];

    const data = {
      isDown: true,
      x: mousePosition[0],
      y: mousePosition[1],
      canvasWidth: this.rect.width,
      canvasHeight: this.rect.height
    };
    this.vm.postIOData('mouse', data);
  };

  /**
   * @description mouseUp事件
   */
  onMouseUp = e => {
    const { x, y } = this.getEventXY(e);

    const data = {
      isDown: false,
      x: x - this.rect.left,
      y: y - this.rect.top,
      canvasWidth: this.rect.width,
      canvasHeight: this.rect.height,
      wasDragged: false
    };

    this.vm.postIOData('mouse', data);
  };

  onMouseMove = e => {
    const { x, y } = this.getEventXY(e);
    const mousePosition = [x - this.rect.left, y - this.rect.top];

    this.pickX = mousePosition[0];
    this.pickY = mousePosition[1];

    const coordinates = {
      x: mousePosition[0],
      y: mousePosition[1],
      canvasWidth: this.rect.width,
      canvasHeight: this.rect.height
    };

    this.vm.postIOData('mouse', coordinates);
  };

  onWheel = e => {
    const data = {
      deltaX: e.deltaX,
      deltaY: e.deltaY
    };

    this.vm.postIOData('mouseWheel', data);
  };

  handleKeyDown = e => {
    if (
      (e.keyCode === 32 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) &&
      (e.target === document || e.target === document.body)
    ) {
      e.preventDefault();
    }

    this.vm.postIOData('keyboard', {
      keyCode: e.keyCode,
      key: e.key,
      isDown: true
    });
  };

  handleKeyUp = e => {
    if (
      (e.keyCode === 32 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) &&
      (e.target === document || e.target === document.body)
    ) {
      e.preventDefault();
    }

    this.vm.postIOData('keyboard', {
      keyCode: e.keyCode,
      key: e.key,
      isDown: false
    });
  };
}

export default PlayerVm;
