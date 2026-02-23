import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";

//const index_html = readFileSync("./public/index.html");
const port = 8000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  var params = req.body
  //console.log(params);

  // res.send({
  //   'title': params.title,
  //   'content': params.content
  // });

  res.sendFile("/", {root:"./public"});
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});