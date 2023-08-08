const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({

     fullName:{
      type:String,
      required:true,
     },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
        default: '',
        trim: true,
      },
      avatar: {
        type: String,
        default: 'default_avatar.png',
      },
      dateOfBirth: {
        type: Date,
      },
      location: {
        type: String,
        default: '',
        trim: true,
      },
      socialMedia: {
        linkedin: { type: String, default: '', trim: true },
        // Add more social media accounts as needed
      },
      role: {
        type: String,
        enum: ['reader'],
        default: 'reader',
        required:true,
      },
      registeredAt: {
        type: Date,
        default: Date.now,
      },
      lastlogin:{
        type:Date,
        default: Date.now
      }
    });

const postSchema = new mongoose.Schema({
        authorId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        parentId: {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
        },
        title: {
          type: String,
          required: true,
        },
        metaTitle: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
        categoryId:{
          type:mongoose.Schema.Types.ObjectId,
          required: true,
        },
        Images:{
           type:Array
        }
    });


const categorySchema = new mongoose.Schema({
     name:{
      type:String,
      required:true
     }
})

const commentSchema = new mongoose.Schema({
  postId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  authorId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})
      


      
     

const userModel=mongoose.model('users',userSchema);
const postModel=mongoose.model('posts',postSchema);

const categoryModel=mongoose.model('categories',categorySchema);

const commentModel=mongoose.model('comments',commentSchema);

module.exports={userModel,postModel,categoryModel,commentModel};