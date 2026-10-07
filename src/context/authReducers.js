import { AUTH_ACTIONS } from "./constants";

// Reducer function to update the state based on the action type
const authReducer = (state, action) => {
    switch (action.type) { // switch statement to check the action type
        case AUTH_ACTIONS.SIGNUP_REQUEST: // if the action type is SIGNUP_REQUEST
            return { ...state, loading: true, error: null }; // return the new state with loading set to true and error set to null

        case AUTH_ACTIONS.SIGNUP_SUCCESS: // if the action type is SIGNUP_SUCCESS
            localStorage.setItem("user", JSON.stringify(action.payload));
            if (action.payload.avatarUrl || action.payload.profilePicture || action.payload.avatar) {
                localStorage.setItem("userProfilePic", action.payload.avatarUrl || action.payload.profilePicture || action.payload.avatar);
            }
            return { ...state, loading: false, user: action.payload, error: null }; // return the new state with loading set to false, user set to the payload, and error set to null

        case AUTH_ACTIONS.SIGNUP_ERROR: // if the action type is SIGNUP_ERROR
            return { ...state, loading: false, error: action.payload }; // return the new state with loading set to false and error set to the payload

        case AUTH_ACTIONS.LOGIN_REQUEST: // if the action type is LOGIN_REQUEST
            return { ...state, loading: true, error: null }; // return the new state with loading set to true and error set to null

        case AUTH_ACTIONS.LOGIN_SUCCESS: // if the action type is LOGIN_SUCCESS
            localStorage.setItem("user", JSON.stringify(action.payload));
            if (action.payload.avatarUrl || action.payload.profilePicture || action.payload.avatar) {
                localStorage.setItem("userProfilePic", action.payload.avatarUrl || action.payload.profilePicture || action.payload.avatar);
            }
            return { ...state, loading: false, user: action.payload, error: null }; // return the new state with loading set to false, user set to the payload, and error set to null

        case AUTH_ACTIONS.LOGIN_ERROR: // if the action type is LOGIN_ERROR
            return { ...state, loading: false, error: action.payload }; // return the new state with loading set to false and error set to the payload

        case AUTH_ACTIONS.LOGOUT: // if the action type is LOGOUT
            localStorage.removeItem("user");
            localStorage.removeItem("userProfilePic");
            return { ...state, user: null }; // return the new state with user set to null

        case AUTH_ACTIONS.UPDATE_USER: // if the action type is UPDATE_USER
            const updatedUser = { ...state.user, ...action.payload };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            if (action.payload.avatarUrl || action.payload.profilePicture || action.payload.avatar) {
                localStorage.setItem("userProfilePic", action.payload.avatarUrl || action.payload.profilePicture || action.payload.avatar);
            }
            return { ...state, user: updatedUser };

        default: // if the action type is not recognized
            return state; // return the current state
    }
};

export default authReducer; // export the authReducer function
