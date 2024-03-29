const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');



const app = express();


// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Homepage Route
app.get('/', (req, res) => res.render('index',{
    title: 'Welcome to the Member App',
    members
}));



// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));


// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!!!!</h1>')
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 5775;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));