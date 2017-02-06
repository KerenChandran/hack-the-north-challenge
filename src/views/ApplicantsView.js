import React, { Component, PropTypes } from 'react';

// Components
import ApplicantsList from '../components/Applicants/ApplicantsList';
import Loading from '../components/Loading/Loading'
import Search from '../components/Search/Search'

export default class extends Component {
  static propTypes = {
    applicants: PropTypes.array.isRequired,
    clearAllTags: PropTypes.func,
    fetchApplicants: PropTypes.func,
    filterApplicants: PropTypes.func
  }
  state = {
    ready: false
  }

  componentDidMount() {
    this.props.fetchApplicants().then(() =>
      this.setState({ ready: true })
    );
  }

  render() {
    const {
      applicants,
      clearAllTags,
      deleteSearchTag,
      filterApplicants,
      filterApplicantStatus,
      searchTags,
      selectedStatus,
      updateApplicantStatus
    } = this.props;
    const { ready } = this.state;

    if(!ready) {
      return <Loading />;
    }

    return (
      <div>
        <Search
          clearAllTags={clearAllTags}
          deleteSearchTag={deleteSearchTag}
          filterApplicantStatus={filterApplicantStatus}
          list={applicants}
          searchTags={searchTags}
          submitSearch={filterApplicants}
        />
        <ApplicantsList
          applicants={applicants}
          searchTags={searchTags}
          selectedStatus={selectedStatus}
          updateApplicantStatus={updateApplicantStatus}
        />
      </div>
    );
  }
}
