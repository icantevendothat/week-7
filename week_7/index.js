let express = require('express');
let app = express();

const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://aps659:<password>@week-7.8h1mxap.mongodb.net/");

db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();

app.use(express.json());

let cryCalendar = [];
// app.get('/', (req,res) => {
//     res.send('this is the main page');
// })
app.post('/minCried', (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        cries: req.body.number
    }

    db.push("cryCalendarData", obj);
    //cryCalendar.push(obj);
    //console.log(cryCalendar);
    res.json({task:"success"});
})

app.use('/', express.static('public'));

app.listen(3000, () => {
    console.log('listening at 3000');
})

app.get('/getMinutes', (req,res) =>{
    db.get("cryCalendarData").then(cryData => {
        let obj = {data: cryData};
        res.json(obj);
    })
   
})