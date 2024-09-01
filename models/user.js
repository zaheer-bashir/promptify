import { Schema , model , models } from "mongoose";

const UserSchema = new Schema({ 
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : [true, 'Email is already taken'],
    },
    username : {
        type : String,
        required : [true, 'Username is required'],
        unique : [
            true, 
            'Username is already taken'
        ],
    },
    image : {
        type : String,
        required : [true, 'Image is required'],
    }
});

const User = models.User || model('User', UserSchema);

export default User;