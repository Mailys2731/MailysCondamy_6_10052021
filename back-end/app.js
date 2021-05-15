const express = require ('express');
const app = express();
const cors = require ('cors');
require ('./models/dbconfig');
app.use((req, res, next) =>
{
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});
const authsRoutes = require('./routes/authsRoutes');

const saucesRoutes = require('./routes/saucesRoutes');

app.use(express.json());
app.use(cors());
app.use('/api/auth', authsRoutes);
app.use('/api/sauces', saucesRoutes)


app.listen(3000, () => console.log("server started: 3000"));

//token 
