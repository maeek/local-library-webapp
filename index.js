const port = 3000;
const mainFolder = "/files";
const spdy = require("spdy");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mime = require("mime-type/with-db");
const fs = require("fs");

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json({ extended: true }));
// app.get("*", (req, res) => {
//   res.status(200).json({ message: "ok" });
// });

app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/files", express.static(path.join(__dirname + mainFolder)));

function returnFilesInFolder(folder = "/") {
  folder = folder == "/" ? "" : folder;
  let path_to = __dirname + mainFolder + "/" + folder;
  if (
    fs.existsSync() &&
    !fs.lstatSync(__dirname + mainFolder + "/" + folder).isDirectory()
  )
    path_to = path.dirname(__dirname + mainFolder + "/" + folder);
  else path_to = __dirname + mainFolder + "/" + folder;
  console.log(path_to);
  return new Promise((res, rej) => {
    if (
      folder.includes("../") ||
      folder.includes("/..") ||
      folder.includes("/../")
    )
      rej("NOT ALLOWED");
    fs.readdir(path_to, (err, files) => {
      if (err) rej(err);
      else
        res(
          files.map(el => {
            let mimeType = mime.contentType(path.extname(path_to + el));
            return {
              name: el,
              mime: mimeType ? mimeType : "directory",
              link: folder + el
            };
          })
        );
    });
  });
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api", function(req, res) {
  const { action, key, path } = req.body;
  console.log(key);
  switch (action) {
    case "get":
      returnFilesInFolder(path)
        .then(data => {
          res.json(data);
        })
        .catch(e => console.log(e));
      break;
  }
});

const options = {
  key: fs.readFileSync("/home/maek/Documents/key.pem"),
  cert: fs.readFileSync("/home/maek/Documents/cert.pem")
};

spdy.createServer(options, app).listen(port, error => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log("Listening on port: " + port + ".");
  }
});
