import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  reset,
  updateProfile,
  getMyProfile,
  checkMembershipPaymentStatus,
  payRegistrationFee,
  payVariableFee,
} from "../../_utils/api";

const { actions, reducer } = createSlice({
  name: "dataLogin",
  initialState: {
    token: "",
    isLoading: false,
    details: {},
    profile: {},
    paymentStatus: false,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    setDetails: (state, { payload }) => {
      state.details = payload.details;
    },
    setProfile: (state, { payload }) => {
      state.profile = payload.profile;
    },
    setLoader: (state, { payload }) => {
      state.isLoading = payload.status;
    },
    setPaymentStatus: (state, { payload }) => {
      state.paymentStatus = payload;
    },
  },
});
export default reducer;
export const {
  setToken,
  setLoader,
  setDetails,
  setProfile,
  setPaymentStatus,
} = actions;

export const checkLogin = (email, password, callback) => (dispatch) => {
  try {
    login(email, password)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setToken({ token: res.data.result }));
          dispatch(setDetails({ details: res.data.result.userData }));
          callback(false, res.data.result);
        }
      })
      .catch((_error) => {
        console.log('_error',_error)
        callback(
          true,
          _error.response && _error.response.data
            ? _error.response.data.message
            : ""
        );
      });
  } catch (_error) {}
};

export const registerUser = (obj, callback) => (dispatch) => {
  try {
    register(obj)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setLoader(false));
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

export const logout = () => (dispatch) => {
  dispatch(setToken({ token: null }));
};
export const resetPassword = (obj, callback) => (dispatch) => {
  try {
    reset(obj)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setLoader(false));
          callback(false, res.data.result);
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

export const updateUser = (obj, token, callback) => (dispatch) => {
  try {
    updateProfile(obj, token)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setLoader(false));
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
export const getProfile = (authToken, callback = () => {}) => (dispatch) => {
  try {
    getMyProfile(authToken)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setProfile({ profile: res.data.result }));
        }
        callback(false);
      })
      .catch((_error) => {
        callback(true);
      });
  } catch (_error) {
  } finally {
    let _token = {
      jwtToken: authToken,
    };
    dispatch(setToken({ token: _token }));
  }
};
export const checkPaymentStatus = (authToken, callback = () => {}) => (
  dispatch
) => {
  try {
    checkMembershipPaymentStatus(authToken)
      .then((res) => {
        if (!res.data.ok) {
          dispatch(setPaymentStatus(false));
          callback(false);
        } else {
          dispatch(setPaymentStatus(true));
          callback(true);
        }
      })
      .catch((_error) => {
        dispatch(setPaymentStatus(false));
        callback(false);
      });
  } catch (_error) {}
};

export const payRegistrationFees = (authToken, callback) => () => {
  try {
    payRegistrationFee(authToken)
      .then((res) => {
        if (res && res.data.ok) {
          callback(false, res.data.message);
        } else {
          callback(true);
        }
      })
      .catch((_error) => {
        callback(true, _error.message);
      });
  } catch (_error) {}
};
export const payVariableFees = (authToken, data, callback) => () => {
  try {
    payVariableFee(authToken, data)
      .then((res) => {
        if (res && res.data.ok) {
          callback(false, res.data.message);
        } else {
          callback(true);
        }
      })
      .catch((_error) => {
        callback(true, _error.message);
      });
  } catch (_error) {}
};
