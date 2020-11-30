import {createSlice} from '@reduxjs/toolkit';
import {upload, list, download} from '../../_utils/api';

const {actions, reducer} = createSlice({
  name: 'dataDirectives',
  initialState: {
    filesList: [],
    isLoading: false,
    currentPage: 1,
    totalCount: 0,
    searchedForKeyword:false
  },
  reducers: {
    setList: (state, { payload }) => {
      state.filesList = payload;
    },
    appendList: (state, { payload }) => {
      state.filesList = [...state.filesList, ...payload];
    },
    showLoader: (state, { payload }) => {
      state.isLoading = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setTotalCount: (state, { payload }) => {
      state.totalCount = payload;
    },
    setSearchedForKeyword: (state, { payload }) => {
      state.searchedForKeyword = payload;
    }
  },
});

export default reducer;

export const {
  setList,
  setListWithOutCopy,
  showLoader,
  setTotalCount,
  setCurrentPage,
  appendList,
  setSearchedForKeyword
} = actions;

export const uploadFile = (obj, authToken, callback = () => {}) => (
  dispatch
) => {
  try {
    upload(obj, authToken)
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
            : ""
        );
      });
  } catch (_error) {}
};

export const directivesSearch = (keyword, token) => (dispatch) => {
  if (keyword.length > 3) {
    dispatch(listFile(token, "directives", 1, ()=>{}, keyword));
  } else if (keyword.length === 0) {
    dispatch(listFile(token, "directives", 1, ()=>{}, "#erased-search*-value"));
  }
};
export const listFile = (
  authToken,
  type,
  pageNo,
  callback = () => {},
  keyword = ""
) => (dispatch) => {
  let append = false;
  if (pageNo > 1 && !keyword) {
    append = true;
  }
  if(keyword){
    dispatch(setSearchedForKeyword(true))
  }
  if (!append && !keyword) {
    dispatch(showLoader(true));
  }
  if (keyword === "#erased-search*-value") {
    keyword = "";
    dispatch(setSearchedForKeyword(false))
  }
  try {
    list(authToken, type, pageNo, keyword)
      .then((res) => {
        if (res.data.ok) {
          if (append) {
            dispatch(appendList(res.data.result.multipleDocData));
          } else {
            dispatch(setList(res.data.result.multipleDocData));
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

export const downloadFile = (id, authToken, callback) => (dispatch) => {
  try {
    download(id, authToken)
      .then((res) => {
        if (res.data.ok) {
        } else {
          callback(true);
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
