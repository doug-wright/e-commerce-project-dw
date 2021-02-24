'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 4000;

const {
  getProductCategories,
  getProductBodyLocations,
  getProductById,
  getProductByFilters,
  getProductByIndex,
  addCartItem,
  getCartItems,
  updateCartItem,
  emptyCart,
  deleteCartItem,
  processCart
} = require('./handlers');
const { response } = require('express');

express()
  .use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, PATCH, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  
  // Get product categories
  .get('/api/v1/product/categories', async (req, res) => {
    try {
      const response = await getProductCategories();

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Get product body locations
  .get('/api/v1/product/locations', async (req, res) => {
    try {
      const response = await getProductBodyLocations();

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Get products by filters
  .get('/api/v1/product/filter/:fromIndex/:quantity', async (req, res) => {
    try {
      const response = await getProductByFilters(Number(req.params.fromIndex), Number(req.params.quantity), req.query);
  
      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Get product by index
  .get('/api/v1/product/index/:fromIndex/:quantity', async (req, res) => {
    try {
      const response = await getProductByIndex(Number(req.params.fromIndex), Number(req.params.quantity));
  
      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Get product by id
  .get('/api/v1/product/:id', async (req, res) => {
    try {
      const response = await getProductById(req.params.id);

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Add cart item
  .post('/api/v1/cart/:userId', async (req, res) => {
    try {
      const response = await addCartItem(req);

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Get cart items
  .get('/api/v1/cart/:userId', async (req, res) => {
    try {
      const response = await getCartItems(req);

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Update cart item
  .put('/api/v1/cart/:cartId', async (req, res) => {
    try {
      const response = await updateCartItem(req);

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Empty cart
  .delete('/api/v1/cart/:userId', async (req, res) => {
    try {
      const response = await emptyCart(req);

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Delete cart item
  .patch('/api/v1/cart/:cartId', async (req, res) => {
    try {
      const response = await deleteCartItem(req);

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  // Process cart
  .post('/api/v1/cart/process/:userId', async (req, res) => {
    try {
      const response = await processCart(req);

      res.status(response.status).json(response);
    } catch (err) {
      res.status(err.status).json(err);
    }
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
