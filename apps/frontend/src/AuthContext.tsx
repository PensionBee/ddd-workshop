import { Dispatch, createContext, useContext, useReducer } from "react";

type AuthState = {
  user?: {
    username: string;
  };
};

type AuthAction =
  | {
      type: "LOG_IN";
      payload: {
        username: string;
      };
    }
  | {
      type: "LOG_OUT";
    };

// eslint-disable-next-line react-refresh/only-export-components
export const initialAuthState: AuthState = {};

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.username,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
};

const AuthStateContext = createContext<[AuthState, Dispatch<AuthAction>]>([
  initialAuthState,
  () => initialAuthState,
]);

type AuthStateProviderProps = {
  reducer: (state: AuthState, action: AuthAction) => AuthState;
  initialState: AuthState;
  children: React.ReactNode;
};

export const AuthStateProvider: React.FC<AuthStateProviderProps> = ({
  reducer,
  initialState,
  children,
}) => (
  <AuthStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AuthStateContext.Provider>
);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthState = () => useContext(AuthStateContext);
