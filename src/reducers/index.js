import { combineReducers } from 'redux';
import settings from './settings';
import repos from './repos';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const reposPersistConfig = {
  key: 'repos',
  storage,
  blacklist: ['error', 'fetching'],
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
};

export default combineReducers({
  settings: persistReducer(settingsPersistConfig, settings),
  repos: persistReducer(reposPersistConfig, repos),
});
