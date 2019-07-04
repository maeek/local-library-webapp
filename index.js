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

const options = {
  key: fs.readFileSync("/home/maek/Documents/key.pem"),
  cert: fs.readFileSync("/home/maek/Documents/cert.pem")
};

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json({ extended: true }));

app.use("/", express.static(path.join(__dirname, "dist")));
app.use(mainFolder, express.static(path.join(__dirname + mainFolder)));

function returnFilesInFolder(folder = "/") {
  console.log("GOT:", folder);
  folder = folder == "/" ? "" : folder;
  let path_to =
    __dirname +
    mainFolder +
    (folder && folder[0] != "/" ? "/" + folder : folder);
  if (fs.existsSync(path_to) && fs.lstatSync(path_to).isFile()) {
    path_to = path.dirname(path_to);
  }
  // path_to = path_to[path_to.length - 1] != "/" ? path_to + "/" : path_to;
  console.log("FINAL", path_to);
  return new Promise((res, rej) => {
    if (
      folder.includes("../") ||
      folder.includes("/..") ||
      folder.includes("/../")
    )
      rej([]);
    fs.readdir(path_to, { withFileTypes: true }, (err, files) => {
      if (err) {
        rej(err);
      } else {
        files = files.filter(el => el[0] != ".");
        let sortedFolders = files.filter(
          el =>
            fs.existsSync(path_to + "/" + el) &&
            fs.statSync(path_to + "/" + el).isDirectory()
        );
        let sortedFiles = files.filter(
          el =>
            fs.existsSync(path_to + "/" + el) &&
            fs.statSync(path_to + "/" + el).isFile()
        );
        let joined = [...sortedFolders, ...sortedFiles];
        res(
          joined.map(el => {
            let mimeType =
              fs.existsSync(path_to + "/" + el) &&
              mime.contentType(path.extname(path_to + "/" + el));
            return {
              name: el,
              mime: mimeType ? mimeType : "directory",
              link:
                path_to.substring(__dirname.length + mainFolder.length + 1) +
                "/" +
                el
            };
          })
        );
      }
    });
  });
}

function returnFoldersMain() {
  let path_to = __dirname + mainFolder + "/";
  return new Promise((res, rej) => {
    fs.readdir(path_to, (err, files) => {
      if (err) rej(err);
      else
        res(
          files
            .filter(dirent => fs.statSync(path_to + dirent).isDirectory())
            .map(el => {
              return {
                name: el,
                mime: "directory",
                link: el
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
  console.log("POST:", key, path);
  switch (action) {
    case "get":
      returnFilesInFolder(path)
        .then(data => {
          res.json(data);
        })
        .catch(e => res.json({ error: e }));
      break;
    case "mainDirectory":
      returnFoldersMain()
        .then(data => {
          res.json(data);
        })
        .catch(e => res.json({ error: e }));
      break;
  }
});

app.get("*", (req, res) => {
  res.status(200).json({ message: "ok" });
});

spdy.createServer(options, app).listen(port, error => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log("Listening on port: " + port + ".");
  }
});
