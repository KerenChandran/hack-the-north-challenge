import ApplicantsConstants from '../constants/actionTypes';

export function clearAllTags() {
  return { type: ApplicantsConstants.CLEAR_ALL_TAGS };
}

export function deleteSearchTag(searchType, searchText) {
  return { type: ApplicantsConstants.DELETE_TAG, searchType, searchText }
}

export function fetchApplicants() {
  return dispatch => {
    return fetch('https://hackthenorth.com/fe-users.json', {
      method: 'GET'
    }).then(response => response.json())
      .then(json => dispatch({
        type: ApplicantsConstants.LOAD_APPLICANTS,
        data: json
      }));
  };
}

export function filterApplicants(searchType, searchText) {
  return { type: ApplicantsConstants.SEARCH, searchType, searchText };
}

export function filterApplicantStatus(status) {
  return { type: ApplicantsConstants.FILTER_APPLICANT_STATUS, status };
}

export function updateApplicantStatus(index, status) {
  return { type: ApplicantsConstants.UPDATE_STATUS, index, status};
}

export default {
  clearAllTags,
  deleteSearchTag,
  fetchApplicants,
  filterApplicants,
  filterApplicantStatus,
  updateApplicantStatus
}
