const knex = require('./library/db')
const app = require("express")();
const bodyParser = require("body-parser");
const index = require('./routes/index')
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false,
 }));
app.use(index)
app.use("*",(req,res)=>{
    res.send("Error 404! Route does not exist!")
})

app.listen(port, () => { 
    console.log(`Server started on ${port}`)
});
