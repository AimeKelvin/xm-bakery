const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = require('./models');
db.sequelize.sync();

require('./routes/auth.routes')(app);
require('./routes/product.routes')(app);
require('./routes/order.routes')(app);
require('./routes/inventory.routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
