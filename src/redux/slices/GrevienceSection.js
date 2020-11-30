import { createSlice } from '@reduxjs/toolkit';
import { raiseGrevience, getGrevience, setAcknowledged} from '../../_utils/api';

const { actions, reducer } = createSlice({
  name: 'dataGrevience',
  initialState: {
   list:[]
  },
  reducers: {
    showLoader: (state, { payload }) => {
      state.showLoading = payload.status;
    },
    setList:(state,{ payload }) => {
      state.list = payload;
    }
  }
});

export default reducer;

export const {
  showLoader, setList
} = actions;

export const addGrevience = (obj,authToken, callback) => (dispatch) => {
  try {
    raiseGrevience(obj, authToken)
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
export const acknowledged = (id,response, authToken, callback) => (dispatch) => {
  try {
    setAcknowledged(id,response, authToken)
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

export const getGrevienceList = (authToken, callback) => (dispatch) => {
  try {
    getGrevience(authToken)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setList(res.data.result.multipleDocData))
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};

const errorHandlerObj = () => {
  let obj = {
    message: 'Something went wrong! please try again or refresh the page',
    type: 'error',
    show: true
  };
  return obj;
};

