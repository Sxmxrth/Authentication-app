const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express()

mongoose.connect("mongodb://0.0.0.0:27017/userDB", {useNewUrlParser : true})

const userSchema = {
    email : String,
    password : String
}

const User = new mongoose.model("User", userSchema)

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", (req, res) => {
    const newUser = new User({
        email : req.body.username,
        password : req.body.password
    })
    newUser.save((err) => {
        err ? console.log(err) : res.render("secrets");
    })
})

app.post("/login", (req, res) => {
    User.find({email : req.body.username}, (err, docs) => {
        if(err){
            console.log(err);
        }else{
            if(docs){
                if(docs[0].password === req.body.password){
                    res.render("secrets")
                }
                else{
                    console.log("Password is wrong");
                }
            }
        }
    })
})

app.listen(3000, () => {
    console.log("Server is up and running on port 3000");
})
