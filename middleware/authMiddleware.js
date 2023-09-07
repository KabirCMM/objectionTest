const {getUser} = require("../services/Auth")

async function authenticateUser(req,res,next) {
  const userUid = req.cookies?.uid;
  
  if(!userUid) return res.status(401).json({ error: 'Unauthorized' });

  const user = getUser(userUid);

  if(!user) return res.status(401).json({error: 'Unauthorized'})

  req.user = user;
  next();
}


// const jwt = require('jsonwebtoken');
// const config = require('../config');

// function authenticateToken(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, config.jwtSecret, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid token' });
//     }
//     req.user = user;
//     next();
//   });
// }

module.exports = {
  authenticateUser,
};
