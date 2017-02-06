import React, { Component } from 'react';

// Components
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';

class SearchChip extends Component {
  handleDelete = e => {
    let { searchType, searchText } = this.props;
    this.props.deleteSearchTag(searchType, searchText)
  }
  render() {
    let { searchType, searchText } = this.props;
    let icon = searchType;

    if (icon === 'name') {
      icon = 'face';
    } else if (icon === 'company') {
      icon = 'location_city';
    }

    return (
      <div className="search-chip">
        <Chip onRequestDelete={this.handleDelete}>
          <Avatar icon={<FontIcon className="material-icons">{icon}</FontIcon>} />
          {searchText}
        </Chip>
      </div>
    )
  }
}

export default class SearchChips extends Component {
  render() {
    let { deleteSearchTag, searchTags } = this.props;
    return (
      <div>
        { searchTags.map((tag, index) => (
          <SearchChip
            key={index}
            deleteSearchTag={deleteSearchTag}
            searchType={tag.type}
            searchText={tag.value}
          />
        ))}
      </div>
    )
  }
}
