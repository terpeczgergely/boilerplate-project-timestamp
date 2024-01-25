// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function isValidDate(input) {
  const dateObject = new Date(input);

  // Check if the dateObject is a valid date and the input is not "Invalid Date"
  return !isNaN(dateObject.getTime()) && dateObject.toString() !== 'Invalid Date';
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  // Check if dateParam is not provided or empty
  if (!dateParam) {
    const currentDate = new Date();
    res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
    return;
  }

  // If dateParam is a number, use it as a timestamp
  const timestamp = Number(dateParam);
  if (!isNaN(timestamp)) {
    res.json({ unix: timestamp, utc: new Date(timestamp).toUTCString() });
    return;
  }

  // If dateParam is provided as a string, attempt to create a Date object
  const paramDate = new Date(dateParam);

  // Check if the paramDate is a valid date
  if (isValidDate(paramDate)) {
    res.json({ unix: paramDate.getTime(), utc: paramDate.toUTCString() });
    return;
  }

  // If dateParam is not empty but not a valid date, return an error
  res.json({ error: 'Invalid Date' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
