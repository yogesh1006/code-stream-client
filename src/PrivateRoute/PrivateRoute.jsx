import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Contexts";

export function PrivateRoute({ path, component }) {
    const { authState } = useAuth();
    return authState.isUserLoggedIn ? (
        <Route path={path} component={component} />
    ) : (
        <Redirect state={{ from: path }} to="/login"  />
    );
}
