const ex = require('express')

const Mongoose = require('mongoose')

const Cors = require('cors') 

const app = ex()

app.set('view-engine' , 'ejs')

app.use(ex.json())

app.use(Cors())

app.use(ex.urlencoded())

Mongoose.connect("mongodb+srv://hrishi007:qwerty100@cluster0.rdpsxvx.mongodb.net/student?retryWrites=true&w=majority")

// Mongoose.connect("mongodb://localhost:27017/studentdata")

const studentschema = new  Mongoose.Schema({

    "age": {
        type: Number,
        required : true
    },
    
"rollNo": {
    type: Number,
    required : true
},

"city": {
    type: String,
     required : true,
    minlength : 3,
    maxlength: 50
},


"name": {
    type: String,
    required : true,
    minlength : 3,
    maxlength: 50   
    // validate: {
    //     validator : function(info){

    //         if(info.length < 3){

    //         }
            
    //     }
    // }
}
})

const studentmodel = Mongoose.model("student" , studentschema )


app.post("/collect" , async function(req,res){

    

const myage = req.body.formdata.age
const myrollNo =  req.body.formdata.rollNo 
const mycity = req.body.formdata.city

const myname = req.body.formdata.name



const studentobj = new studentmodel({
    "age": myage,
    "rollNo": myrollNo,
    "city": mycity ,
    "name": myname,

})

await studentobj.save().then(function(){

    res.send("Data is successfully Saved")

}).catch(function(error){

    res.send(`Data is NOT!!! successfully Saved ${error.message}`)
    
})




})

app.post("/read" , async function(req,res){
    const rdata = await studentmodel.find()
    //console.log(rdata)

    res.send( rdata)
})

app.get("/read/data/:id" , async function(req,res){


     const val = req.params.id


     const sid = await studentmodel.find({rollNo: val})
     res.send(sid)

})


app.delete("/delete/data/:id" , async function(req,res){

    const studentid = req.params.id
    const studentdata = await studentmodel.deleteOne({rollNo:studentid})
    

    res.send("Student data is sucessfully deleted")

})

app.listen(9000 , function(){
console.log("server running on port 9000")
})