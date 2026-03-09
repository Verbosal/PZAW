import express from "express";
import databaseFunctions from "./database/functions.js";
//import bcrypt from "bcrypt";
//import session from "express-session";

const port = 8000;
const app = express();

app.set('views', './public');
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function render(req, res) {
  res.render("index", {posts: await databaseFunctions.fetchPosts()});
}

app.post("/createAccount", async (req, res) => {
  var params = req.body

  var createAccount = databaseFunctions.addUser(params.login, params.password);

  if (createAccount.successful == true) {
        console.log(`Created account!
        Login: ${params.login}
        Password: ${params.password}`);
  } else {
        console.log(`Account creation failed!
        Reason: ${}
        Login: ${params.login}
        Password: ${params.password}`);
  };

  render(req, res);
});

app.post("/login", async (req, res) => {
  var params = req.body
  databaseFunctions.login(params.login, params.password);

  render(req, res);
});

app.post("/createPost", async (req, res) => {
  var params = req.body
  databaseFunctions.addPost(1, params.title, params.content);

  render(req, res);
});

app.all("/", render);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});