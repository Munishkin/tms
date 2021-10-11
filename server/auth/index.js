import passport from 'passport';
import Strategy from 'passport-local';
import crypto from 'crypto';
import userService from '../services/userService';

export default function() {
    passport.use(new Strategy(function(username, password, cb) {
        userService
            .getByUsername(username)
            .then((user) => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect username. Please retry again.' });
                }

                crypto.pbkdf2(password, user.salt, 10000, 32, 'sha256', function(err, hashedPassword) {
                    if (err) { 
                        return cb(err); 
                    }
                    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                      return cb(null, false, { message: 'Incorrect password. Please retry again' });
                    }
                    
                    const userData = {
                      _id: user._id.toString(),
                      role: user.role,
                      username: user.username,
                      firstname: user.firstname,
                      lastname: user.lastname,
                      ...( user.preferredWorkingHoursPerDay && 
                        { preferredWorkingHoursPerDay: user.preferredWorkingHoursPerDay })
                    };

                    return cb(null, userData);
                  });
            })
            .catch(cb)
      }));
    
      passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          cb(null, user);
        });
      });
    
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });
};
