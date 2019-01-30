import * as github from '../middlewares/github';
import { createActions } from 'redux-actions';

export const { throwError, tryAgain, setRepos, setToDate, requestRepos, receiveRepos } = createActions(
  'THROW_ERROR',
  'TRY_AGAIN',
  'SET_REPOS',
  'SET_TO_DATE',
  'REQUEST_REPOS',
  'RECEIVE_REPOS'
);

export function fetchRepos(sort, language, repoAmount, since, to, accessToken = '') {
  return async dispatch => {
    dispatch(requestRepos());
    try {
      const body = await github.fetchRepos(sort, language, repoAmount, since, to, accessToken);
      return dispatch(
        receiveRepos({
          items: body.items,
          since: since.clone(),
          to: to.clone()
        })
      );
    } catch (error) {
      return dispatch(throwError(error.message));
    }
  };
}
