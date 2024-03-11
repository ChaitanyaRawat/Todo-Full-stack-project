const http = require("http")
const express = require('express')
const app = express()
const server = http.createServer(app)
const { connectMongoose, userInfo,todoItem } = require("./database.js")
const passport = require("passport")
const { initializingPassport, isAuthenticated } = require('./passportConfig.js')
const expressSession = require("express-session")
const { Server } = require("socket.io")
const io = new Server(server)


io.on("connection" , (socket) => {
    console.log("A new user connected", socket.id)
    socket.on("New-Todo-Item",async (message) => {
        await todoItem.create(message)
    })
    socket.on("send my saved todoItems",async(userNameOfClient) => {
        let userTodos = await todoItem.find({username: userNameOfClient},{_id:0,username:1,title:1,description:1,isDone:1})
        // console.log(userTodos)
        io.emit("sending your saved todoitems",userTodos)
    })
    socket.on("delete this todo",async(theTodo) => {
        await todoItem.deleteOne({title:theTodo.title,description:theTodo.description})
        // console.log(theTodo)
    })
    socket.on("check this todo",async(theTodo) => {
        await todoItem.updateOne({title:theTodo.title,description:theTodo.description},{isDone:theTodo.isDone})
        // console.log(theTodo)
    })
})


connectMongoose()
initializingPassport(passport)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static",express.static("static"))

app.set('view engine', 'ejs');
app.use(expressSession({
    secret: "this has to be a secret code",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())







app.get("/", (req, res) => {
    res.render("home")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})



app.post("/register", async (req, res) => {
    const user = await userInfo.findOne({ username: req.body.username })
    if (user) res.status(400).send("User already exist")
    else{
    const newUser = await userInfo.create(req.body)
    res.redirect("/login")
    }
})

app.post("/login", passport.authenticate("local", { failureRedirect: "/register" , successRedirect : "/profile"},), (req, res) => {
    res.render("login")
})

app.get("/profile", isAuthenticated,async (req, res) => {
    // let userTodos = await (await todoItem.find({username: req.user.username},{_id:0,username:1,title:1,description:1}))
    // console.log(userTodos)
    res.render("profile",{username : req.user.username , name:req.user.name})
})

app.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) { return next(err); }
        res.redirect("/login")
    });

})

server.listen(3000, () => {
    console.log("Todo website listening on 3000")
})