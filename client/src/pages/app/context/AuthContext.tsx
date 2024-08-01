import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react"

type AuthState = {
    user: any | null
}

type AuthAction =  {
    type: string ;
    payload?: any
}

type AuthContextProps = {
    state: AuthState;
    dispatch: Dispatch<AuthAction>
}

const initialState: AuthState = {
    user: null
}

export const AuthContext = createContext<AuthContextProps>({
    state: initialState,
    dispatch: () => null
});

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }: { children: ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, []);

    console.log('AuthContext state : ', state)

    return (
        <AuthContext.Provider value={{state, dispatch}} >
            {children}
        </AuthContext.Provider>
    );
}