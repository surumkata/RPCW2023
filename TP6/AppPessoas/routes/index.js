var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.list()
    .then(people => {
      res.render('index', { slist: people, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de people"})
    })
});

/* GET Pessoa Form. */
router.get('/people/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addPessoaForm', {d: data})
});

/* GET Pessoa page. */
router.get('/people/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  console.log(req.params)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(Pessoa => {
      console.log(Pessoa)
      res.render('pessoa', { p: Pessoa, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Pessoa"})
    })
});

/* GET Pessoa Update Form. */
router.get('/people/edit/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(p => {
      pessoa = Pessoa.formatPessoa(p)
      res.render('updatePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Pessoa"})
    })
});

/* GET Pessoa Delete Form. */
router.get('/people/delete/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(Pessoa => {
      res.render('deletePessoaForm', {p: Pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Pessoa"})
    })
});

/* GET Delete Confirmation */
router.get('/people/delete/:idPessoa/confirm', (req,res)=>{
  Pessoa.deletePessoa(req.params.idPessoa)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de Pessoa"})
    })
})

// POST Pessoa Form Data
router.post('/people/registo', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.addPessoa(req.body)
    .then(Pessoa => {
      res.render('addPessoaConfirm', {p: Pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de Pessoa"})
    })
})

// POST Pessoa Update Form
router.post('/people/edit/:idPessoa', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.updatePessoa(req.body)
    .then(Pessoa => {
      console.log(Pessoa)
      res.render('updatePessoaConfirm', {p: Pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do registo de Pessoa"})
    })
})

module.exports = router;