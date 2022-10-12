const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const config = require('./config')[process.env.NODE_ENV || "production"]
const PORT = config.port;

const client = new Client({
  connectionString: config.connectionString,
});

client.connect();

app.get('/todo/:id', (req, res) => {
    let userId = req.params.id
    client.query("SELECT t.id, t.task FROM todo_list_items AS t LEFT JOIN users AS u ON t.id_users = u.id WHERE u.id = $1", [userId])
      .then(result => {
        res.status(200).send(result.rows)
    })
})

app.post('/todo/create/:id', (req, res) => {
    let userId = req.params.id
    let taskBody = req.body
    client.query('INSERT INTO todo_list_items (id_users, task) VALUES ($1, $2)', [userId, taskBody.task])
      .then(result => {
        res.status(201).send('New task has been created')
    })
})

app.patch('/todo/update/:id', (req, res) => {
    var taskId = req.params.id;
    var taskBody = req.body
  
    client.query('UPDATE todo_list_items SET task =$1 WHERE id = $2', [taskBody.task, taskId])
      .then(result => {
        res.status(200).send('ToDo updated successfully')
    })
})

app.delete('/todo/delete/:id', (req, res) => {
    var taskId = req.params.id;
    client.query('DELETE FROM todo_list_items WHERE id = $1', [taskId])
      .then(result => {
        res.status(200).send('ToDo completed and removed successfully')
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`)
  });

