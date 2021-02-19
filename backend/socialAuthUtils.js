var GOOGLE_CLIENT_ID = "-.apps.googleusercontent.com"
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const User = require("./models/userModel");
const axios = require('axios');
module.exports = {
  verifyGoogleAccess: (token) => {
    return new Promise(async (success, failure) => {
      console.log("verify client")
      client.verifyIdToken({
        idToken: token,
      }).then(ticket => {
        const payload = ticket.getPayload();

        //check if the accessToken is expired
        const currentTime = new Date()
        const expiryTime = new Date(payload.exp * 1000)
        if (!(Date.parse(expiryTime) > Date.parse(currentTime))) {
          failure("Access Token is expired")
        }
        console.log("after check verify")
        success(payload)

      }).catch(err => {
        console.log(err)
        failure("Invalid access token");
      })
    })
  },
  verifyFacebookAccess: (token) => {
    return new Promise(async (success, failure) => {
      await axios.get("https://graph.facebook.com/me?fields=email,name&access_token=" + token)
        .then(response => {
          console.log(response.data)
          success(response.data)
        })
        .catch(error => {
          failure("Invalid token")
        });
    })
  },

  validateUserRegistration: function (socialUserData) {
    return new Promise(async (success, failure) => {
      User.findOne({ email: socialUserData.email }, function (err, data) {
        if (data) {
          //document exists });
          console.log("user exist", data)
          success({
            success: true,
            data: {
              username: data.username,
              email: data.email
            }
          })
        }
        else {
          var user = new User({
            email: socialUserData.email,
            username: socialUserData.name,
          })
          user
            .save()
            .then(data => {
              success({
                success: true,
                message: 'Patient has been added successfully',
                data: {
                  username: data.username,
                  email:data.email
                }
              })

            })
            .catch(err => console.log(err));
        }
      });
    })
  }
}
