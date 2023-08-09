const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port = 8000;

// Define mongoose schema 
const contactSchema = new mongoose.Schema({
  name: String,
  age: String,
  phone: String,
  email: String,
  gender: String,
  address: String
});

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files.
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //Set the template engine as pug.
app.set('views', path.join(__dirname, 'views')); // Set the views directory. konsi directory se apni template files ko read karna chahty hai.

app.get('/ind', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(()=> {
        res.send("Submitted. These items has been saved to the database");
    }).catch(()=> {
        res.status(400).send("Something wrong");
    })
    // res.status(200).render('contact.pug');
})

app.listen(port,() => {
    console.log(`The application started successfully on ${port}`);
})