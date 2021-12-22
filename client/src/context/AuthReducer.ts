import { Reducer } from 'react';
import AuthContextState from '../types/AuthContextState';
import { AuthActionType, LoginAction } from '../types/AuthReducerAction';

// eslint-disable-next-line
const reducer: Reducer<AuthContextState, LoginAction> = (state, action) => { // TODO: Fix lint
    switch (action.type) {
    case AuthActionType.USER_LOGIN:
        return {
            ...state,
            user: action.payload,
            isAuthenticated: true
        };
    default:
        return state;
    }
};

export default reducer;
