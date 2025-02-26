const express = require('express');
const { getMinNumber } = require('./util.js');

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

    // if (num1 == 'NaN') {
    //     console.error("cannot handle this request. Pass a number");
    // } else {
    //     res.json({ min: num1 > num2 ? num2 : num1 });
    // }

    if (isNaN(num1) || isNaN(num2)) {
        //console.error("both number must be numbers");
        res.status(400).json(`error : both number must be numbers`);
    }
    res.json({ min: num1 > num2 ? num2 : num1 });


    //res.json({ min: Math.min(num1, num2) });

});