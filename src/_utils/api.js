import axios from "axios";
import { listCount } from "../_const/const";
// export const BASE_URL = "http://142.93.220.155:5555";
// export const BASE_URL = 'http://localhost:5555/api';
export const BASE_URL = "https://icpaunion.com/api";
// export const BASE_URL = "http://icpapilots.ml/api";

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/authorize/login`, { email, password })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const register = (obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/authorize/register`, { ...obj })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const reset = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/authorize/resetPassword`, { email })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const forgot = (password, id, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/authorize/resetd`, { ...password, id, token })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const updateProfile = (obj, authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASE_URL}/me/updateProfile`, obj, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMyProfile = (authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/me/getMyProfile`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const upload = (data, authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/file/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authToken,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const list = (authToken, type, pageNo = 1, keyword) => {
  console.log(
    `${BASE_URL}/file/list?pageSize=${listCount}&fileType=${type}&pageNum=${pageNo}${
      keyword ? `&keyword=${keyword}` : ""
    }`
  );
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${BASE_URL}/file/list?pageSize=${listCount}&fileType=${type}&pageNum=${pageNo}${
          keyword ? `&keyword=${keyword}` : ""
        }`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        console.log(response)
        resolve(response);
      })
      .catch((error) => {
        console.log(error.response)
        reject(error);
      });
  });
};

export const getNews = (authToken) => {
  const keyword = "Aviation";
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/news?search=${keyword}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const download = (id, authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/file/render?docId=${id}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getNotification = (authToken, pageNo) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${BASE_URL}/me/getMyNotficationList?pageSize=10000&pageNum=${pageNo}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const markAsRead = (id, authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/me/markAsRead?docId=${id}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMembers = (authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/me/members`, { headers: { Authorization: authToken } })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const raiseGrevience = (data, authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASE_URL}/me/raiseGrievance`,
        { ...data },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const raiseFlightRequest = (data, authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASE_URL}/me/createFlightRequest`,
        { ...data },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getGrevience = (authToken, pageNo) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${BASE_URL}/me/getGrievanceList?page_size=${"1000"}&page_num=${pageNo}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getFlight = (authToken, pageNo) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${BASE_URL}/me/getflightRequestList?page_size=${"1000"}&page_num=${pageNo}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUsers = (authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/me/getflightRequestList?page_size=250&page_num=1`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setAcknowledged = (id, response, authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASE_URL}/me/ackGrievance?gId=${id}`,
        { ...response },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getSchemeDetails = (type, pageNo, authToken) => {
  const _type = {
    tmu: `${BASE_URL}/tmu/getTmu`,
    pmu: `${BASE_URL}/pmu/getPmu`,
    incident: `${BASE_URL}/admin/getIncidentReport`,
    accident: `${BASE_URL}/admin/getAccidentReport`,
    adminstrator: `${BASE_URL}/admin/getAdminReport`,
  };
  return new Promise((resolve, reject) => {
    axios
      .get(`${_type[type]}?page_size=1200&status=pending&pageNum=${pageNo}`, {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const docUpload = (data, authToken, formType) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}/doc/upload`;
    if (formType) {
      if (formType !== "pmu" && formType !== "tmu") {
        url = `${BASE_URL}/report/upload`;
      }
    }
    axios
      .post(url, data, { headers: { Authorization: authToken } })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const schemes = (data, authToken, formType) => {
  return new Promise((resolve, reject) => {
    const _type = {
      tmu: `${BASE_URL}/tmu/raiseTmu`,
      pmu: `${BASE_URL}/pmu/raisePmu`,
      incident: `${BASE_URL}/report/submitIncidentReport`,
      accident: `${BASE_URL}/report/submitAccidentReport`,
      adminstrator: `${BASE_URL}/report/submitAdminReport`,
    };
    axios
      .post(_type[formType], data, {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const checkMembershipPaymentStatus = async (authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/payment/checkMembershipPaymentStatus`, {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const payRegistrationFee = async (authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASE_URL}/payment/payRegistrationFee`,
        {},
        {
          headers: { Authorization: authToken },
        }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const payVariableFee = async (authToken, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/payment/pay/icpa`, data, {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateUserProfile = async (authToken, data) => {
  try {
    let res = await axios.post(
      `${BASE_URL}/admin/updateUserProfile`,
      { ...data },
      { headers: { Authorization: authToken } }
    );
    return res;
  } catch (e) {
    return null;
  }
};

export const getUsersListAdmin = async (authToken) => {
  try {
    let res = await axios.get(
      `${BASE_URL}/admin/getuserlist?pageSize=5000&pageNum=1`,
      { headers: { Authorization: authToken } }
    );
    return res;
  } catch (e) {
    return null;
  }
};

export const sendRegistrationToken = async (
  email,
  registration_token,
  authToken
) => {
  console.log("sendToken", email, registration_token);
  try {
    let res = await axios.post(
      `${BASE_URL}/notify/sendRegistrationToken`,
      { email, registration_token },
      { headers: { Authorization: authToken } }
    );
    return res;
  } catch (e) {
    return e;
  }
};
