import { setRepos } from './repos';
import { createActions } from 'redux-actions';

export const {
  setTheme,
  setPeriod,
  setLanguage,
  setReposPoolSize,
  setUsername,
  setPersonalAccessToken
} = createActions(
  'SET_THEME',
  'SET_PERIOD',
  'SET_LANGUAGE',
  'SET_REPOS_POOL_SIZE',
  'SET_USERNAME',
  'SET_PERSONAL_ACCESS_TOKEN'
);

export const THEME = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
};

export const PERIOD = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY'
};

export const REPOS_POOL_SIZE = {
  THREE: 3,
  TWELVE: 12,
  THIRTY: 30,
  SIXTY: 60
};

export function setRepoPoolSizeAndRefresh(repoAmount) {
  return dispatch => {
    dispatch(setReposPoolSize(repoAmount));
    dispatch(setRepos([]));
  };
}

export function setPeriodAndRefresh(period) {
  return dispatch => {
    dispatch(setPeriod(period));
    dispatch(setRepos([]));
  };
}

export function setLanguageAndRefresh(language) {
  return dispatch => {
    dispatch(setLanguage(language));
    dispatch(setRepos([]));
  };
}
