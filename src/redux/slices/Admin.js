import { createSlice } from '@reduxjs/toolkit';
import { getUsersListAdmin,updateUserProfile } from '../../_utils/api';

const { actions, reducer } = createSlice({
  name: 'dataAdmin',
    initialState: {
    userList:[],
    showLoading:false,
  },
  reducers: {
    showLoader: (state, { payload }) => {
      state.showLoading = payload;
    },
    setList:(state,{ payload }) => {
      state.userList = payload;
    }
    
  }
});

export default reducer;

export const {
  showLoader,
   setList,
} = actions;



export const getUserList = (authToken,refresh, callback) => (dispatch) => {
  if(!refresh){
    dispatch(showLoader(true));
  }
  try {
    getUsersListAdmin(authToken)
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


export const createFlightRequest = (obj,authToken, callback) => (dispatch) => {
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

export const updateProfile = (token, obj, callback) => (dispatch) => {
  try {
    updateUserProfile(token,obj)
      .then((res) => {
        if (res.data.ok) {
          callback(false);
        }
      })
      .catch((_error) => {
        // callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};
