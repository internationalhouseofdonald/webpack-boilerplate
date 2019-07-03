// Dependencies
var express = require("express");
var app = express();

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');


/* NODE SERVER */

const PORT = 5000;


// Uncompress gzipped files
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});
app.get('*.css', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render('index');
});




app.use(express.static(__dirname));










// 404
app.get("*", function (req, res) {
  res.status(404).send(`
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous" />
    <h1>
      Nope.
    </h1>
    `);
});
app.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});