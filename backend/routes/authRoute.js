const express = require('express');
const router = express.Router();
const socialUtils = require("../socialAuthUtils.js");
const User = require("../models/userModel");
const accessUtils = require("../util.js")

router.post("/social", async (req, res) => {
    var { provider, accessToken } = req.body;
    if (provider == null || provider == '' || provider == undefined || (provider != "google" && provider != "facebook")) {
        res.send({
            success: false,
            message: "Please provide valid social provider!"
        })
        return;
    }
    if (accessToken == null || accessToken == '' || accessToken == undefined) {
        res.send({
            success: false,
            message: "Please provide valid accessToken!"
        })
        return;
    }
    //sanitize provider
    provider = provider.toLowerCase();
    try {
        if (provider == "google")
            var socialUserData = await socialUtils.verifyGoogleAccess(accessToken);
        else
            var socialUserData = await socialUtils.verifyFacebookAccess(accessToken);
    }
    catch (err) {
        console.log("error", err)
        res.status(400).send({
            success: false,
            data: err
        })
        return
    }
    if (socialUserData) {
        socialUtils.validateUserRegistration(socialUserData)
            .then(async (validatedUser) => {
                var token = await accessUtils.getToken(accessToken, provider);
                validatedUser.token = token;
                res.status(200).send(validatedUser)
            })
    }
    else {
        res.status(400).send({
            success: false,
            data: "Invalid payload"
        })
    }
})

module.exports = router;