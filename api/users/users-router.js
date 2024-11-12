const express = require('express');
const  {
  validateUserId,
} = require('../middleware/middleware')
const User = require('../users/users-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();


router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try{
    const users = await User.get()
    if(!users){
      res.status(404).json({
        message: 'no such user'
      })
    }else{
      res.status(200).json({
        message:users
      })
    }
  } catch(err){
    res.status(500).json({
      message: 'problem finding user'
    })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // validateUserId(req,res,next)
  console.log("GET: ", req.user)  
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log("PUT: ", req.user)
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log("DELETE: ", req.user)  
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log("GET: Posts: ", req.user)  
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log("POST: Posts: ", req.user)  
});

// do not forget to export the router
module.exports = router