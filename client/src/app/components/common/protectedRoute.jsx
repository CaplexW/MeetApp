import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLoginStatus } from '../../store/users';
// eslint-disable-next-line no-unused-vars
import showElement from '../../utils/debug/showElement';
import { nodesType } from '../../mockData/propTypesScheme';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(getLoginStatus());
  const protectedPath = useLocation().pathname;
  const prevPath = { state: { from: protectedPath } };
  const redirectTo = useNavigate();

  useEffect(() => { redirectWithPrevLocation(); }, []);
  function redirectWithPrevLocation() {
    if (!isLoggedIn) redirectTo('/login', prevPath);
  }

  if (isLoggedIn) return children;
}

ProtectedRoute.propTypes = {
  children: nodesType.isRequired,
};

// ProtectedRouteOld.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };
