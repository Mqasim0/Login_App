const express = require('express');
const router = express.Router();

// credientials
const credientials = {
  email:'muhammadqasim@gmail.com',
  password:'1234'
}

// login route

router.post('/login',(req,res)=>{
   if(req.body.email == credientials.email && req.body.password == credientials.password){
     req.session.user = req.body.email
     res.redirect('/router/dashboard')
    //  res.send('Login successfull')
   }else{
     res.send('Invalid username ....')
   }
})

// route for dashboard

router.get('/dashboard', (req,res)=>{
  if(req.session.user){
    res.render('dashboard', {user: req.session.user})
  }
  else{
    res.send('Unauthorized User')
  }
})

// route for logout

router.get('/logout', (req,res)=>{
  req.session.destroy(function(err){
    if(err){
      console.log(err)
      res.send(err)
    }
    else{
      res.render('base', {title:'Express', logout: 'Logout Successfully'})
    }
  })
})


module.exports = router;