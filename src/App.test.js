import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

it('renders App with the store without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
