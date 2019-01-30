import { requestRepos, setRepos, receiveRepos, tryAgain, setToDate, throwError } from '../actions/repos';
import moment from 'moment';
import { handleActions } from 'redux-actions';

const init = {
  fetching: false,
  error: null,
  repos: [],
  cacheDate: moment()
};

export default handleActions(
  {
    [throwError]: (state, action) => {
      return { ...state, error: action.payload };
    },
    [tryAgain]: state => {
      return { ...state, fetching: false, error: null };
    },
    [setRepos]: (state, action) => {
      return { ...state, repos: action.payload };
    },
    [setToDate]: (state, action) => {
      return { ...state, cacheDate: action.payload };
    },
    [requestRepos]: state => {
      return { ...state, fetching: true };
    },
    [receiveRepos]: (state, action) => {
      return {
        ...state,
        repos: [...state.repos, action.payload],
        fetching: false
      };
    }
  },
  init
);
