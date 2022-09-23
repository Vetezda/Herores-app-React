import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

                            //children es el componente hijo que tiene <PrivateRoute />
export const PrivateRoute = ({ children }) => {

    const {user} = useContext(AuthContext);
    const {pathname, search} = useLocation();

    localStorage.setItem('lastPath', pathname + search);

  return user.logged //si el usuario esta logeado
            ? children //debe mostrar el componente hijo
            : <Navigate to="/login" />; //caso contrario, lo envía al login
}
