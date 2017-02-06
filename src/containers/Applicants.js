// Dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import ApplicantsActions from '../actions/applicantsActions';

// Views
import ApplicantsView from '../views/ApplicantsView';

export const Applicants = props => (
  <ApplicantsView
    applicants={props.applicants.applicants}
    clearAllTags={props.actions.clearAllTags}
    deleteSearchTag={props.actions.deleteSearchTag}
    fetchApplicants={props.actions.fetchApplicants}
    filterApplicants={props.actions.filterApplicants}
    filterApplicantStatus={props.actions.filterApplicantStatus}
    selectedStatus={props.applicants.selectedStatus}
    searchTags={props.applicants.searchTags}
    updateApplicantStatus={props.actions.updateApplicantStatus}
  />
)

Applicants.propTypes = {
  actions: PropTypes.object,
  fetchApplicants: PropTypes.func
}

function mapStateToProps(state) {
  return {
    applicants: (state.applicants) ? state.applicants.toJS() : {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ApplicantsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Applicants);
