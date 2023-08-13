// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    //I want to do a req to data.js for the array of pets and get a res in json format
    res.json(pets);

});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    //I want to do res.query to get the owner
    const owner = req.query.owner;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    // I want to do an if else to get the pet data if the data is found for the pet owned by the owner found in first part, return it in json with the res
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).json({message: "Pet not found for that owner."})
    }
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    //I want to do a get res.params to get the name
    const name = req.params.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    //do an if else statement where if the pet is found by name I can return the res.json, if not, I'll give an error message that the pet was no found
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).json({message: "Pet not found with that name."})
    }

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;