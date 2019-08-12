import styles from './index.less';
import React, { Component } from 'react';

class Spin extends Component {
  render() {
    return (
      <div className={styles.spin}>
        {this.props.children}

        {this.props.spinning && (
          <div className={styles.cover}>
            <div />
          </div>
        )}
      </div>
    );
  }
}

export default Spin;
