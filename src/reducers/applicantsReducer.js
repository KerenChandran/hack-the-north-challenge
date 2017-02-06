import ApplicantsConstants from '../constants/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  applicants: [],
  selectedStatus: ['accepted', 'rejected', 'in_review'],
  searchTags: []
});

export default function ApplicantsReducer(state = initialState, action) {
  switch (action.type) {
    case ApplicantsConstants.CLEAR_ALL_TAGS:
      return state.set('searchTags', Immutable.fromJS([]));

    case ApplicantsConstants.DELETE_TAG: {
      return state.updateIn(['searchTags'], Immutable.fromJS([]), tags => {
        return tags.filterNot(tag => {
          return tag.get('type') === action.searchType && tag.get('value') === action.searchText
        });
      });
    }

    case ApplicantsConstants.FILTER_APPLICANT_STATUS:
      return state.set('selectedStatus', action.status);

    case ApplicantsConstants.LOAD_APPLICANTS: {
      let id = 0;
      action.data.forEach(entry => entry.id = id++);
      return state.set('applicants', Immutable.fromJS(action.data));
    }

    case ApplicantsConstants.SEARCH:
      return state.updateIn(['searchTags'], Immutable.fromJS([]), tags => tags.push(Immutable.fromJS({
        type: action.searchType,
        value: action.searchText
      })));

    case ApplicantsConstants.UPDATE_STATUS:
      return state.updateIn(['applicants', action.index, 'status'], null, status =>
        status === action.status ? 'in_review' : action.status
      );

    default:
      return state;
  }
}
