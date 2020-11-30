import {combineReducers} from 'redux';
import dataLogin from './slices/Login';
import dataDashboard from './slices/Dashboard';
import dataLetters from './slices/Letters';
import dataCirculars from './slices/LatestCirculars';
import dataFlightSafety from './slices/FlightSafety';
import dataGrevience from './slices/GrevienceSection';
import dataRequest from './slices/RequestSection';
import dataNews from './slices/NewsSlice';
import dataMembersList from './slices/Members';
import dataNotification from './slices/Notification';
import dataSchemes from './slices/Schemes';
import dataDirectives from './slices/Directives'
import dataMiscellaneous from './slices/Miscellaneous';
import dataAdmin from './slices/Admin'

const rootReducer = combineReducers({
  dataDashboard,
  dataLogin,
  dataLetters,
  dataCirculars,
  dataFlightSafety,
  dataGrevience,
  dataRequest,
  dataNews,
  dataMembersList,
  dataNotification,
  dataSchemes,
  dataDirectives,
  dataMiscellaneous,
  dataAdmin
});

export default rootReducer;
