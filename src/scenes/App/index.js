import LoginForm from '../Login';
import RegisterForm from '../Register';
import AuthContainer from '../../components/AuthContainer';
import Main from '../Main';
import {
    Switch,
    Route
  } from 'react-router-dom';

export default () => {
    return (
        <>
            <Switch>
                <Route path="/register" component={RegisterForm}/>
                <Route path="/login" component={LoginForm}/>
            </Switch>
            <AuthContainer>
                <Main />
            </AuthContainer>
        </>
    );
}
