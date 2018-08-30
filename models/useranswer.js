const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AnswerSchema = new Schema({
    userid: String,
    question: String,
    answer: String
});

module.exports = mongoose.model("Useranswer",AnswerSchema);