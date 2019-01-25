// Importing mongoose
import mongoose from 'mongoose'

// Create Schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    gender: String,
    cart: [] // list of products
})

// Create userModel
const User = mongoose.model('User', userSchema);

// Export userModel
export default User;