import {
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import roleConfig from '../../services/roleConfig';
import Records from '../Records';
import UpdateRecord from '../UpdateRecord';
import AddRecord from '../AddRecord';
import Profile from '../Profile';
import Users from '../Users';
import UpdateUser from '../UpdateUser';
import AddUser from '../AddUser';

export default () => {
    const { role } = useSelector(state => state.user.user);
    const { 
        permissions: { 
            canAccessRecords, 
            canAccessUsers 
        },
        defaultScreen
    } = roleConfig[role];

    return (
        <Switch>
            { canAccessRecords && <Route exact path="/records" component={Records}/> }
            { canAccessRecords && <Route exact path="/records/add" component={AddRecord}/> }
            { canAccessRecords && <Route exact path="/records/:id" component={UpdateRecord}/> }
            { canAccessUsers && <Route exact path="/users" component={Users}/> }
            { canAccessUsers && <Route exact path="/users/add" component={AddUser}/> }
            { canAccessUsers && <Route exact path="/users/:id" component={UpdateUser}/> }
            <Route exact path="/profile" component={Profile}/>
            <Redirect exact from="/" to={`/${defaultScreen}`}/>
        </Switch>
    );
}