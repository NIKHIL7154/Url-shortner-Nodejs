const {mongoose}=require('./config');

const urlSchema = new mongoose.Schema({
    url: {
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

module.exports = mongoose.model('Url', urlSchema);