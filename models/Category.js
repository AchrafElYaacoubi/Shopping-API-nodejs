// Import mongoose
import mongoose from 'mongoose';

// Create Schema
const categorySchema = mongoose.Schema({
    name: String,
})

// Create Model
const Category = mongoose.model('Category', categorySchema);

export default Category;
