const {userModel,postModel,categoryModel, commentModel}= require('../database/schems');

// user data constrollers 
const getAllUsers = async (req,res)=>
{
    try
    {
        let res_back=await userModel.find();

        res_back.length ? res.json({ status:'success', Data:{ res_back }}) : res.json({ status:'success', msg:'NO data found'});
    }
    catch(err)
    {
        res.status(400).json({
            status:'failed',
            msg:err.message
        })
    }
}

const createUser = async(req,res)=>
{
    try{
           let data=new userModel(req.body);

           if(!await isAlreadyExist(req.body.username,req.body.email))
           {

            let res_back=await data.save(data);

             res.json({
             status:'success',
              msg:'user created successfully',
              data:{
                res_back
              }
          });
              
        }

        else{

            res.status(400).json({
                status:"failed",
                msg:"User already exsist please try again with different username or pasword"
            })

        }

       
    
          
    }

    catch(err)
    {
          res.status(400).json({
            staus:"failed",
            msg:err.message
          })
    }
}

const isAlreadyExist = async(username,email)=>
{
    try
    {
           let res_back=await userModel.find({username:username} || {email:email});
           return res_back.length ? true : false;
    }
    catch(err)
    {
       console.log(err.message);
    }
}

const getAllUserInfo = async(req,res)=>
{
    try{

            let userName=req.body.username;
            let userInfo=await userModel.find({username:userName},{password:0,location:0,lastlogin:0});
        

            if(userInfo.length)
            {
                let userId=userInfo[0]._id;
                let postData=await postModel.find({authorId:userId});

                let commentData=await commentModel.find({userId:userId});

                res.json({
                    status:"success",
                    user:{
                        userInfo
                    },
                    posts:{
                        postData
                    },
                    comments:{
                        commentData
                    }
                })
            }

            else{

                res.status(400).json({
                    status:"failed",
                    msg:"No such user found with this context"
                })

            }
    }
    catch(err)
    {

    }
}


// post data controllers 

const createPost = async(req,res)=>
{
    try{
       
          const postData=new postModel(req.body);
          let res_back=await postData.save(postData);

          res.json({
            status:'success',
            msg:'post created successfully',
            data:{
                res_back
            }
            
          })

    }
    catch(err)
    {

        res.status(400).json({
            status:'failed',
            msg:err.message
        })

    }
}

const getPostByAuthodId = async(req,res)=>
{
    try
    {
        let author_id=req.params.id;

        let res_back=await postModel.find({authorId:author_id}); 
        res_back.length ? res.json({status:'success',msg:`${res_back.length} posts found with this author`,data:{res_back}}): res.status(400).json({status:'failed',msg:"no such post found with particular this author"});
    }
    catch(err)
    {
          res.status(400).json({
            ststus:"failed",
            msg:err.message
          })
    }
}

const getAllPosts = async(req,res)=>
{
    try
    {
        let res_back=await postModel.find();
        res_back.length ? res.json({status:'success',msg:`${res_back.length} posts found `,data:{res_back}}): res.status(400).json({status:'failed',msg:"no post found"});

    }
    catch(err)
    {
        res.status(400).json({
            ststus:"failed",
            msg:err.message
          })

    }
}



// category controllers 
const addCategory = async(req,res)=>
{
    try
    {
        let categories=req.body;
        let res_back= await categoryModel.insertMany(categories);
        res.send({
            status:'success',
            data:{
                res_back
            }
        })


    }
    catch(err)
    {
           res.status(400).send({
            status:"success",
            msg:err.message
           })
    }
}


// comment controllers

const addComment = async(req,res)=>
{
    try
    {
         let commentData = req.body;

         let data= new commentModel(commentData);
        let res_back=await data.save(commentData);

         res.send({
            status:"success",
            data:{
                res_back
            }
         })
    }
    catch(err)
    {
        res.status(400).json({
            status:"failed",
            msg:err.message
        })
    }
}

const getCommentByPostId = async(req,res)=>
{
    try
    {
        let postId=req.body.postId;

        commentModel.aggregate([
            {
              $match: {userId: ObjectId(`${postId}`)} // Replace "post_id_1" with the desired post ID
            },
            {
              $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "post",
                as: "comments"
              }
            },
            {
              $unwind: "$comments"
            },
            {
              $lookup: {
                from: "users",
                localField: "comments.user",
                foreignField: "_id",
                as: "comments.user"
              }
            },
            {
              $unwind: "$comments.user"
            },
            {
              $project: {
                "title": 1,
                "content": 1,
                "comments._id": 1,
                "comments.comment": 1,
                "comments.user.name": 1,
                "comments.user.email": 1
              }
            }
          ])
          


        res.json({
            status:"success",
                comments:{
                   comments
                }
             
        })

    }
    catch(err)
    {
          res.status(400).send({
            status:"failed",
            msg:err.message
          })
    }
}










module.exports= {getAllUsers,createUser,createPost,getPostByAuthodId,getAllPosts,addCategory,addComment,getAllUserInfo,getCommentByPostId};