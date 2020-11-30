import {createSlice} from '@reduxjs/toolkit';
import {getNotification, markAsRead} from '../../_utils/api';

const {actions, reducer} = createSlice({
  name: 'dataNotification',
  initialState: {
    notificationList: [],
    showLoading: false,
    currentPage: 1,
    totalCount: 0,
  },
  reducers: {
    setList: (state, {payload}) => {
      state.notificationList = payload.filteredData;
    },
    appendList: (state, {payload}) => {
      state.notificationList = [
        ...state.notificationList,
        ...payload.filteredData,
      ];
    },
    showLoader: (state, {payload}) => {
      state.isLoading = payload;
    },
    setCurrentPage: (state, {payload}) => {
      state.currentPage = payload;
    },
    setTotalCount: (state, {payload}) => {
      state.totalCount = payload;
    },
  },
});

export default reducer;

export const {
  showLoader,
  setList,
  appendList,
  setTotalCount,
  setCurrentPage,
} = actions;

export const getNotificationList = (authToken, pageNo, callback) => (
  dispatch,
) => {
  let append = false;
  if (pageNo > 1) {
    append = true;
  }
  if (!append) {
    dispatch(showLoader(true));
  }
  try {
    getNotification(authToken)
      .then((res) => {
        if (res.data.ok) {
          if (append) {
            dispatch(appendList(res.data.result));
          } else {
            dispatch(setList(res.data.result));
          }
          dispatch(setTotalCount(res.data.result.totalCount));
          dispatch(setCurrentPage(pageNo));
          callback(false);
        } else {
          callback(true);
        }
        dispatch(showLoader(false));
      })
      .catch((_error) => {
        callback(
          true,
          _error.response && _error.response.data
            ? _error.response.data.message
            : '',
        );
        dispatch(showLoader(false));
      });
  } catch (_error) {}
};

export const setUpreadAndOpen = (id, authToken, callback) => (dispatch) => {
  try {
    markAsRead(id, authToken).then((res) => {
      if (res.data.ok) {
        dispatch(getNotificationList(res.data.result));
      }
    });
    callback().catch((_error) => {
      callback();
    });
  } catch (_error) {}
};
