// form_server_example.js
// RPCW2023: 2023-03-06
// by jcr

var http = require('http')
var url = require('url')
var mypages = require('./mypages.js')
var static = require('./static.js')
const { parse } = require('querystring');
var axios = require('axios');


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

// fuction that add a task

function addTask(res,task){
    console.log(task)
    axios.post(`http://localhost:3000/todo_tasks`,{'what':task.what,'who':task.who,'dateDued':task.dateDued})
    .then(function (response) {
        console.log('Post successfull');
        res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'});
        res.end()
    })
    .catch(function (error) {
        console.log(`Erro no Post: ${error}`);
        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
        res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'})
        res.end()
    });
}

//function that make a task done

function doneTask(res,id){
    console.log("ID: ",id)
    axios.get(`http://localhost:3000/todo_tasks?id=${id}`)
    .then(function (response) {
        sleep(200)
        task = response.data[0]
        console.log(task)
        console.log(task.who)
        console.log(task.what)
        console.log(task.dateDued)
        console.log('Get successfull');
        axios.delete(`http://localhost:3000/todo_tasks/${id}`)
        .then(function(response){
            sleep(200)
            console.log('Delete successfull');
            axios.post(`http://localhost:3000/done_tasks`,{'who':task.who,'what':task.what,'dateDued':task.dateDued})
            .then(function(response){
                sleep(200)
                console.log('Post successfull');
                res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'});
                res.end();
            })
            .catch(function (error) {
                console.log(`Erro no Post: ${error}`);
                res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'});
                res.end();
            })
            
        })
        .catch(function (error) {
            console.log(`Erro no Delete: ${error}`);
            res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'});
            res.end();
        })
    })
    .catch(function (error) {
        console.log(`Erro no Get: ${error}`);
        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
        res.write('<p>Não foi possível adicionar a tarefa</p>')
        res.end()
    });
}

//function that undone a task

function undoneTask(res,id){
    console.log("ID: ",id)
    axios.get(`http://localhost:3000/done_tasks?id=${id}`)
    .then(function (response) {
        sleep(200)
        task = response.data[0]
        console.log(task)
        console.log(task.who)
        console.log(task.what)
        console.log(task.dateDued)
        console.log('Get successfull');
        axios.delete(`http://localhost:3000/done_tasks/${id}`)
        .then(function(response){
            sleep(200)
            console.log('Delete successfull');
            axios.post(`http://localhost:3000/todo_tasks`,{'who':task.who,'what':task.what,'dateDued':task.dateDued})
            .then(function(response){
                sleep(200)
                console.log('Post successfull');
                res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'});
                res.end();
            })
            .catch(function (error) {
                console.log(`Erro no Post: ${error}`);
                res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'});
                res.end();
            })
            
        })
        .catch(function (error) {
            console.log(`Erro no Delete: ${error}`);
            res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'});
            res.end();
        })
    })
    .catch(function (error) {
        console.log(`Erro no Get: ${error}`);
        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
        res.write('<p>Não foi possível adicionar a tarefa</p>')
        res.end()
    });
}


//function that delete a task
function deleteTask(res,id,from){
    console.log("ID: ",id)
    axios.delete(`http://localhost:3000/${from}/${id}`)
        .then(function(response){
            console.log('Delete successfull');
            res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'});
            res.end();
            
        })
        .catch(function (error) {
            console.log(`Erro no Delete: ${error}`);
            res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'});
            res.end();
    })
}

//function that delete a task
function editTaskForm(res,id,from){
    console.log("ID: ",id)
    axios.get(`http://localhost:3000/${from}?id=${id}`)
        .then(function(response){
            task = response.data[0]
            console.log('Get successfull');
            res.writeHead(201,{'Content-Type': 'text/html;charset=utf-8','Location':'/'});
            res.end(mypages.editPage(from,task));
            
        })
        .catch(function (error) {
            console.log(`Erro no Delete: ${error}`);
            res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'});
            res.end();
    })
}

function editTask(res,id,from,who,what,dateDued){
    axios.delete(`http://localhost:3000/${from}/${id}`)
        .then(function(response){
            console.log('Delete successfull');
            
            axios.post(`http://localhost:3000/todo_tasks`,{'what':what,'who':who,'dateDued':dateDued})
            .then(function (response) {
                console.log('Post successfull');
                res.writeHead(302,{'Content-Type': 'text/html;charset=utf-8','Location':'/'});
                res.end()
            })
            .catch(function (error) {
                console.log(`Erro no Post: ${error}`);
                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                res.end()
            });
            
        })
        .catch(function (error) {
            console.log(`Erro no Delete: ${error}`);
            res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'});
            res.end();
    })
}

// Aux function to process body

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var formServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    var dicURL = url.parse(req.url,true);

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": {
                if (dicURL.pathname == "/"){
                    axios.get(`http://localhost:3000/done_tasks`)
                    .then( function (response) {
                      var done_tasks = response.data
                      axios.get(`http://localhost:3000/todo_tasks`)
                      .then(function (response) {
                            var todo_tasks = response.data
                            res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                            res.end(mypages.mainPage(todo_tasks,done_tasks))
                      })
                      .catch( erro => {
                        console.log("Erro axios:" + erro)
                        res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                        res.end('Erro axios:' + erro)
                      })
                      
                    })
                    .catch( erro => {
                      console.log("Erro axios:" + erro)
                      res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'})
                      res.end('Erro axios:' + erro)
                    })
                }
                break
            }
            case "POST": {
                    // POST /persons -------------------------------------------------------------------
                    collectRequestBodyData(req, result => {
                        if(result){
                            if (dicURL.pathname == "/add"){
                                addTask(res,result)
                            }
                            else if(dicURL.pathname == "/done_task"){
                                doneTask(res,result.id)
                            }
                            else if(dicURL.pathname == "/delete_donetask"){
                                deleteTask(res,result.id,"done_tasks")
                            }
                            else if(dicURL.pathname == "/delete_todotask"){
                                deleteTask(res,result.id,"todo_tasks")
                            }
                            else if(dicURL.pathname == "/undone_task"){
                                undoneTask(res,result.id)
                            }
                            else if(dicURL.pathname == "/edit_form"){
                                editTaskForm(res,result.id,result.from)
                            }
                            else if(dicURL.pathname == "/edit_task"){
                                editTask(res,result.id,result.from,result.who,result.what,result.dateDued)
                            }
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                    break
                    
            }
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

formServer.listen(7777, ()=>{
    console.log("Server listening on 7777...")
})