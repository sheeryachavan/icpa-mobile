import { createSlice } from '@reduxjs/toolkit';
import { getFlight,raiseFlightRequest,setAcknowledged } from '../../_utils/api';
const { actions, reducer } = createSlice({
  name: 'dataRequest',
  initialState: {
    flightList:[],
    showLoading:false,
    totalCount:0,
    currentPage : 1,
    regionConfig :{
      east:false,
      west:false,
      north:false,
      south:false
    }
  },
  reducers: {
    showLoader: (state, { payload }) => {
      state.showLoading = payload;
    },
    setList:(state,{ payload }) => {
      state.flightList = payload;
    },
    setTotalCount: (state, { payload }) => {
      state.totalCount = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    }
  }
});

export default reducer;

export const {
  showLoader,
   setList,
  setTotalCount,
  setCurrentPage
} = actions;



export const getFlightList = (authToken,pageNo = 1, callback) => (dispatch) => {
  dispatch(showLoader(true))
  try {
    getFlight(authToken,pageNo)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setList(res.data.result.multipleDocData))
        }
        dispatch(showLoader(false))
      })
      .catch((_error) => {
        dispatch(showLoader(false))
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};

export const setConfigFields = (key, value) => (dispatch) => {
  if (key === 'allChecked') {
    dispatch(setConfigurationAll(value));
  } else {
    if (!value) {
      dispatch(setConfiguration({ key: 'allChecked', value: false }));
    }
    dispatch(setConfiguration({ key, value }));
  }
  dispatch(setConfiguration({ key, value }));
};

export const createFlightRequest = (obj, authToken, callback) => (dispatch) => {
  try {
    raiseFlightRequest(obj, authToken)
      .then((res) => {
        if (res.data.ok) {
          callback(false);
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};
export const acknowledged = (id, authToken, callback) => (dispatch) => {
  try {
    setAcknowledged(id, authToken)
      .then((res) => {
        if (res.data.ok) {
          callback(false);
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};