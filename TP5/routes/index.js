var express = require('express');
const { response } = require('../app');
var Tasks = require('../controllers/tasks')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Tasks.todoTasks()
    .then(todo_tasks => {
      Tasks.doneTasks()
        .then(done_tasks => {
          res.render('index', { tts : todo_tasks, dts : done_tasks, d : data});
        })
        .catch(err => {
          res.render('error',{error:err})
        })
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});

/* Get done task. */
router.get('/done_task/:idTask', function(req, res, next) {
  Tasks.getTask(req.params.idTask,"todo_tasks")
    .then(task => {
      Tasks.deleteTask(task.id,"todo_tasks")
        .then(response => {
          Tasks.addTask(task,"done_tasks")
          .then(response => {
            res.redirect('/')
          })
          .catch(err => {
            res.render('error',{error:err})
          })
        })
        .catch(err => {
          res.render('error',{error:err})
        })
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});

/* Get undone task. */
router.get('/undone_task/:idTask', function(req, res, next) {
  Tasks.getTask(req.params.idTask,"done_tasks")
    .then(task => {
      Tasks.deleteTask(task.id,"done_tasks")
        .then(response => {
          Tasks.addTask(task,"todo_tasks")
          .then(response => {
            res.redirect('/')
          })
          .catch(err => {
            res.render('error',{error:err})
          })
        })
        .catch(err => {
          res.render('error',{error:err})
        })
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});

/* Get delete done task. */
router.get('/delete_donetask/:idTask', function(req, res, next) {
  Tasks.deleteTask(req.params.idTask,"done_tasks")
    .then(response => {
      res.redirect('/')
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});

/* Get delete todo task. */
router.get('/delete_todotask/:idTask', function(req, res, next) {
  Tasks.deleteTask(req.params.idTask,"todo_tasks")
    .then(response => {
      res.redirect('/')
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});


/* Post add task. */
router.post('/add', function(req, res, next) {
  Tasks.addTask(req.body,"todo_tasks")
    .then(response => {
      res.redirect('/')
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});


/* Post edit form page. */
router.post('/edit_form', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Tasks.getTask(req.body.id,req.body.from)
    .then(task => {
      console.log(task)
      res.render('editPage', { t : task, from : req.body.from, d : data});
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});

/* Post edit task. */
router.post('/edit_task', function(req, res, next) {
  var task = {
    "id" : req.body.id,
    "what" : req.body.what,
    "who" : req.body.who,
    "dateDued" : req.body.dateDued
  }
  var from = req.body.from
  Tasks.editTask(task,from)
    .then(response => {
      res.redirect('/')
    })
    .catch(err => {
      res.render('error',{error:err})
    })
});



module.exports = router;
