import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { AutoSizer, Column, SortIndicator, Table } from 'react-virtualized';

import ApplicantDetails from './ApplicantDetails';
import Skills from '../Skills/Skills';
import Status from './Status';

import './ApplicantsList.css';

export default class extends Component {
  static propTypes = {
    applicants: PropTypes.array.isRequired
  }

  state = {
    filteredApplicants: this.props.applicants,
    openDetails: false,
    profile: {
      company: '',
      email: '',
      name: '',
      phone: '',
      skills: []
    },
    sortBy: 'name',
    sortDirection: 'ASC'
  }

  componentWillUpdate(nextProps) {
    const {
      applicants: currentApplicants,
      searchTags: currentSearchTags,
      selectedStatus: currentSelectedStatus
    } = this.props;

    const {
      applicants: newApplicants,
      searchTags: newSearchTags,
      selectedStatus: newSelectedStatus
    } = nextProps;

    if (!_.isEqual(currentApplicants, newApplicants) ||
        !_.isEqual(currentSearchTags, newSearchTags) ||
        !_.isEqual(currentSelectedStatus, newSelectedStatus)) {
      if (_.isEmpty(newSearchTags)) {
        this.setState({
          filteredApplicants: _.filter(newApplicants, applicant => (
            newSelectedStatus.indexOf(applicant.status) > -1
          ))
        });
      } else {
        this.setState({
          filteredApplicants: _.filter(newApplicants, applicant => {
            if (newSelectedStatus.indexOf(applicant.status) < 0) {
              return false;
            }
            let accept = false;
            let index = 0;
            while (!accept && index < newSearchTags.length) {
              let tag = newSearchTags[index];
              accept = applicant[tag.type].toLowerCase().indexOf(tag.value.toLowerCase()) > -1;
              index++;
            }
            return accept;
          })
        });
      }
    }
  }

  headerRenderer ({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection
  }) {
    return (
      <div>
        {label}
        {sortBy === dataKey &&
          <SortIndicator sortDirection={sortDirection} />
        }
      </div>
    )
  }

  rowClassName = ({ index }) => {
    if (index < 0) {
      return 'header-row';
    }
    return (index % 2 === 0) ? 'row-even' : 'row-odd';
  }

  sortFilteredApplicants = ({ sortBy, sortDirection }) => {
    this.setState({ sortBy, sortDirection });
  }

  sortList = (list, key, order) => {
    let sortedList = _.sortBy(list, entry => entry[key]);
    return order === 'ASC' ? sortedList : sortedList.reverse();
  }

  onRowClick = ({ rowData: profile }) => {
    this.setState({
      profile,
      openDetails: true
    })
  }

  handleDialogClose = () => {
    this.setState({
      openDetails: false
    })
  }

  renderStatus = ({ cellData, columnData, dataKey, rowData, rowIndex }) => (
    <Status status={cellData} id={rowData['id']} updateStatus={this.props.updateApplicantStatus}/>
  );

  render () {
    let { filteredApplicants, openDetails, profile, sortBy, sortDirection } = this.state;

    let sortedList = this.sortList(filteredApplicants, sortBy, sortDirection);

    return (
      <div>
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              ref='Table'
              headerClassName={'table-header'}
              headerHeight={30}
              height={600}
              noRowsRenderer={() => <div className='no-rows'>No rows</div>}
              overscanRowCount={20}
              onRowClick={this.onRowClick}
              rowClassName={this.rowClassName}
              rowHeight={100}
              rowGetter={({ index }) => sortedList[index]}
              rowCount={sortedList.length}
              sort={this.sortFilteredApplicants}
              sortBy={sortBy}
              sortDirection={sortDirection}
              width={width}
            >
              <Column
                width={210}
                disableSort
                label='Status'
                dataKey='status'
                className='table-status'
                cellRenderer={this.renderStatus}
              />
              <Column
                dataKey='name'
                label="Name"
                headerRenderer={this.headerRenderer}
                width={200}
                flexGrow={1}
              />
              <Column
                dataKey='email'
                label="Email"
                headerRenderer={this.headerRenderer}
                width={200}
                flexGrow={1}
              />
              <Column
                dataKey='phone'
                label="Phone No."
                headerRenderer={this.headerRenderer}
                width={150}
              />
              <Column
                dataKey='company'
                label="Company"
                headerRenderer={this.headerRenderer}
                width={200}
                flexGrow={1}
              />
              <Column
                width={210}
                disableSort
                label='Skills'
                dataKey='skills'
                className='table-skills'
                cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) => <Skills skills={cellData}/>}
                flexGrow={1}
              />
            </Table>
          )}
        </AutoSizer>
        <ApplicantDetails
          company={profile.company}
          email={profile.email}
          handleClose={this.handleDialogClose}
          name={profile.name}
          open={openDetails}
          picture={profile.picture}
          phone={profile.phone}
          skills={profile.skills}
        />
      </div>
    )
  }
}
