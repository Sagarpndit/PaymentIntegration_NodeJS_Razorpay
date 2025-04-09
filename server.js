const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;

/* middleware */
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});