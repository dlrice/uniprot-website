import fetchData from '../../utils/fetchData';
import { getUniProtQueryUrl } from '../../utils/apiUrls';

export const FETCH_RESULTS_STARTED = 'FETCH_RESULTS_STARTED';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';

export const fetchResultsSuccess = data => ({
  type: FETCH_RESULTS_SUCCESS,
  data,
  receivedAt: Date.now(),
});

export const fetchResultsStarted = () => ({
  type: FETCH_RESULTS_STARTED,
});

export const fetchResults = (encodedUniprotQueryString, columns) => (dispatch) => {
  dispatch(fetchResultsStarted());
  fetchData(getUniProtQueryUrl(encodedUniprotQueryString, columns))
    .then(response => dispatch(fetchResultsSuccess(response.data)))
    .catch(error => console.error(error));
};