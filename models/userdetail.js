const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DetailSchema = new Schema({
    userid: String,
    idIdentifier: String,
    username: String,
    password:String
});

module.exports = mongoose.model("Userdetail",DetailSchema);