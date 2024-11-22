import {connect} from 'mongoose';

const connectDb = async () => {
    try {
        await connect('mongodb://localhost:27017/uploader')
    } catch (error) {
        console.log("error in connecting to db");
    }
}

export default connectDb