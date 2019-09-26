import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

import authReducer from './authReducers';
import streamReducer from './streamReducer';

export default combineReducers({
  // dummyReducer: () => 'Delete after'
  //note! the key must be named "form"
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});