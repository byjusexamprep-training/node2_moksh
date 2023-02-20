const app = require("express")();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const index = require('./routes/index')
require('./library/redis')
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false,
 }));
app.use(cookieParser())
app.use(index)
app.use("*",(req,res)=>{
    res.send("Error 404! Route does not exist!")
})

app.listen(port, () => { 
    console.log(`Server started on ${port}`)
});
