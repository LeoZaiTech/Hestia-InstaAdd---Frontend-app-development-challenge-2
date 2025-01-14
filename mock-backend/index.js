const path = require('node:path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const products = require('./jsons/products.json');
const vendors = require('./jsons/vendors.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

app.use((req, res, next) => {
  setTimeout(next, Math.floor(Math.random() * 2000 + 100));
});

app.use('/static', express.static(path.join(__dirname, 'public')));

apiRouter.get('/auth/me', (req, res) => {
  res.status(200).send({
    id: '1234',
    username: 'John Smith',
    givenName: 'John',
    familyName: 'Smith',
    role: 'admin',
    roles: [],
    email: 'John.Smith@Ferguson.com',
  });
});

apiRouter.get('/vendors', (req, res) => {
  res.status(200).send(vendors);
});

apiRouter.get('/products', (req, res) => {
  const queryParams = req.query;
  const altCode = queryParams.altCode;
  const productCode = queryParams.productCode;
  const upc = queryParams.upc;
  const vendorId = queryParams.vendorId;

  const searchCode = altCode || productCode || upc;
  const searchField = altCode ? 'altCode' : productCode ? 'productCode' : upc ? 'upc' : '';

  if (!searchCode || (productCode && !vendorId) || (upc && !vendorId)) {
    return res.status(400).send('Missing or invalid parameters');
  }

  const product = products.find((i) => i[searchField] === searchCode);

  if (
    !!product &&
    (searchField === 'altCode' ||
      ((searchField === 'productCode' || searchField === 'upc') && product.vendor.id === vendorId))
  ) {
    res.status(200).send(product);
  } else {
    res.status(204).send();
  }
});

app.use('/api/v1', apiRouter);

const port = process.env.PORT || '8080';
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
