exports.mainPage = function(todo_tasks,done_tasks) {
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>ToDo's</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-blue">
            <h1>Add Task</h1>
            <form action="/add" method="POST">
                <label>Tarefa</label>
                <input class="w3-input w3-round" type="text" name="what" required>
                <label>Autor</label>
                <input class="w3-input w3-round" type="text" name="who" required>
                <label>Data Limit</label>
                <input class="w3-input w3-round" type="date" name="dateDued" required>

                <button class="w3-btn w3-purple w3-mb-2" type="submit">+</button>
            </form>
        </div>
            
        <div class="w3-cell-row w3-red">
            <div class="w3-container w3-cell w3-gray">
                <h1>TODO Tasks</h1>
                <table class="w3-table-all">
                    <tr>
                        <th>Tarefa</th><th>Data Limit</th><th>Autor</th><th></th><th></th><th></th>
                    </tr>
                    `
                    for(let i=0; i < todo_tasks.length; i++){
                        pagHTML += `
                              <tr>
                                <td>${todo_tasks[i].what}</td><td>${todo_tasks[i].dateDued}</td><td>${todo_tasks[i].who}</td>
                                <td>
                                <form action="/done_task" method="POST">
                                    <input type="hidden" name="id" value="${todo_tasks[i].id}">
                                    <button class="w3-btn w3-purple w3-mb-2" type="submit">-></button>
                                </form>
                                </td>
                                <td>
                                <form action="/delete_todotask" method="POST">
                                    <input type="hidden" name="id" value="${todo_tasks[i].id}">
                                    <button class="w3-btn w3-purple w3-mb-2" type="submit">-</button>
                                </form>
                                </td>
                                <td>
                                    <form class="w3-cell" action="/edit_form" method="POST">
                                        <input type="hidden" name="id" value="${todo_tasks[i].id}">
                                        <input type="hidden" name="from" value="todo_tasks">
                                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Edit</button>
                                    </form>
                                </td>
                              </tr>
                        `
                      }
                    pagHTML += `
                </table>
            </div>
            <div class="w3-container w3-cell w3-gray">
                <h1>Done Tasks</h1>
                <table class="w3-table-all">
                    <tr>
                        <th>Tarefa</th><th>Autor</th><th></th><th></th><th></th>
                    </tr>
                    `
                    for(let i=0; i < done_tasks.length; i++){
                        pagHTML += `
                              <tr>
                                <td>${done_tasks[i].what}</td><td>${done_tasks[i].who}</td><td>
                                    <form class="w3-cell" action="/undone_task" method="POST">
                                        <input type="hidden" name="id" value="${done_tasks[i].id}">
                                        <button class="w3-btn w3-purple w3-mb-2" type="submit"><-</button>
                                    </form>
                                </td>
                                <td>
                                    <form class="w3-cell" action="/delete_donetask" method="POST">
                                        <input type="hidden" name="id" value="${done_tasks[i].id}">
                                        <button class="w3-btn w3-purple w3-mb-2" type="submit">-</button>
                                    </form>
                                </td>
                                <td>
                                    <form class="w3-cell" action="/edit_form" method="POST">
                                        <input type="hidden" name="id" value="${done_tasks[i].id}">
                                        <input type="hidden" name="from" value="done_tasks">
                                        <button class="w3-btn w3-purple w3-mb-2" type="submit">Edit</button>
                                    </form>
                                </td>
                              </tr>
                        `
                      }
                    pagHTML += `
                </table>
            </div>
        </div>
        <div class="w3-container w3-gray">
            <h3></h3>
        </div>
        <footer class="w3-container w3-blue">
          <h5>Generated in RPCW2023-TPC4</h5>
        </footer>
    </body>
</html>        
    `
  return pagHTML
}

exports.editPage = function(from,task){
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>ToDo's</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-blue">
            <h1>Edit Task</h1>
            <form action="/edit_task" method="POST">
                <label>Tarefa</label>
                <input class="w3-input w3-round" type="text" placeholder="${task.what}" name="what" value="${task.what}" required>
                <label>Autor</label>
                <input class="w3-input w3-round" type="text" placeholder="${task.who}" name="who" value="${task.who}" required>
                <label>Data Limit</label>
                <input class="w3-input w3-round" type="date" placeholder="${task.dateDued}" name="dateDued" value="${task.dateDued}" required>
                <input type="hidden" name="id" value="${task.id}">
                <input type="hidden" name="from" value="${from}">

                <button class="w3-btn w3-purple w3-mb-2" type="submit">Edit</button>
            </form>
        </div>

    </body>

    `
    return pagHTML
}