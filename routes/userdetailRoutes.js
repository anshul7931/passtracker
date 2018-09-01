const express = require('express');
const UserDetail = require('../models/userdetail');
const router = express.Router();

/**
 * Creates the list view
 * and provides back with the username and password of the requested resource.
 * 
 * GET
 * http://localhost:4000/userdetails/getUserDetails/anshul7931
 */
router.get('/getUserDetails/:username',(req,res)=>{
    UserDetail.find({
         userid: req.params.username
    },(err,response)=>{
        if(err)
            res.send(err);
        else{
            res.status(200).json(response);
        }
    });
});

/**
 * On click of element in the list
 * this service will take the userId and id identifier(gmail/twitter...)
 * and provides back with the username and password of the requested resource.
 * 
 * GET
 * http://localhost:4000/userdetails/getUserDetails/anshul7931/Orkut
 */
router.get('/getUserDetailsWithIdentifier/:username/:idIdentifier',(req,res)=>{
    UserDetail.find({
         userid: req.params.username,
         idIdentifier: req.params.idIdentifier
    },(err,response)=>{
        if(err)
            res.send(err);
        else{
            res.status(200).json(response);
        }
    });
});

/**
 * Create a new element in the list ,
 * creates a new id and password record in userdetails db.
 * 
 * POST 
 * http://localhost:4000/userdetails/createNewUserDetail
 * 
 * {
        "userid": "anshul7931",
        "idIdentifier": "Orkut",
        "username": "anshul",
        "password": "anshul"
    }
 */
router.post('/createNewUserDetail',(req,res)=>{
    let newUserDetail = new UserDetail(req.body);
    let responseMessage = "";
    newUserDetail.save().then(newUserDetail=>{
        responseMessage="User details saved successfully";
        res.json({"responseMessage":responseMessage});
    }).catch(err=>{
        responseMessage="Unable to add user details";
        res.json({"responseMessage":responseMessage});
    });
});

/**
 * Updates existing username/password of corresponding username(userid)
 */
//router.put('/updateUserDetails',(req,res)={});

/**
 * Deletes existing username/password of corresponding username(userid)
 */
router.delete('/deleteUserDetails',(req,res)=>{
    UserDetail.findOneAndRemove({_id:req.body.id})
    .then(deletedUser=>res.json({"responseMessage":"User detail successfully deleted"}))
    .catch(err=>res.json({"responseMessage":err}))
});

module.exports = router;

