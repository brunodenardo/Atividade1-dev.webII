"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const bodyparser = require('body-parser');
const Usuario_1 = __importDefault(require("./Usuario"));
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded());
app.use(express.urlencoded());
//Configurando ejs
app.set('views', path.join('./src', 'views'));
app.set('view engine', 'ejs');
//Rota Principal
app.get('/', function (req, res) {
    res.render('index');
});
//Atividade 1
app.get('/idade', function (req, res) {
    res.render('Idade');
});
app.post('/idadeResultado', function (req, res) {
    if (req.body.Idade < 15) {
        res.send('<h1>Criança</h1> <br> <a href="/idade"><button>Voltar</button></a>');
    }
    else if (req.body.Idade >= 15 && req.body.Idade < 30) {
        res.send('<h1>Jovem</h1> <br> <a href="/idade"><button>Voltar</button></a>');
    }
    else if (req.body.Idade >= 30 && req.body.Idade < 60) {
        res.send('<h1>Adulto</h1> <br> <a href="/idade"><button>Voltar</button></a>');
    }
    else {
        res.send('<h1>Idoso</h1> <br> <a href="/idade"><button>Voltar</button></a>');
    }
});
//Atividade 2
const avaliador = function (media) {
    if (media > 9) {
        return "A";
    }
    else if (8 < media && media <= 9) {
        return "B";
    }
    else if (7 < media && media <= 8) {
        return "C";
    }
    else if (6 < media && media <= 7) {
        return "D";
    }
    else if (5 < media && media <= 6) {
        return "E";
    }
    else if (media <= 5) {
        return "F";
    }
};
app.get('/mediaNota', function (req, res) {
    res.render('nota');
});
app.post('/mediaNotaResultado', function (req, res) {
    let media = ((req.body.atividade * 2) + (req.body.prova * 5) + (req.body.teorico * 3)) / 10;
    let avaliacao = avaliador(media);
    res.send(`<h1>Sua média foi ${media} e sua classificação é ${avaliacao}</h1> 
    <br> <br> <a href="/mediaNota"><button>Voltar</button></a>`);
});
//Atividade 3
let user = new Usuario_1.default("Bruno", "Denardo", 25, "Brasil");
app.get('/usuario', function (req, res) {
    res.render('usuario', { user: user });
});
app.get('/alteraUsuario', function (req, res) {
    res.render('mudaUsuario');
});
app.post('/trocaDados', function (req, res) {
    user.nome = req.body.nome;
    user.idade = req.body.idade;
    user.pais = req.body.pais;
    user.sobrenome = req.body.sobrenome;
    res.redirect('/usuario');
});
app.listen(8800, () => {
    console.log('Rodando em http://localhost:8800/');
});
