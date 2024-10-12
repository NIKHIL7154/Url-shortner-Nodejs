const {mongoose}=require('./config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    urls:{
        type:[String],
    }
});

module.exports = mongoose.model('User', userSchema);