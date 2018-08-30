const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const UserDetail = require('./models/userdetail');
const UserAnswer = require('./models/useranswer');

const userDetailRoutes = require('./routes/userdetailRoutes');
const userAnswerRoutes = require('./routes/useranswerRoutes');

const app = express();

const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use('/userdetails', userDetailRoutes);
app.use('/useranswers',userAnswerRoutes);


mongoose.connect('mongodb://root:anshul7931@ds135747.mlab.com:35747/passtracker',{ useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Connection is successfully established");
});


app.listen(port,()=>{
    console.log("app is running on "+port);
});