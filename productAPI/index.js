const express = require('express');
const app = express();
const port = 3000;

const shuffle = require('./shuffleService');
let allProducts = require('./defaultProducts.json');

// Redirect base route to /allProducts
app.get('/', (req, res) => {
    res.redirect(301, '/allProducts');
});

// Returns all products sorted by priority
app.get('/allProducts', (req, res) => {
    allProducts = allProducts.sort((a, b) => a.priority - b.priority);
    res.send(allProducts);
});

// Finds a product by priority and replaces its properties
// with the new fields recieved.
app.put('/replace/:priority', (req, res) => {
    const requiredFields = ['style', 'color', 'size'];
    const priority = Number(req.params.priority);
    const productIndex = allProducts.findIndex((p) => p.priority === priority);
    const newProduct = req.query;
    let err = false;
    let message = '';
    
    requiredFields.forEach((field) => {
        if(!newProduct[field]) {
            err = true; 
            message = `${field} may not be null`;
        }
    });

    if(err) {
        res.status(400).send(message); 
    } else {
        message = `Replace item with priority ${priority}`;
        allProducts[productIndex] = Object.assign({}, allProducts[productIndex], newProduct);
        res.send(message);
    }
});

// Moves a product's priority up or down and will
// adjust the other priorities as necessary
app.put('/update/:priority/:action', (req, res) => {
    const priority = Number(req.params.priority);
    const productIndex = allProducts.findIndex((p) => p.priority === priority);
    const action = req.params.action;
    let err = false;
    let message = '';

    if (action === 'up' || action === 'down') {
        if (action === 'up' && priority === 1) {
            err = true;
            message = `Priority may not exceed 1`;
        } else if (action === 'down' && priority === 10) {
            err = true;
            message = `Priority may not go lower than 10`;
        } else if (action === 'up') {
            message = `Priority increased`;
            const indexToSwap = allProducts.findIndex((p) => p.priority === priority - 1);
    
            allProducts[productIndex].priority--;
            allProducts[indexToSwap].priority++;
        } else if (action === 'down') {
            message = `Priority decreased`;
            const priorIndex = allProducts.findIndex((p) => p.priority === priority + 1);
    
            allProducts[productIndex].priority++;
            allProducts[priorIndex].priority--;
        }
    } else {
        err = true;
        message = `Only actions of 'up' or 'down' are accepted`;
    } 

    if(err) {
        res.status(400).send(message); 
    } else {
        res.send(message);
    }
    
});

// Randomize priorities of all items
app.put('/shuffle', (req, res) => {
    allProducts = shuffle(allProducts);
    res.send('Priorities shuffled');
});

app.listen(port, () => {
    console.log(`Product API listening at http://localhost:${port}`);
});
