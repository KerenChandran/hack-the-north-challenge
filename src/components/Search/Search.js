import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

// Material Design Components
import Avatar from 'material-ui/Avatar';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SuperSelectField from 'material-ui-superselectfield';

import SearchChips from './SearchChips';
import './Search.css';

export default class extends Component {
  static propTypes = {
    submitSearch: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
  }

  state = {
    searchText: '',
    searchType: 'name',
    status: [{
      label: 'Accepted',
      value: 'accepted'
    }, {
      label: 'In Review',
      value: 'in_review'
    }, {
      label: 'Rejected',
      value: 'rejected'
    }]
  }

  handleUpdateSearch = searchText => {
    this.setState({ searchText });
  }

  handleNewSearch = searchText => {
    let { submitSearch } = this.props;
    let { searchType } = this.state;


    submitSearch(searchType, searchText);

    this.setState({ searchText: '' });
  }

  handleSearchTypeChange = (e, value) => {
    this.setState({ searchType: value });
  }

  handleStatusSelection = values => {
    this.setState({ status: values });
    this.props.filterApplicantStatus(values.map(entry => entry.value));
  }

  clearAllTags = () => {
    this.props.clearAllTags();
  }

  selectionsLabel = (values, hintText) => {
    // if (values.length) {
    //   return values.map(entry => entry.label).join(', ');
    // } else {
    //   return hintText;
    // }
    return hintText;
  }

  displaySearchType = searchType => {
    switch(searchType) {
      case 'email':
        return 'Email';
      case 'phone':
        return 'Phone'
      case 'company':
        return 'Company';
      default:
        return 'Name';
    }
  }

  renderIconMenu = searchType => {
    switch(searchType) {
      case 'email':
        return <FontIcon className="material-icons">email</FontIcon>;
      case 'phone':
        return <FontIcon className="material-icons">phone</FontIcon>;
      case 'company':
        return <FontIcon className="material-icons">location_city</FontIcon>;
      default:
        return <FontIcon className="material-icons">face</FontIcon>;
    }
  }

  render() {
    const { list, deleteSearchTag, searchTags } = this.props;
    const { searchText, searchType, status } = this.state;

    let options = _.uniq(list.map(entry => entry[searchType]));

    let style = { width: '100%', flex: 1 };

    return (
      <div>
        <div className="search">
          <IconMenu
            iconButtonElement={<IconButton>{this.renderIconMenu(searchType)}</IconButton>}
            onChange={this.handleSearchTypeChange}
            value={searchType}
          >
            <MenuItem value={'name'}>
              <Avatar icon={<FontIcon className="material-icons">face</FontIcon>}/>
            </MenuItem>
            <MenuItem value={'email'}>
              <Avatar icon={<FontIcon className="material-icons">email</FontIcon>}/>
            </MenuItem>
            <MenuItem value={'phone'}>
              <Avatar icon={<FontIcon className="material-icons">phone</FontIcon>}/>
            </MenuItem>
            <MenuItem value={'company'}>
              <Avatar icon={<FontIcon className="material-icons">location_city</FontIcon>}/>
            </MenuItem>
          </IconMenu>
          <AutoComplete
            menuStyle={style}
            style={style}
            textFieldStyle={style}
            hintText={`Search by ${this.displaySearchType(searchType)}`}
            searchText={searchText}
            onUpdateInput={this.handleUpdateSearch}
            onNewRequest={this.handleNewSearch}
            dataSource={options}
            filter={(searchText, key) => (
              key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            )}
            maxSearchResults={10}
          />
          <div className="right-search">
            <div className="search-status">
              <SuperSelectField
                name='status'
                multiple
                hintText='Status'
                onChange={this.handleStatusSelection}
                value={status}
                selectionsRenderer={this.selectionsLabel}
              >
                <div label="Accepted" value='accepted'>Accepted</div>
                <div label="In Reveiw" value='in_review'>In Review</div>
                <div label="Rejected" value='rejected'>Rejected</div>
              </SuperSelectField>
            </div>
            <div className="search-reset">
              <RaisedButton label="Reset Search" primary={true} onClick={this.clearAllTags}/>
            </div>
          </div>
        </div>
        <div className="search-chips">
          <SearchChips searchTags={searchTags} deleteSearchTag={deleteSearchTag}/>
        </div>
      </div>
    )
  }
}
