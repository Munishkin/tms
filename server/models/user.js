import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'manager', 'user']
    },
    preferredWorkingHoursPerDay: Number,
    password: {
        type: Buffer,
        immutable: true,
        required: true
    },
    salt: {
        type: Buffer,
        immutable: true,
        required: true
    }
},
{
    timestamps: true
});

UserSchema.pre('deleteOne', function (next) {
    const userId = this.getQuery()["_id"];
    mongoose.model('RecordsModel').deleteMany({'userId': userId}, function (err) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log('Successfully deleted user records.');
        next();
      }
    });
  });

export default mongoose.model('UserModel', UserSchema);
