import express from 'express';
import favicon from 'serve-favicon'; // third-party middleware
import path from 'path'; // node library

import data from './data/data.json';

const app = express();
const PORT = 3000;

// file paths | server-side rendering?
app.use(express.static('public')); // this is for /public/

app.use('/images', express.static('images')); // this is for /images/

// third party middleware example
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// method to use JSON
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/newItem', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// using Express behind a proxy: note - security concern!
// app.set('trust proxy', 'loopback');

// routing - create
app.post('/newItem', (req, res) =>
  res.send(`a post request with /newItem route on port ${PORT}`)
);

// routing - read
app.get('/', (req, res) =>
  res.json(data) // fetch API and return data
);

// routing - read with parameter:id and multiple handler functions
app.get('/item/:id', (req, res, next) => {

  // middleware that pulls the data
  console.log(req.params.id);
  let user = Number(req.params.id);
  console.log(user);
  console.log(data[user]);

  // middleware that uses the req object
  console.log(`Request from: ${req.originalUrl}`);
  console.log(`Request type: ${req.method}`);

  res.send(data[user]);
  next();
}, () =>
  console.log('Did you get the right data?')
);

// response methods
app.get('/item', (req, res) =>
  // res.download('images/rocket.jpg') // download file
  res.redirect('https://linkedin.com') // redirect to a page
  // res.end() // ends the call
  // res.send(`a put request with /item route on port ${PORT}`)
);

// routing - update
app.put('/item', (req, res) =>
  res.send(`a put request with /item route on port ${PORT}`)
);

// routing - delete
app.delete('/item', (req, res) =>
  res.send(`a delete request with /item route on port ${PORT}`)
);

// routing - chaining with route()
app.route('/item')
  .get((req, res) => {
    res.send(`a get request...`)
  })
  .put((req, res) => {
    res.send(`a put request...`)
  })
  .delete((req, res) => {
    res.send(`a delete request...`)
  });

// Error handling function
app.use((err, req, res, next) => {
  console.error(err.stack); // console log error
  res.status(500).send(`Red alert!: ${err.stack}`);
});

// Connect to Server
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
  // console.log(data);
});