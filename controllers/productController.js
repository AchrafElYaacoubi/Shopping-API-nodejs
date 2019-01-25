import Product from "../models/Product";
import User from "../models/User";

// Func to get all products
export function getAllProducts(req,res) {
    // Get all products from db
    Product.find()
    .then(products => res.status(200).send(products))
    .catch(err => res.status(500).send(err.message || "Some error occured while retrieving products"))
        
}

// Get one product by id
export function getProductById(req, res) {
    // Get id from req
    // Fetch the product
    Product.findById(req.params.id)
    .then(product => {
        if(!product)
            return res.status(401).send(`Product with id: ${req.params.id} does not exist!`)
        res.status(200).send(product)
    }).catch(err => {
        if(err.kind === 'ObjectId')
            return res.status(401).send(`Product with id: ${req.params.id} does not exist!`)
        res.status(500).send(err.message || "Some error occured while retrieving the product with id: " + req.params.id);
    })
}

// Create a new product
export function createProduct(req, res) {
    // Get data from req && Create a new object Product
    // ?? fields must not be null 
    console.log("session------->", req.session);
    if(!(req.body.name && req.body.categoryId && req.session.currentUser._id && req.body.price)) 
        return res.status(400).send("please fill up all fields");
    const newProduct = new Product ({
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.categoryId,
        ownerId: req.session.currentUser._id
    })
    // Save it into the db
    newProduct.save()
    .then(product => res.send(product))
    // ?? Error while saving the product 500 error creating product
    .catch(err => res.status(500).send('Error while creating the product'))
}

// Update product
export function updateProduct(req, res) {
    // Fetch the product from db with id
    // Update the object and save it
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.categoryId = req.body.categoryId || product.categoryId;
            product.save()
        })
        .then(product => res.status(200).send(product))
        .catch(err => res.send(err.message, 500))
}

// Delete a product 
export function deleteProduct(req, res) {
    // Get id from req.params
    // Delete the product
    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if(!product) {
                return res.send("Product not found", 401);
            }
            res.send("product was deleted successfuly");
        }).catch(err => res(err.messahe, 500));
}

// Add to cart
export function addproductToCart(req, res) {
    // Get product 
    Product.findById(req.params.id)
        .then(product => {
            User.findById(req.session.currentUser)
                .then(user => {
                    // add the product to the cart list of current user
                    user.cart.push(product);
                    user.save().then(user => res.send(user)).catch(err => res.send(err.message))
                }).catch(err => res.send(err.message))
        }).catch( err => res.send(err.message))
}



