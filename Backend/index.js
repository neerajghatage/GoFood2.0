// index.js
const app = require('./app');
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
