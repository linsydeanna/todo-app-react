var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var todos = [
  { "id": 1, "text": "Hello, world!", "status": "active" },
  { "id": 2, "text": "Pick up groceries", "status": "complete" }
];

app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/*', function(req, res, next) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });
  next();
});

app.get('/todos/:id', function(req, res) {
  var id = req.params.id;
  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  res.json(todos[index]);
});

app.post('/todos', function(req, res) {
  var text = req.body.data.text;
  if (!text) {
    return res.status(400).json({ "message": "text is required" });
  }

  var id = todos.length + 1;
  var newTodo = { "id": id, "text": text, "status": "active" };
  todos.push(newTodo);

  res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
  todos = todos.filter(todo => todo.id != req.params.id);
  res.json(todos);
});

app.put('/todos', function(req, res) {
  todos = req.body.data;
  res.json(todos);
});

app.patch('/todos/:id', function(req, res) {
  todos = todos.map(todo => {
    if (todo.id == req.params.id) {
      return req.body.data
    }
    return todo
  });
  res.json(todos);
});

// Node server.
var port = 3000;
var server = app.listen(port, function() {
  console.log('SERVER STARTED LISTENING ON PORT ' + port);
});

// Dev server.
var devServer = require('../../tools/development-server');
var devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => { });
