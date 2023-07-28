const express=require('express');
const sms=require("../sms.js");
const fetch = require('cross-fetch');
const router=express.Router();

async function fetchMoviesJSON() {
    const response = await fetch('your excel api for get date and whatsapp number');
    const data = await response.json();
    return data;
  }
//  Router1: fetch all notest: /fetchallnotes| LOGIN REQUIRE
router.get('/sendsms', async (req, res) => {
    try {
        // const notes=await Notes.find({user: req.user.id});
        // res.send(notes);
        let field =[];
        fetchMoviesJSON().then(data =>{
            sms(data.data.slice(1));
            console.log("works",data);
            field=data;
            res.send(data.data.slice(1));
        });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

module.exports=router;