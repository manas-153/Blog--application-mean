const express = require('express');
const cors=require('cors');
const { getAllUsers,createUser,createPost,getPostByAuthodId,getAllPosts,addCategory,addComment,getAllUserInfo,getCommentByPostIdWithUserInfo} = require('../controllers/controller');

const router=express.Router();




router.use(cors());

// user routing 
router.get('/getAllUsers',getAllUsers);
router.post('/createUser',createUser);
router.post('/getAllUserInfo',getAllUserInfo)



// post routing 

router.post('/createPost',createPost);
router.get('/getPostByAuthodId/:id',getPostByAuthodId);
router.get('/getAllPosts',getAllPosts);


//category Routing 

router.post('/addCategory',addCategory);

// comment routing 

router.post('/addComment',addComment);
router.post('/getCommentByPostIdWithUserInfo',getCommentByPostIdWithUserInfo);

module.exports=router;