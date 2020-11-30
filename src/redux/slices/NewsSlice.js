import {createSlice} from '@reduxjs/toolkit';
import {getNews} from '../../_utils/api';

const {actions, reducer} = createSlice({
  name: 'dataNews',
  initialState: {
    news: [],
    isLoading: false,
  },
  reducers: {
    setNews: (state, {payload}) => {
      state.news = payload;
    },
    showLoader: (state, {payload}) => {
      state.isLoading = payload;
    },
  },
});

export default reducer;

export const {setNews, showLoader} = actions;

export const getLatestNews = (authToken, callback) => (dispatch) => {
  dispatch(showLoader(true));
  try {
    getNews(authToken)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setNews(res.data.result));
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
