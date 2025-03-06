const express = require("express");
const cors = require("cors");
const port = 3002;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, ()=> console.log ("Rodando na porta " + port));

const connection = require('./db/connection.js');

// hello world

app.get('/', (req, res) => {
    console.log("Hello, world");
});

// login dos usuarios 

app.post('/login', (req, res) => { 
    const { nome, senha } = req.body;
 
    const query = 'SELECT * FROM usuarios WHERE nome = ? AND senha = ?';
 
    connection.query(query, [nome, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }
        if (results.length > 0) {
            console.log("login reali blaaa")
            res.json({ success: true, message: 'Login realizado' });
        } else {
            res.json({ success: false, message: 'Nome ou senha incorretos' });
        }
    });
});

// cadastrar carros 

app.post('/carros', (req, res) => {
    const { proprietario, placa , horario, horario_saida } = req.body;
    const query = 'INSERT INTO carros (proprietario, placa , horario, horario_saida) VALUES(?, ?, ?, ?)';
    
    connection.query(query, [proprietario, placa , horario, horario_saida], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar carro' });
        }
        res.json({ success: true, message: "Carro cadastrado com sucesso"});
    });
});

// editar carros

app.get('/carros', (req, res) => {
    const query = 'SELECT * FROM carros';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar livros' });
        }
        res.json({ success: true, data: results });
    });
});


app.put('/carros/:id', (req, res) =>{
    const {id} = req.params
    const {proprietario, placa, horario, horario_saida} = req.body
    const query = 'UPDATE carros SET proprietario = ?, placa = ?, horario = ?, horario_saida = ? WHERE id = ?'
    connection.query(query, [proprietario, placa, horario, horario_saida, id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao atualizar livro'})
        }
        res.json({success: true, message: "Carro atualizado"})
    })
})

// deletar carros

app.delete('/carros/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM carros WHERE id = ?'
    connection.query(query, [id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar carro'})
        }
        res.json({success: true, message: "Carro deletado"})
    })
})

