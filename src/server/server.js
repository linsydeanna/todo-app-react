var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var todos = [
  { "id": 1, "text": "Hello, world!" },
  { "id": 2, "text": "Pick up groceries", "status": "complete" }
];

app.get('/', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });
});

app.get('/todos', function(req, res) {
  console.log('todos ', todos);
  res.json(JSON.stringify(todos));
});

app.get('/todos/:id', function(req, res) {
  var id = req.params.id;
  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  console.log('GET - todo ', todos[index]);
  res.json(JSON.stringify(todos[index]));
});

app.post('/todos', function(req, res) {
  var text = req.body.data.text;
  if (!text) {
    return res.status(400).json({ "message": "text is required" });
  }

  var id = todos.length + 1;
  var newTodo = { "id": id, "text": text, "status": "active" };
  todos.push(newTodo);

  console.log('POST - todos ', todos);

  res.json(todos);
});

app.delete('/todos/:id', function(req, res) { // DONE
  todos = todos.filter(todo => todo.id != req.params.id);
  console.log('DELETE - todos ', todos);
  res.json(JSON.stringify(todos));
});

app.put('/todos/:id', function(req, res) { // DONE
  todos = todos.map(todo => {
    if (todo.id == req.params.id) {
      todo.status = "complete"
    }
    return todo
  });
  console.log('PUT - todos ', todos);
  res.json(JSON.stringify(todos));
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
