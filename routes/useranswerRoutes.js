const express = require('express');
const UserAnswer = require('../models/useranswer');
const router = express.Router();

/**
 * Checks whether the username is available or not
 * check useranswers db with username as a parameter:
 * 0 -> Username available"
 * 1-> Username already exist
 * 1+ -> Somethis is wrong bcoz its a sign up username which should be unique
 * 
 * GET
 * http://localhost:4000/useranswers/getUserAvailability/anshul7931
 */
router.get('/getUserAvailability/:username',(req,res)=>{
    UserAnswer.find({userid: req.params.username},(err,response)=>{
        if(err)
            res.send(err);
        else{
            let responseSize = Object.keys(response).length;
            let responseMessage = "";
            if(responseSize == "0"){
                responseMessage = "Username available";
            }else if(responseSize == "1"){
                responseMessage = "Username already exist";
            }else{
                responseMessage = "Something went wrong. Will get back to you";
            }
            res.json({"responseMessage":responseMessage});
        }
    });
});

/**
 * Fetches the security question corresponding to the username provided
 * to complete the authentication process
 * 
 * GET
 * http://localhost:4000/useranswers/getAnswer/anshul7931/What is your pet name?
 * 
 * Same API can be used to verify the answer
*/
router.get('/getAnswer/:username',(req,res)=>{
    UserAnswer.findOne({
        userid: req.params.username
    },(err,response)=>{
        if(err)
            res.send(err);
        else
            res.status(200).json(response);
    });
});

/**
 * Sets the question and answer for the sign up process
 * corresponding to the provided username
 * POST http://localhost:4000/useranswers/createSecurityQuestionAnswer
 * 
{
    "userid": "anshul7931",
    "question": "What is your pet name?",
    "answer": "ABC"
}
 */
router.post('/createSecurityQuestionAnswer',(req,res)=>{
    let newUser = new UserAnswer(req.body);
    let responseMessage = "";
    newUser.save().then(newUser=>{
        responseMessage="User saved successfully";
        res.json({"responseMessage":responseMessage});
    }).catch(err=>{
        responseMessage="Unable to add user";
        res.json({"responseMessage":responseMessage});
    });
});

module.exports = router;