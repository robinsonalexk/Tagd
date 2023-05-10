const express = require("express");
const cors = require('cors');
const app = express();

require("dotenv").config({path: ".env"});

const port = process.env.PORT || 9001;

const db = require("./db");
const routes = require("./routes/items.routes")

app.use(express.json());
app.use(cors());

app.use('/api/v1', routes);

db.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is currently running on port ${port}`);
    });
});
