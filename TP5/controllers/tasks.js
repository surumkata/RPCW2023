var axios = require('axios')

module.exports.doneTasks = () => {
    return axios.get('http://localhost:3000/done_tasks')
        .then(resposta => {
            return resposta.data
        })
        .catch(err => {
            return err
        })
}

module.exports.todoTasks = () => {
    return axios.get('http://localhost:3000/todo_tasks')
        .then(resposta => {
            return resposta.data
        })
        .catch(err => {
            return err
        })
}

module.exports.getTask = (id,from) => {
    return axios.get('http://localhost:3000/'+from+'/'+id)
        .then(resposta => {
            return resposta.data
        })
        .catch(err => {
            return err
        })
}

module.exports.addTask = (t,to) => {
    return axios.post('http://localhost:3000/'+to+'/',t)
    .then(resposta => {
        return resposta.data
    })
    .catch(err => {
        return err
    })
}

module.exports.editTask = (t,from) => {
    return axios.put('http://localhost:3000/'+from+'/' + t.id,t)
    .then(resposta => {
        return resposta.data
    })
    .catch(err => {
        return err
    })
}

module.exports.deleteTask = (id,from) => {
    return axios.delete('http://localhost:3000/'+from+'/' + id)
    .then(resposta => {
        return resposta.data
    })
    .catch(err => {
        return err
    })
}
