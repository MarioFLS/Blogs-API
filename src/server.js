require('dotenv').config();
const app = require('./api');
const errorMiddleware = require('./middleware/error');
const validateToken = require('./middleware/validateToken');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', require('./routes/userRoute'));

app.use('/', validateToken, require('./routes/categoriesRoute'));

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
