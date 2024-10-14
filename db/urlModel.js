const {mongoose}=require('./config');

const urlSchema = new mongoose.Schema({
    dest: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    uid:{
        type:String,
        required:true
    }
});
//updated content
module.exports = mongoose.model('Url', urlSchema);