const companies = require('./data/companies.json');
const products = require('./data/items.json');

// Get company by id
const getCompanyById = (id) => {
  return new Promise((resolve, reject) => {
    const company = companies.filter(company => company._id === Number(id));

    if (company.length > 0) {
      resolve({ company: company[0] });
    } else {
      reject({ request: id, message: 'Company not found' });
    }
  });
};

// Get all products
const getProducts = () => {
  return new Promise((resolve, reject) => {
    resolve(products.map(product => ({
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      numInStock: product.numInStock
    })));
  });
};

// Get product count
const getNumProducts = () => {
  return new Promise((resolve, reject) => {
    resolve({ numProducts: products.length });
  });
};

// Get product categories
const getProductCategories = () => {
  return new Promise((resolve, reject) => {
    const categories = [];

    products.forEach(product => {
      if (categories.indexOf(product.category) === -1) {
        categories.push(product.category);
      }
    });

    resolve({ categories });
  });
};

// Get product by category
const getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const product = products.filter(product => product.category.toLocaleLowerCase() === category.toLocaleLowerCase());

    if (product.length > 0) {
      resolve({ products: product });
    } else {
      reject({ request: category, message: 'No products found by that category' });
    }
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

    resolve({ bodyLocations });
  });
};

// Get products by body location
const getProductsByBodyLocation = (bodyLocation) => {
  return new Promise((resolve, reject) => {
    const product = products.filter(product => product.body_location.toLocaleLowerCase() === bodyLocation.toLocaleLowerCase());

    if (product.length > 0) {
      resolve({ products: product });
    } else {
      reject({ request: bodyLocation, message: 'No products found by that body location' });
    }
  });
};

// Get product by id
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.filter(product => product._id === Number(id));
    const company = companies.filter(company => company._id === product[0].companyId);

    if (product.length > 0) {
      resolve({ product: { ...product[0], company: company[0] }});
    } else {
      reject({ request: id, message: 'Product not found' });
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
      console.log(categoriesArray);
    }

    // Populate locations array
    if (queryString.hasOwnProperty('locations')) {
      locationsArray = queryString.locations.split(',');
      locationsArray.pop();
      console.log(locationsArray);
    }

    for (let i = 0; i < products.length; i++) {
      if (categoriesArray.includes(products[i].category) && locationsArray.includes(products[i].body_location)) {
        productsArray.push(products[i]);
      } else if (categoriesArray.includes(products[i].category) || locationsArray.includes(products[i].body_location)) {
        productsArray.push(products[i]);
      }
    }

    const numProducts = productsArray.length;

    if (fromIndex < 0) {
      reject({ request: fromIndex, message: 'invalid index' });
    }

    if (fromIndex > numProducts - 1) {
      reject({ request: fromIndex, message: 'index exceeds number of products' });
    }

    const productRange = [];
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

    resolve({ products: productRange, numProducts });
  });

};

// Get product by index
const getProductByIndex = (fromIndex, quantity) => {
  return new Promise((resolve, reject) => {
    const numProducts = products.length;

    if (fromIndex < 0) {
      reject({ request: fromIndex, message: 'invalid index' });
    }

    if (fromIndex > numProducts - 1) {
      reject({ request: fromIndex, message: 'index exceeds number of products' });
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

    resolve({ products: productRange, numProducts });
  });
};

module.exports = {
  getCompanyById,
  getProducts,
  getNumProducts,
  getProductCategories,
  getProductsByCategory,
  getProductBodyLocations,
  getProductsByBodyLocation,
  getProductById,
  getProductByFilters,
  getProductByIndex
};