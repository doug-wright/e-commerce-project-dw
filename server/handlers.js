'use strict';

const companies = require('./data/companies.json');
const products = require('./data/items.json');

let cart = [];

// Get product categories
const getProductCategories = () => {
  return new Promise((resolve, reject) => {
    const categories = [];

    products.forEach(product => {
      if (categories.indexOf(product.category) === -1) {
        categories.push(product.category);
      }
    });

    resolve({ status: 200, categories });
  });
};

// Get product body locations
const getProductBodyLocations = () => {
  return new Promise((resolve, reject) => {
    const bodyLocations = [];

    products.forEach(product => {
      if (bodyLocations.indexOf(product.body_location) === -1) {
        bodyLocations.push(product.body_location);
      }
    });

    resolve({ status: 200, bodyLocations });
  });
};

// Get product by id
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.filter(product => product._id === Number(id));

    if (product.length > 0) {
      const company = companies.filter(company => company._id === product[0].companyId);
      resolve({ status: 200, product: { ...product[0], company: company[0] }});
    } else {
      reject({ status: 400, request: id, message: 'Product not found' });
    }
  });
};

// Get products by filters
const getProductByFilters = (fromIndex, quantity, queryString) => {
  return new Promise((resolve, reject) => {
    let productsArray = [];
    let categoriesArray = [];
    let locationsArray = [];

    // Populate categories array
    if (queryString.hasOwnProperty('categories')) {
      categoriesArray = queryString.categories.split(',');
      categoriesArray.pop();
    }

    // Populate locations array
    if (queryString.hasOwnProperty('locations')) {
      locationsArray = queryString.locations.split(',');
      locationsArray.pop();
    }

    // Filter by category
    if (categoriesArray.length > 0 && locationsArray.length === 0) {
      for (let i = 0; i < products.length; i++) {
        if (categoriesArray.includes(products[i].category)) {
          productsArray.push(products[i]);
        }
      }
    }

    // Filter by body location
    if (categoriesArray.length === 0 && locationsArray.length > 0){
      for (let i = 0; i < products.length; i++) {
        if (locationsArray.includes(products[i].body_location)) {
          productsArray.push(products[i]);
        }
      }
    }

    // Filter by both
    if (categoriesArray.length > 0 && locationsArray.length > 0){
      let interArray = [];

      for (let i = 0; i < products.length; i++) {
        if (categoriesArray.includes(products[i].category)) {
          interArray.push(products[i]);
        }
      }

      for (let i = 0; i < interArray.length; i++) {
        if (locationsArray.includes(interArray[i].body_location)) {
          productsArray.push(interArray[i]);
        }
      }
    }

    const numProducts = productsArray.length;

    if (numProducts === 0) {
      resolve({ status: 200, products: [], numProducts: 0 });
    } else {
      if (fromIndex < 0) {
        reject({ status: 400, request: fromIndex, message: 'Invalid index' });
      }

      if (fromIndex > numProducts - 1) {
        reject({ status: 400, request: fromIndex, message: 'Index exceeds number of products' });
      }

      let productRange = [];
      let toIndex = fromIndex + quantity - 1;
  
      if (toIndex >= numProducts) {
        toIndex = numProducts -1;
      }

      for (let i = fromIndex; i <= toIndex; i++) {
        productRange.push({
          _id: productsArray[i]._id,
          name: productsArray[i].name,
          price: productsArray[i].price,
          imageSrc: productsArray[i].imageSrc,
          numInStock: productsArray[i].numInStock
        });
      }

      resolve({ status: 200, products: productRange, numProducts });
    }
  });
};

// Get product by index
const getProductByIndex = (fromIndex, quantity) => {
  return new Promise((resolve, reject) => {
    const numProducts = products.length;

    if (fromIndex < 0) {
      reject({ status: 400, request: fromIndex, message: 'Invalid index' });
    }

    if (fromIndex > numProducts - 1) {
      reject({ status: 400, request: fromIndex, message: 'Index exceeds number of products' });
    }

    const productRange = [];
    let toIndex = fromIndex + quantity - 1;
  
    if (toIndex >= numProducts) {
      toIndex = numProducts -1;
    }

    for (let i = fromIndex; i <= toIndex; i++) {
      productRange.push({
        _id: products[i]._id,
        name: products[i].name,
        price: products[i].price,
        imageSrc: products[i].imageSrc,
        numInStock: products[i].numInStock
      });
    }

    resolve({ status: 200, products: productRange, numProducts });
  });
};

// Add cart item
const addCartItem = (req) => {
  return new Promise((resolve, reject) => {
    const userCartItem = req.body;
    const newCartItem = {
      cartId: userCartItem.cartId,
      userId: req.params.userId,
      productId: userCartItem.productId,
      quantity: userCartItem.quantity,
      price: userCartItem.price,
      timestamp: Date.now()
    };

    cart.push(newCartItem);
    resolve({ status: 201, message: 'Cart item added'});
  });
};

// Update cart item
const updateCartItem = (req) => {
  return new Promise((resolve, reject) => {
    const userCartItem = req.body;
    const index = cart.findIndex(({ cartId }) => cartId === req.params.cartId);

    if (index !== -1) {
      const productIndex = products.findIndex(({ _id }) => _id === cart[index].productId);

      if (products[productIndex].numInStock >= userCartItem.quantity) {
        const newCartItem = {
          cartId: cart[index].cartId,
          userId: cart[index].userId,
          productId: userCartItem.productId,
          quantity: userCartItem.quantity,
          price: userCartItem.price,
          timestamp: Date.now()
        };

        cart.splice(index, 1, newCartItem);
        resolve({ status: 200, message: 'Cart item updated'});
      } else {
        // Reject exceeded quantity available
        reject({ status: 400, request: userCartItem, message: 'Requested quantity exceeds available quantity'});
      }
    } else {
      reject({ status: 400, request: userCartItem, message: 'Cart item not found'});
    }
  });
};

// Get cart items
const getCartItems = (req) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];
    let cartObj = {};

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].userId === req.params.userId) {
        cartObj = {
          cartId: cart[i].cartId,
          productId: cart[i].productId,
          quantity: cart[i].quantity,
          price: cart[i].price
        }
        cartItems.push(cartObj);
      }
    }

    if (cartItems.length > 0) {
      resolve({ status: 200, cart: cartItems });
    } else {
      // reject({ status: 400, request: req.params.userId, message: 'Cart empty or user does not exist' });
      resolve({ status: 200, cart: [] })
    }
  });
};

// Empty cart
const emptyCart = (req) => {
  return new Promise((resolve, reject) => {
    const newCart = cart.filter(({ userId }) => userId !== req.params.userId);
    
    cart = [...newCart];
    resolve({ status: 200, message: 'Cart emptied' });
  });
};

// Delete cart item
const deleteCartItem = (req) => {
  return new Promise((resolve, reject) => {
    const index = cart.findIndex(({ cartId }) => cartId === req.params.cartId);

    if (index !== -1) {
      cart.splice(index, 1);
      resolve({ status: 200, message: 'Cart item deleted' });
    } else {
      reject({ status: 400, request: req.params.cartId, message: 'Cart item not found'});
    }
  });
};

// Process cart
const processCart = (req) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].userId = req.params.userId) {
        const index = products.findIndex(({ _id }) => _id === cart[i].productId);
        const newQuantity = products[index].numInStock - cart[i].quantity;
        const newProduct = { ...products[index], numInStock: newQuantity };

        products.splice(index, 1, newProduct);
      }
    }

    // Empty user cart
    const newCart = cart.filter(({ userId }) => userId !== req.params.userId);
    
    cart = [...newCart];
    resolve({ status: 200, message: 'Cart processed' });
  });
};

module.exports = {
  getProductCategories,
  getProductBodyLocations,
  getProductById,
  getProductByFilters,
  getProductByIndex,
  addCartItem,
  updateCartItem,
  getCartItems,
  emptyCart,
  deleteCartItem,
  processCart
};