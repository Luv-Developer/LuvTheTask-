require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
const path = require("path")
const http = require("http")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const {createClient} = require("@supabase/supabase-js")
const cookieParser = require("cookie-parser")
const { reverse } = require("dns")
const { deflateRawSync } = require("zlib")
const SUPABASEURL = process.env.SUPABASEURL
const SUPABASEKEY = process.env.SUPABASEKEY
const supabase = createClient(SUPABASEURL,SUPABASEKEY)
const ADMINMAIL = process.env.ADMINMAIL
const LOCALPASS = process.env.LOCALPASS
const SECRETKEY = process.env.SECRETKEY


// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())


// Routes
app.get("/",(req,res)=>{
    res.render("homepage")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/register",async(req,res)=>{
    let {username,email,password} = req.body
    try{
        if(!username || !email || !password){
            return res.redirect("/register")
        }
        let {data:user} = await supabase
        .from("users14")
        .select("username")
        .eq("username",username)
        .single()
        if(user){
            return res.redirect("/register")
        }
        else{
            let salt = await bcrypt.genSalt(12)
            let hash = await bcrypt.hash(password,salt)
            let {data:user2,err} = await supabase
            .from("users14")
            .insert([{
                username:username,
                email:email,
                password:hash,
                origpass:password
            }])
            if(err){
                return res.redirectI("/register")
            }
            else{
                return res.redirect("/login")
            }
        }
    }
    catch(error){
        return res.redirect("/register")
    }
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    let {email,password} = req.body
    try{
        if(!email || !password){
            return res.redirect("/login")
        }
        let {data:user,err} = await supabase
        .from("users14")
        .select("*")
        .eq("email",email)
        .single()
        if(!user){
            return res.redirect("/register")
        }
        else{
            let valid = await bcrypt.compare(password,user.password)
            if(!valid){
                return res.redirect("/login")
            }
            else{
                let token = jwt.sign({email},SECRETKEY)
                res.cookie("token",token)
                return res.redirect("/profile")
            }
        } 
    }
    catch(error){
        return res.redirect("/login")
    }
})
app.get("/forgot",(req,res)=>{
    res.render("forgot")
})
app.post("/forgot",async(req,res)=>{
    let {email} = req.body
    let {data:user} = await supabase
    .from("users14")
    .select("*")
    .eq("email",email)
    .single()
    let pass = user.origpass 
    
    // Nodemailer Configuration 
    let transporter = nodemailer.createTransport({
        secure:true,
        service:"gmail",
        port:465,
        auth:{
            user:ADMINMAIL,
            pass:LOCALPASS
        }
    })
    let reciever = {
        from:ADMINMAIL,
        to:email,
        subject:"Password Recovery - LuvTheTASK",
        text:"Your Password",
        html:`<h3>Password of ${email} is <b>${pass}</b></h3>`
    }
    transporter.sendMail(reciever,(err,msg)=>{
        if(err){
            return res.redirect("/forgot")
        }
        else{
            return res.redirect("/login")
        }
    })
})
app.get("/logout",(req,res)=>{
    res.cookie("token","")
    return res.redirect("/login")
})

const isloggedin = (req,res,next) =>{
    let token = req.cookies.token
    try{
        if(!token){
            return res.redirect("/login")
        }
        else{
            let data = jwt.verify(token,SECRETKEY)
            req.user = data
            next()
        }
    }
    catch(error){
        return res.redirect("/login")
    }
}

app.get("/profile",isloggedin,async(req,res)=>{
    let alltask = []
    let {data:user} = await supabase
    .from("users14")
    .select("*")
    .eq("email",req.user.email)
    .single()
    let username = user.username
    let {data:task} = await supabase
    .from("tasks")
    .select("*")
    .eq("email",req.user.email)
    task.forEach((e)=>{
        alltask.push(e)
    })
    let total = alltask.length
    res.render("Profile",{username,total})
})

app.get("/task",isloggedin,(req,res)=>{
    res.render("task")
})

app.post("/task",isloggedin,async(req,res)=>{
    let {data:user} = await supabase
    .from("users14")
    .select("*")
    .eq("email",req.user.email)
    .single()
    let email = user.email
    let {title,detail} = req.body
    let today = new Date()
    let date = String(today.getDate()).padStart(2,'0')
    let month = String(today.getMonth()).padStart(2,'0')
    let year = today.getFullYear()
    today = date + "/" + month + "/" + year
    let {data:task,err} = await supabase
    .from("tasks")
    .insert([{
        email:email,
        date:today,
        title:title,
        detail:detail
    }])
    if(err){
        return res.redirect("/task")
    }
    else{
        return res.redirect("/alltask")
    }
})
app.get("/alltask",isloggedin,async(req,res)=>{
    let {data:task} = await supabase
    .from("tasks")
    .select("*")
    .eq("email",req.user.email)
    res.render("view",{task})
})

app.get("/edit/:title",isloggedin,async(req,res)=>{
    let title = req.params.title
    let {data:task} = await supabase
    .from("tasks")
    .select("*")
    .eq("title",title)
    .single()
    let title2 = task.title
    res.render("edit",{title2})
})
app.post("/edit",isloggedin,async(req,res)=>{
    let {data:task} = await supabase
    .from("tasks")
    .update({title:req.body.new})
    .eq("title",req.body.prev)
    return res.redirect("/alltask")
})
app.get("/delete/:title",isloggedin,async(req,res)=>{
    let title = req.params.title
    let {data:task} = await supabase
    .from("tasks")
    .delete()
    .eq("title",title)
    return res.redirect("/alltask")
})

app.get("/done/:title",isloggedin,async(req,res)=>{
    let title = req.params.title
    let {data:task} = await supabase
    .from("tasks")
    .delete()
    .eq("title",title)
    return res.redirect("/alltask")
})

// Listening / Hosting 
app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})