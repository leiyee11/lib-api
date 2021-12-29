const express = require('express')
const user = require('../controllers/UserController')
const router = express.Router()
const testuser = require('./user');
const { authMiddleware } = require('../controllers/UserController')

router.post('/register', user.register)

router.post('/login', user.login)

router.get('/profile', authMiddleware, function (req, res) {
  res.json({ 'access': true })
})

module.exports = router
/////////

userRouter.get('/facebook/token', passport.authenticate('facebook-token'), function (req, res, next) {
  if (req.user) {
  let token = authenticate.getToken({ _id: req.user._id }); 
  res.cookie('jwt',token,{secure:true,httpOnly:true});
  res.cookie('adm',req.user.admin,{secure:true});
  res.cookie('user',`${req.user.firstName} ${req.user.lastName}`,{secure:true});
  res.status(200).send();
  }
})