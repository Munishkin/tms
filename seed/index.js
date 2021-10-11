import { Seeder } from 'mongo-seeding';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const salt = crypto.randomBytes(16);

crypto.pbkdf2(process.env.PASSWORD, salt, 10000, 32, 'sha256', (err, password) => {
    if (err) {
        throw new Error('Error occurred while generating hashed password');
    } 

    const seeder = new Seeder({
        database: process.env.MONGO_URI,
        dropDatabase: true
    });

    const admin = {
        username: 'Admin',
        firstname: 'Munira',
        lastname: 'Begmuratova',
        role: 'admin',
        password,
        salt
    };

    const seedData = async () => {
        try {
            await seeder.import([{
                name: 'usermodels',
                documents: [admin]
            }]);

            console.log('Successfully seeded data')
        } catch(err) {
            throw new Error(err);
        }
        
    }

    seedData()
});
