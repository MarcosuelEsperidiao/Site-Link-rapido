const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/agendar', (req, res) => {
    const appointmentData = req.body;
    // Aqui você poderia salvar os dados do agendamento no banco de dados
    // Ou enviar um email de confirmação, etc.
    console.log('Novo agendamento:', appointmentData);
    res.json({ message: 'Agendamento realizado com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
