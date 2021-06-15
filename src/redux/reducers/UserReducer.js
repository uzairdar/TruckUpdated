import {
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../Actions";
const initialState = {
  isLoading: false,
  isAuthenticated: null,
  user: null,
  // token: localStorage.getItem('token')
};
const UserReducer = (state = initialState, action) => {
  console.log("hello there", action.payload);

  switch (action.type) {
    // case SET_ABOUT:
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    // case SET_HEADING:
    //   return {
    //     ...state,
    //     data: { ...state.data, Heading: action.payload },
    //   };

    case LOGIN_SUCCESS:
      console.log("success");
      // localStorage.setItem("token", action.payload.token);
      return {
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
    // case LOGIN_FAIL:
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");
    //   return {
    //     isAuthenticated: null,
    //     isLoading: false,
    //     user: null,
    //   };
    default:
      return state;
  }
};
export default UserReducer;
