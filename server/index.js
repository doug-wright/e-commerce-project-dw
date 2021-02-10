'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 4000;

const {
  getCompanyById,
  getProducts,
  getNumProducts,
  getProductCategories,
  getProductsByCategory,
  getProductBodyLocations,
  getProductsByBodyLocation,
  getProductById,
  getProductByIndex
} = require('./handlers');
const { response } = require('express');

express()
  .use(function(req, res, next) {
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
  
  // Get company by id
  .get('/api/v1/company/:id', async (req, res) => {
    try {
      const response = await getCompanyById(req.params.id);

      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  // Get all products
  .get('/api/v1/product', async (req, res) => {
    try {
      const response = await getProducts();

      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  // Get product count
  .get('/api/v1/product/count', async (req, res) => {
    try {
      const response = await getNumProducts();

      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  // Get product categories
  .get('/api/v1/product/categories', async (req, res) => {
    try {
      const response = await getProductCategories();

      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  // Get products by category
  .get('/api/v1/product/category/:category', async (req, res) => {
    try {
      const response = await getProductsByCategory(req.params.category);
  
      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  // Get product body locations
  .get('/api/v1/product/locations', async (req, res) => {
    try {
      const response = await getProductBodyLocations();

      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  // Get products by body location
  .get('/api/v1/product/location/:bodyLocation', async (req, res) => {
    try {
      const response = await getProductsByBodyLocation(req.params.bodyLocation);
  
      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  // Get product by id
  .get('/api/v1/product/:id', async (req, res) => {
    try {
      const response = await getProductById(req.params.id);

      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  // Get product by index
  .get('/api/v1/product/index/:fromIndex', async (req, res) => {
    try {
      const response = await getProductByIndex(req.params.fromIndex);
  
      res.status(200).json({ status: 200, data: response });
    } catch (err) {
      res.status(400).json({ status: 400, data: { request: err.request, message: err.message }});
    }
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
