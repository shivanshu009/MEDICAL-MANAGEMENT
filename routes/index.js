var express = require('express');
var router = express.Router();
const User = require("../models/userModel")
const Work = require("../models/userModel1")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
// ==============signin==============
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign-In' });
});
router.post("/signin" ,async function(req,res){
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username})
    if(user == null){
      return res.send(`user not found. <a href="/signin">Sign-In</a>`)
    }
    if(password !== user.password){
      return res.send(`Incorrect password. <a href="/signin">Sign-In</a>`)
    }
    res.redirect("/profile")
  } catch (error) {
    res.send(error)
  }
})
// =============profile=======================
router.get('/profile',async function(req, res, next) {
  try {
    const tasks = await Work.find()
    const task = await Work.findById(req.params.id)
    res.render('profile' ,{
     title : "profile",
     tasks,
     task,
    })
  } catch (error) {
    res.send(error)
  }
});
// ===========delete=====================
router.get("/delete/:id", async function(req,res){
  try {
    await Work.findByIdAndDelete(req.params.id)
    res.redirect("/profile")
  } catch (error) {
    res.send(error)
  }
})
// =============update====================
router.get("/update/:id", async function(req,res){
  try {
    const task = await Work.findById(req.params.id)
   res.render("update" ,{
    title : "update-page",
    task,
   })
  } catch (error) {
    res.send(error)
  }
})
// =================================================
router.post("/update/:id", async function(req,res){
  try {
    await Work.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/profile")
  } catch (error) {
    res.send(error)
  }
})
// ===================add==================
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add-task' });
});
router.post("/add", async function(req,res){
  try {
    const newtask = new Work(req.body);
    await newtask.save()
    res.redirect("/profile")
  } catch (error) {
    res.send(error)
  }
})
// =============signup=====================
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign-up' });
});
router.post("/signup" ,async function(req,res){
  try {
    const newuser = new User(req.body);
    await newuser.save()
    res.redirect("/signin")
  } catch (error) {
    res.send(error)
  }
})
// ===============getmail============================
router.get('/getmail', function(req, res, next) {
  res.render('getmail', { title: 'Forget-password' });
});
router.post('/getmail', async function(req, res, next) {
  try {
    const user = await User.findOne({email : req.body.email})
    if(user == null){
      return res.send(`user not found. <a href="/getmail">Forget-password ?</a>`)
    }
    res.redirect("/changepassword/" + user._id)    
  } catch (error) {
    res.send(error)
  }
});
// =====================change-password=====================
router.get('/changepassword/:id', function(req, res, next) {
  res.render('changepassword', { 
    title: 'Reset password',
     id : req.params.id,
})
});
// ===========================================================
router.post("/changepassword/:id", async function(req,res){
  try {
    await User.findByIdAndUpdate(req.params.id , req.body);
    res.redirect("/signin")
  } catch (error) {
    res.send(error)
  }
})
// ============================================================
module.exports = router;
