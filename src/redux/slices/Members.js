import {createSlice} from '@reduxjs/toolkit';
import {getMembers} from '../../_utils/api';
// import store from '../../store';

const {actions, reducer} = createSlice({
  name: 'dataMembersList',
  initialState: {
    userList: [],
    userListCopy: [],
    showLoading: false,
    region: 'east',
  },
  reducers: {
    showLoader: (state, {payload}) => {
      state.showLoading = payload;
    },
    setList: (state, {payload}) => {
      state.userList = payload;
      state.userListCopy = payload;
    },
    setListWithOutCopy: (state, {payload}) => {
      state.userList = payload;
    },
    changeRegion: (state, {payload}) => {
      if (payload) {
        var array = state.userListCopy.filter(
          (item) => item.region === payload,
        );
        state.userList = array;
        state.region = payload;
      } else {
        state.userList = state.userListCopy;
      }
    },
    filterResults: (state, {payload}) => {
      let regex = new RegExp(payload.toLowerCase());
      var array = state.userListCopy.filter(
        (item) =>
          regex.test(
            item.name.toLowerCase() || item.email.toLowerCase() || item.contact,
          ) && item.region === state.region,
      );
      state.userList = array;
    },
  },
});

export default reducer;
export const {
  showLoader,
  setList,
  setListWithOutCopy,
  filterResults,
  changeRegion,
} = actions;
export const searchList = (value, region) => (dispatch) => {
  dispatch(filterResults(value));
};

export const getUserList = (authToken, callback) => (dispatch) => {
  dispatch(showLoader(true));
  try {
    getMembers(authToken)
      .then((res) => {
        if (res.data.ok) {
          let data = res.data.result.multipleDocData;
          dispatch(setList(data));
          dispatch(setListWithOutCopy(data));
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
