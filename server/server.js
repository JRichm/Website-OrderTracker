const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(express());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

let orders = [];
id = 0;

app.post('/orders', (req, res) => {
    let newOrder = req.body;
    orders.push(newOrder);
    orders.sort((a, b) => a.orderTime.localeCompare(b.orderTime));
    res.send(orders);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})