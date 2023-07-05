require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8003;
const students = require("./models/User.js");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const fs = require('fs');

app.use(cors());
app.use(express.json());




var mysql = require('mysql');
const { type } = require("os");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "datatables"
});

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM Persons", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

con.connect(function(err) {
  if (err) throw err;
console.log("connected")
});







app.post('/student', upload.single('file'), (req, res) => {
// try{
// const saveimage=new students({
//   data :fs.readFileSync("uploads/"+req.file.filename),
//   contentType:"image/png"
// })
// saveimage.save().then((res)=>console.log("asd"))
//     res.json({ message: 'File uploaded successfully!' });
//  }catch(err){console.log("asdsad")}
image=req.file.buffer.toString('base64');
types=req.file.mimetype;
console.log(req.file);

query="insert into Persons value(?,?)"
con.query(query,[image,types],(err,rows,fields)=>{
  if (err) throw err;
});
;
}
);

app.get('/get',(req,res)=>{
  con.query("SELECT * FROM Persons", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send({"data":result});
  });
})







app.listen(port, () => {
  console.log(`Server Started : Port Number ${port}`);
});