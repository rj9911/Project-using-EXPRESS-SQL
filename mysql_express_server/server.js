const express = require('express')
const app = express()
//we have to import database into the server from db.js
const db = require('./db')


app.use((express.json()))
app.use(express.urlencoded({extended : true}))

app.set("view engine" , "hbs")

app.get('/' , (req , res) => {
    db.getAllPersons()
        .then((persons) => {
    res.render('persons',{persons})
})
    .catch((err) => {
    res.send(err)
})
})

//earlier we have done to add the false data
/*app.get('/' , (req , res) => {
    res.render('persons' , {
        persons : [
            {name : 'abc' , age :24 , city : 'Bhopal'}, 
            {name : 'def' , age :15 , city : 'Lucknow'} 
        ]
    })
})
*/
app.get('/add' , (req, res) => {
    res.render('persons_add')
})

app.post('/add' , (req ,res) => {
      db.addNewPerson(req.body.name , req.body.age , req.body.city)
          .then(() => {
          res.redirect('/')
      })
          .catch((err) => {
          res.send(err)
      })
})

app.listen(5555 , () => {
    console.log("Server started at http://localhost:5555")
})