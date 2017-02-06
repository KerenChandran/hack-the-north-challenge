import React, { Component } from 'react';
import cx from 'classnames';

import './Status.css';


export default class extends Component {
  updateStatus = e => {
    let { id, updateStatus } = this.props;
    let status = e.target.className.indexOf('accepted') > -1 ? 'accepted' : 'rejected';

    updateStatus(id, status);
  }

  render () {
    const { status } = this.props;

    return (
      <div>
        <div
          className={cx('accepted', { active: status === 'accepted' })}
          onClick={this.updateStatus}
        >
          Accepted
        </div>
        <div
          className={cx('rejected', { active: status === 'rejected' })}
          onClick={this.updateStatus}
        >
          Rejected
        </div>
      </div>
    );
  }
}
