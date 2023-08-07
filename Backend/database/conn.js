const mongoose=require('mongoose');

const conn= async ()=>
{
    try
    {

    
    await mongoose.connect('mongodb://localhost:27017/sparklingblogs').then(res=>
    {
        console.log("Database connected successfully");
    }).catch(err=>
        {
            console.log("There is a issue while connecting with database");
        })

    }
    catch(err)
    {
        console.log(err.message);
    }
}

module.exports=conn;