const express = require("express");
const app = express();
const path = require('path')
const route = require('./src/routers/route');
const port = process.env.PORT || 3030;


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

route(app); // Pass the app instance to the route module

app.get('*', (req, res) => {
  let filePath = path.join(publicPath, req.path);

  // Append .html extension if the file doesn't exist without it
  if (!filePath.endsWith('.html')) {
    filePath += '.html';
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      // Handle file not found error
      res.status(404).send('File not found');
    }
  });
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
