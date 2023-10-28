import {

    ALLOW_USER_LOGIN,
    LOGOUT_USER,
    TOGGLE_SIDEBAR,

} from './actions';

// import { initialState } from './appContext';

const reducer = (state, action) => {

    if (action.type === ALLOW_USER_LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            user: {
                username: action.payload.username,
                password: action.payload.password,
            },
        };
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        };
    }
};

export default reducer;