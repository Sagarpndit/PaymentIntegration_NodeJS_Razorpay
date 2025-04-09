const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/payments');
const PORT = 4000;

/* middleware */
app.use(cors());
app.use(express.json());


app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});