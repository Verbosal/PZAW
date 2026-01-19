import express from "express";
import morgan from "morgan";
import { readFileSync } from "node:fs";

//const index_html = readFileSync("./public/index.html");
const port = 8000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("dev"));

function log_request(req, res, next) {
    console.log(`Request taken! Method: ${req.method} Path: ${req.path}`);
    next();
}

app.all("/", function(req, res) {
    RedirectHandler.render("./index.html")
})

// app.get("/",function(req, res) {
//     res.end(index_html)
// })

app.use(log_request);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});