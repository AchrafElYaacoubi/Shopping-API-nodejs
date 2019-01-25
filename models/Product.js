// Import mongoose
import mongoose from 'mongoose';

// Create Schema
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    categoryId: String,
    ownerId: String 
})

// Create Model
const Product = mongoose.model('Product', productSchema);

export default Product;
