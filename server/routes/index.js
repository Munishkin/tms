import api from './api';
import authenticate from './authenticate';
import logout from './logout';
import register from './register';

export default app => {
    app.use('/api', api);
    app.use('/authenticate', authenticate);
    app.use('/logout', logout);
    app.use('/register', register);
};
