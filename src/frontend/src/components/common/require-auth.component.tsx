import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../../context/app.context';

const RequireAuth = () => {
  const { auth } = useContext(AppContext);
  const location = useLocation();

  return (
    auth ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
  )
}

export default RequireAuth;