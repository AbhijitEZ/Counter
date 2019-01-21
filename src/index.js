import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import {createStore, combineReducers} from 'redux';
import {Provider}  from 'react-redux';
import * as serviceWorker from './serviceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

let rootReducer = combineReducers({
  ctrMain: counterReducer,
  resultMain: resultReducer
})
// import reducer from './store/reducer'
const store = createStore(rootReducer);
ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));


serviceWorker.unregister();
