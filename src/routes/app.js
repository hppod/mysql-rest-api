const express = require('express');
const app = express();
const cors = require('cors');

const morgan = require('morgan');
const bodyParser = require('body-parser');

//SETTING
app.set('port', process.env.PORT || 3000);

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

//ROUTES
require('./userRoutes')(app);

app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});