const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = {
  todo: ['Task 1', 'Task 2'],
  inProgress: ['Task 3'],
  done: ['Task 4'],
};

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/moveTask', (req, res) => {
  const { task, sourceList, destinationList } = req.body;
  
  // Remove the task from the source list
  tasks[sourceList] = tasks[sourceList].filter(t => t !== task);

  // Add the task to the destination list
  tasks[destinationList].push(task);

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});