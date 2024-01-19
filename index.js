import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

app.use(bodyParser.urlencoded({ extended: true })); //Using bodyParser to pre process the requests and generate body
//The order of middlewares is important

function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName= req.body["street"]+req.body["pet"]; //body is actually an array
  next();
} //Custom middleware to generate bandName

app.use(bandNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  //To send back the html file on get request
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is: </h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
