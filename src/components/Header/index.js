import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../actions';
import roleConfig from '../../services/roleConfig';
import Link from '../Link';
import Header from './components/header';
import Menu from './components/menu';
import MenuItem from './components/menuItem';
import Logo from '../Logo';
import LogoutBtn from './components/logoutBtn';

export default () => {
    const { role } = useSelector(state => state.user.user);
    const { permissions: { canAccessRecords, canAccessUsers} } = roleConfig[role];
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(userActions.logout());
    }

    return (
        <Header>
            <Logo/>
            <nav>
                <Menu>
                    { canAccessRecords && <MenuItem><Link to="/records">Records</Link></MenuItem> }
                    { canAccessUsers && <MenuItem><Link to="/users">Users</Link></MenuItem> }
                    <MenuItem><Link to="/profile">Profile</Link></MenuItem>
                    <MenuItem><LogoutBtn onClick={logout}/></MenuItem>
                </Menu>
            </nav>
        </Header>
    );
}
