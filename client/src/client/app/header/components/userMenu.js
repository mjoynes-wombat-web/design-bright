import { Link } from 'react-router-dom';

const UserMenu = ({ requireAuth, userType, onLogout }) => {
  if (requireAuth()) {
    if (userType === 'donor') {
      return (
        <ul className="user-menu">
          <li><Link to="/user/profile">Profile</Link></li>
          <li><Link to="/" onClick={onLogout}>Logout</Link></li>
        </ul>
      );
    } else if (userType === 'non-profit') {
      return (
        <ul className="user-menu">
          <li><Link to="/user/profile">Profile</Link></li>
          <li><Link to="/user/manage-campaigns">Campaigns</Link></li>
          <li><Link to="/" onClick={onLogout}>Logout</Link></li>
        </ul>
      );
    }
  }
  return (
    <ul className="user-menu">
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
};

export default UserMenu;
