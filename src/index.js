const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res)=>{
    res.render("admin") 
})

app.get("/admin", (req, res)=>{
    res.render("admin") 
})

// Sign Up Form Records Name and Password
// app.post("/signup", async(req, res)=> {

// const data= {
//     name: req.body.name,
//     password: req.body.password
// }

// await collection.insertMany([data])
// res.render("home")
// })

app.post("/admin", async(req, res)=> {

   try {
    const check = await collection.findOne({name: req.body.name})

    if (check.password === req.body.password){
        res.render("dashboard")
    }
    else {
        res.send("Incorrect User or Password")
    }
   }
   catch {}
   res.send("Username or Password incorrect")
    })
    


app.listen(3000, ()=> {
    console.log("Port 3000 Connected")
})