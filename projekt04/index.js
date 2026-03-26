import express from "express";

import databaseFunctions from "./database/functions.js";
//import session from "./login/session.js";
// import auth from "./login/auth.js";
// import user from "./login/user.js";

const port = process.env.PORT;
const app = express();

app.set('views', './public');
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// async function render(req, res) {
//   res.render("index");
// }

app.post("/createAccount", async (req, res) => {
  var params = req.body

  var createAccount = await databaseFunctions.addUser(params.login, params.password);

  if (createAccount.successful == true) {
        console.log(`Created account!
        Login: ${params.login}
        Password: ${params.password}`);
  } else { // Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: users.login
        console.log(`Account creation failed!
        Reason: ${createAccount.reason}
        Login: ${params.login}
        Password: ${params.password}`);
  };

  res.render("index");
});

app.post("/login", async (req, res) => {
  var params = req.body
  
  if ((await databaseFunctions.login(params.login, params.password)).successful) {
     session.createSession();
  };

  res.render("index");
});

app.get("/logout", async (req, res) => {
  var params = req.body
  
  databaseFunctions.logout(params.login, params.password);

  res.render("index");
});

app.post("/createPost", async (req, res) => {
  var params = req.body
  databaseFunctions.addPost(1, params.title, params.content);

  res.render("index");
});

app.all("/", (req, res)=>{
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});