import {createSlice} from '@reduxjs/toolkit';
import {schemes, docUpload, getSchemeDetails} from '../../_utils/api';

const {actions, reducer} = createSlice({
  name: 'dataSchemes',
  initialState: {
    filesList: [],
    isLoading: false,
    currentPage: 1,
    totalCount: 0,
  },
  reducers: {
    setList: (state, {payload}) => {
      state.filesList = payload;
      state.filesListCopy = payload;
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
    setListWithOutCopy: (state, {payload}) => {
      state.filesList = payload;
    },
  },
});

export default reducer;

export const {
  setList,
  setListWithOutCopy,
  showLoader,
  setTotalCount,
  setCurrentPage,
} = actions;

export const raiseScheme = (obj, authToken, formType, callback) => (dispatch) => {
    let map = {
      0: "tmu",
      1: "pmu",
      2: "incident",
      3: "accident",
      4: "adminstrator",
    }
  try {
    schemes(obj, authToken, map[formType])
      .then((res) => {
        if (res.data.ok) {
          callback(false);
        }
      })
      .catch((_error) => {
        callback(
          true,
          _error.response && _error.response.data
            ? _error.response.data.message
            : '',
        );
      });
  } catch (_error) {}
};

export const uploadFile = (obj, authToken, formType, callback) => (
  dispatch,
) => {
  try {
    docUpload(obj, authToken, formType)
      .then((res) => {
        if (res.data.ok) {
          callback(false, res.data.result);
        }
      })
      .catch((_error) => {
        callback(
          true,
          _error.response && _error.response.data
            ? _error.response.data.message
            : '',
        );
      });
  } catch (_error) {}
};

export const getSchemeList = (pageNo = 1, type = 'tmu', token, callback) => (
  dispatch,
) => {
  dispatch(showLoader(true));
  try {
    getSchemeDetails(type, pageNo, token)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setList(res.data.result.multipleDocData));
          dispatch(setTotalCount(res.data.result.totalCount));
          dispatch(setCurrentPage(pageNo));
        }
        dispatch(showLoader(false));
      })
      .catch((_error) => {
        dispatch(showLoader(false));
        callback(
          true,
          _error.response && _error.response.data
            ? _error.response.data.message
            : '',
        );
      });
  } catch (_error) {}
};
