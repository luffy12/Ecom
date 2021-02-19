let jwt=require('jsonwebtoken');
require('dotenv').config(); 
const JWT_SECRET =process.env.JWT_SECRET
const getToken = (accessToken, provider,user) => {  
    return jwt.sign(
      user? {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        
      }:{
        accessToken: accessToken,
        provider: provider,
      },
      JWT_SECRET,
      {
        expiresIn: '48h',
      }
    );
  };
  const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (token) {
      const onlyToken = token.slice(7, token.length);
      jwt.verify(onlyToken, JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({ message: 'Invalid Token' });
        }
        req.user = decode;
        next();
        return;
      });
    } else {
      return res.status(401).send({ message: 'Token is not supplied.' });
    }
  };
  
  const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  };

  module.exports={getToken,isAdmin,isAuth};