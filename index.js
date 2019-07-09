const spdy = require("spdy"),
  express = require("express"),
  compression = require("compression"),
  bodyParser = require("body-parser"),
  path = require("path"),
  cors = require("cors"),
  mime = require("mime-type/with-db"),
  fs = require("fs"),
  app = express();

const settings = {
  port: process.env.PORT || 3000,
  mainFolder: process.env.FULL_PATH || path.join(__dirname, "/files"),
  certs: {
    key: process.env.KEY_PAM || fs.readFileSync("./key.pem"),
    cert: process.env.CERT_PEM || fs.readFileSync("./cert.pem")
  }
};

if (!settings.certs.key && !settings.certs.cert) {
  console.log("Please provide certificate!");
  return process.exit(1);
}

app.use(cors());
app.use(compression());
app.use(bodyParser.json({ extended: true }));

app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/files", express.static(path.join(settings.mainFolder)));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.removeHeader("X-Powered-By");
  next();
});

function checkIfFolder(pth) {
  return fs.existsSync(pth) && fs.statSync(pth).isDirectory();
}

function getMimeType(pth) {
  return mime.contentType(path.extname(pth)) || "directory";
}

function createValidPath(requested, relative = false) {
  requested = requested.trim();
  const requestedLength = requested.length;

  if (requestedLength < 1) return settings.mainFolder;
  if (requested[0] != "/") requested = `/${requested}`;

  if (
    requested[requestedLength - 1] != "/" &&
    checkIfFolder(path.join(settings.mainFolder, requested)) &&
    !relative
  )
    requested += "/";

  if (!checkIfFolder(path.join(settings.mainFolder, requested))) {
    return !relative
      ? path.dirname(path.join(settings.mainFolder, requested) + "/")
      : requested;
  }

  if (requested.includes("../") || requested.includes("/.."))
    return settings.mainFolder;

  return !relative ? path.join(settings.mainFolder, requested) : requested;
}

function foldersFirst(pathToFile, files, fileType) {
  const sortedFolders =
      fileType == "all" || fileType == "folders"
        ? files.filter(el => fs.statSync(`${pathToFile}/${el}`).isDirectory())
        : [],
    sortedFiles =
      fileType == "all" || fileType == "files"
        ? files.filter(el => fs.statSync(`${pathToFile}/${el}`).isFile())
        : [];
  files = [...sortedFolders, ...sortedFiles];
  return files;
}

function readFiles(folder = "/", fileType = "all") {
  "use-strict";
  const pathToFile = folder ? createValidPath(folder) : settings.mainFolder;
  if (!fs.existsSync(pathToFile)) return Promise.reject([]);

  return new Promise((res, rej) => {
    fs.readdir(pathToFile, { withFileTypes: true }, (err, files) => {
      if (err) rej(err);
      else {
        files = files.filter(el => el[0] != "."); // Remove hidden files
        files = foldersFirst(pathToFile, files, fileType);
        res(
          files.map(el => {
            return {
              name: el,
              mime: getMimeType(`${pathToFile}/${el}`),
              link: createValidPath(
                `${pathToFile.substring(settings.mainFolder.length)}${el}`,
                true
              )
            };
          })
        );
      }
    });
  });
}

function returnFoldersMain(folder = null) {
  return readFiles(folder, "folders");
}

app.post("/api", function(req, res) {
  const { action, path } = req.body; //  { key }
  switch (action) {
    case "get":
      readFiles(path, "all")
        .then(data => {
          res.json(data);
        })
        .catch(e => res.json({ status: 500, error: e }));
      break;
    case "mainDirectory":
      returnFoldersMain()
        .then(data => {
          res.json(data);
        })
        .catch(e => res.json({ status: 500, error: e }));
      break;
    default:
      res.json({
        status: 404,
        message: "Action not found!"
      });
      break;
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ status: 404, message: "Page not found" });
});

spdy.createServer(settings.certs, app).listen(settings.port, error => {
  if (error) {
    console.error("Failed to start the server\n", error);
    return process.exit(1);
  } else {
    console.log("Listening on port: " + settings.port + ".");
  }
});
