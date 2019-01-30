import {
  PERIOD,
  REPOS_POOL_SIZE,
  THEME,
  setTheme, setPeriod, setLanguage, setReposPoolSize, setPersonalAccessToken
} from "../actions/settings";
import { handleActions } from "redux-actions";

const init = {
  theme: THEME.LIGHT,
  period: PERIOD.DAILY,
  language: '',
  repoAmount: REPOS_POOL_SIZE.THIRTY
};

export default handleActions(
  {
    [setTheme]: (state, action) => {
      return { ...state, theme: action.payload };
    },
    [setPeriod]: (state, action) => {
      return { ...state, period: action.payload };
    },
    [setLanguage]: (state, action) => {
      return { ...state, language: action.payload };
    },
    [setReposPoolSize]: (state, action) => {
      return { ...state, repoAmount: action.payload };
    },
    [setPersonalAccessToken]: (state, action) => {
      return { ...state, accessToken: action.payload };
    },
  },
  init
);
