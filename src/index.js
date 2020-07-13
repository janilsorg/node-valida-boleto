const express = require('express');
const routes = require('./routes');

app = express();

// Caso PORT seja definido no .env considerar, senão, usar 5000
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Rotas 
app.use(routes);


app.listen(PORT,() => { 
    console.log(`Server is running on ${PORT}`);
});