
const express = require('express')
const mysql = require('mysql')
  
const app = express()
const PORT = 2222


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'S260105y',
  database: 'linksdatabase'
})

connection.connect()

connection.query('show tables;',(err, rows, fields) => {
  if (err) throw err

  console.log(rows[0],'\n')
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/a/:short_link',(req, res)=>{
    sq = "SELECT (long_link) FROM links_dictionary WHERE short_link = ? ;" 
    console.log(req.params.short_link)
    connection.query(sq,[req.params.short_link],(err,result) =>{
        if(err){
            console.log(err)
        }
        longLink = result[0].long_link
        res.redirect(longLink)
        console.log(result)
    }) 
    
})

app.post('/add',(req,res) =>{
    console.log(req.body)
    console.log(req.body.long_link)
    longLink = req.body.long_link
    shortLink = req.body.short_link
    sq = "INSERT INTO links_dictionary (short_link,long_link) VALUES ( ?, ?)"
    connection.query(sq,[shortLink,longLink],(err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            res.send("Link added.")
        }
        result;
    })
})



app.get('/', (req, res)=>{ 
    res.status(200)
    res.send("Welcome to root URL of Server")
})
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
)

