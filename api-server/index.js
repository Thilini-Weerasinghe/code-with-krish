const express = require('express');
const { getMinNumber, getMaxNumber, getAverageOfGivenNumbers, getSortedArray, getWordCountInArray } = require('./util.js');

const app = new express();
const port = 3000;
const greeting = { message: "hello node" }

app.get('/', (req, res) => {
    res.json(greeting);
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});


app.get('/number/min', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const result = getMinNumber(num1, num2);
    res.status(result.status).json(result.data);

    // if (isNaN(num1) || isNaN(num2)) {
    //console.error("both number must be numbers");
    //     res.status(400).json(`error : both number must be numbers`);
    // }
    // res.json({ min: num1 > num2 ? num2 : num1 });


    //res.json({ min: Math.min(num1, num2) });

});

app.get('/number/max', (req, res) => {

    const { numbers } = req.query;
    
    if (!numbers) {
        return res.status(400).json({
            error: "please provide comma seperated numbers for find the max number"
        });
    }

    const result = getMaxNumber(numbers);
    return res.status(result.status).json(result.data);

});

app.get('/number/avg', (req, res) => {

    const { numbers } = req.query;

    if (!numbers) {
        return res.status(400).json({
            error: "please provide comma seperated numbers for proceed the avg calculation"
        });
    }

    const result = getAverageOfGivenNumbers(numbers);
    return res.status(result.status).json(result.data);

});

app.get('/number/sort', (req, res) => {

    const { numbers } = req.query;
    const type = req.query.type;

    if (!numbers) {
        return res.status(400).json({
            error: "please provide comma seperated numbers for proceed the sorting function"
        });
    }

    const result = getSortedArray(numbers, type);
    return res.status(result.status).json(result.data);

});

app.get('/number/count', (req, res) => {

    const { numbers } = req.query;
    const searchWord = req.query.search;

    if (!numbers) {
        return res.status(400).json({
            error: "please provide comma seperated array for proceed the function"
        });
    }

    const result = getWordCountInArray(numbers, searchWord);
    return res.status(result.status).json(result.data);

});