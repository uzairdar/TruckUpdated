import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from "./Actions";
// import axios from "axios";
// import { baseUrl } from '../assests/serverdetails'

export const setUser = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

// export const setSubtitle = (payload) => {
//   return {
//     type: SET_SUBTITLE,
//     payload: payload,
//   };
// };

// export const setCompleted = (payload) => {
//   return {
//     type: SET_COMPLETED_TASKS,
//     payload: payload,
//   };
// };
// export const loadCompleted = () => {
//   return {
//     type: LOAD_COMPLETED,
//   };
// };

export const loadUser = () => {
  //   const token = localStorage.getItem('token')
  //   console.log('token is load', token)
  //   if (token !== null) {
  //     console.log('im the load user ')
  //     return dispatch => {
  //       return axios
  //         .post(`${baseUrl}/user/loaduser/${token}`)
  //         .then(response => {
  //           if (response.data.user) {
  //             const payload = {
  //               token: token,
  //               user: { ...response.data.user }
  //             }
  //             dispatch(setUser(payload))
  //             dispatch(fetchGigs(payload.user._id))
  //           } else {
  //             logoutSuccess()
  //           }
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     }
  //   } else {
  //     return dispatch => {
  //       dispatch(logoutSuccess())
  //     }
  //   }
};

export const fetchGigs = (uid) => {
  // return dispatch => {
  //   return axios
  //     .get(`${baseUrl}/gig/${uid}`)
  //     .then(response => {
  //       console.log('gigs are ', response.data.gigs)
  //       dispatch(setGigs(response.data.gigs))
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
};
