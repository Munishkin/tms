import mongoose from 'mongoose';

export default async function initDb() {
    try {
         await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (e) {
        console.log(`db error ${e.message}`);
    }
};
