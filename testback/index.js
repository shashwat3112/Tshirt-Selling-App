const express = require("express");

const app = express();

const port = 8000;

app.get("/",(req, res) => {
    return res.send("Homepage");
});
const admin =(req,res)=>{
    return res.send("this is admin dashboard");
};

const isAdmin = (req,res,next)=>{
    console.log("isAdmin is running");
    next();
};
const isLoggedin =(req,res,next)=>{
    console.log("is Loggedin is running");
    next();
};

app.get("/admin",isAdmin,isLoggedin, admin);

app.get("/login",(req, res) => {
    return res.send("You are visiting a login route");
});

app.get("/signup",(req, res) => {
    return res.send("You are visiting a signup route");
});


app.get("/logout",(req, res) => {
    return res.send("Logged out");
});

app.get("/Shashwat",(req, res) => {
    return res.send("Shashwat is using Instagram");
});

app.listen(port, () => {
    console.log("Server is up and running...");
});