import "./App.css";
import {
  authReducer,
  AuthStateProvider,
  initialAuthState,
} from "./AuthContext";
import Router from "./Router";

const App = () => {
  return (
    <AuthStateProvider initialState={initialAuthState} reducer={authReducer}>
      <Router />
    </AuthStateProvider>
  );
};

export default App;
