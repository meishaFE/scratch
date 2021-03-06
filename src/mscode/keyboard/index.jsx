import styles from './index.less';
import React, { Component } from 'react';
import { keyNum, keyLetter } from './keys';

class Keyboard extends Component {
  handleTouchStart = (e, key) => {
    e.stopPropagation();
    if (this.props.vm.postIOData) {
      this.props.vm.postIOData('keyboard', {
        keyCode: key.keyCode,
        key: key.key,
        isDown: true
      });
    }
  };

  handleTouchEnd = (e, key) => {
    e.stopPropagation();
    if (this.props.vm.postIOData) {
      this.props.vm.postIOData('keyboard', {
        keyCode: key.keyCode,
        key: key.key,
        isDown: false
      });
    }
  };

  render() {
    const { visible } = this.props;

    return (
      <div className={styles.keyboard} style={{ display: visible ? 'block' : 'none' }}>
        <div className={styles.rowNum}>
          {keyNum.map((item, index) => (
            <div
              className={styles.btnNum}
              key={index}
              onTouchStart={e => {
                this.handleTouchStart(e, { keyCode: item.keyCode, key: item.key });
              }}
              onTouchEnd={e => {
                this.handleTouchEnd(e, { keyCode: item.keyCode, key: item.key });
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        {keyLetter.map((row, rowIndex) => (
          <div className={styles.rowLetter} key={rowIndex}>
            {row.map((item, index) => (
              <div
                className={`${styles.btnLetter} ${item.light && styles.light}`}
                key={index}
                onTouchStart={e => {
                  this.handleTouchStart(e, { keyCode: item.keyCode, key: item.key });
                }}
                onTouchEnd={e => {
                  this.handleTouchEnd(e, { keyCode: item.keyCode, key: item.key });
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        ))}

        <div
          className={styles.space}
          onTouchStart={e => {
            this.handleTouchStart(e, { keyCode: 32, key: ' ' });
          }}
          onTouchEnd={e => {
            this.handleTouchEnd(e, { keyCode: 32, key: ' ' });
          }}
        >
          空格
        </div>
      </div>
    );
  }
}

export default Keyboard;
