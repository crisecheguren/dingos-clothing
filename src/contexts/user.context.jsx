import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
import { onAuthStateChangedHandler, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
};


const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};

const INITAL_STATE = {
    currentUser: null,
};


export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITAL_STATE);
    const { currentUser } = state; 

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    };

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHandler((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}