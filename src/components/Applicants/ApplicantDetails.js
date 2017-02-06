import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Skills from '../Skills/Skills';
import './ApplicantDetails.css';

export default class extends Component {
  handleClose = () => {
    this.props.handleClose();
  }

  dialogActions = () => {
    return [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];
  }

  render() {
    let { name, email, phone, company, open, picture, skills } = this.props;

    return (
      <Dialog
        title={`${name}'s Profile`}
        actions={this.dialogActions()}
        modal={false}
        open={open}
        onRequestClose={this.handleClose}
      >
        <div className="applicant-details">
          <div className="applicant-picture">
            <LazyLoad>
              <img role="presentation" src={picture}/>
            </LazyLoad>
          </div>
          <div className="applicant-profile">
            <div className="applicant-profile-group">
              <div className="applicant-profile-label">Name</div>
              <div className="applicant-profile-value">{name}</div>
            </div>
            <div className="applicant-profile-group">
              <div className="applicant-profile-label">Company</div>
              <div className="applicant-profile-value">{company}</div>
            </div>
            <div className="applicant-profile-group">
              <div className="applicant-profile-label">Email</div>
              <div className="applicant-profile-value">{email}</div>
            </div>
            <div className="applicant-profile-group">
              <div className="applicant-profile-label">Phone No.</div>
              <div className="applicant-profile-value">{phone}</div>
            </div>
            <div className="applicant-profile-skills">
              <div className="applicant-profile-label">Skills</div>
              <div className="applicant-profile-value"><Skills skills={skills} showMore={false}/></div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
