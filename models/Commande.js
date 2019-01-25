// Import mongoose
import mongoose from 'mongoose';

// Create Schema
const commandeSchema = mongoose.Schema({
    produits:[],
    date: { type: Date, default: Date.now },
    totalPrice: Number,
    userId: String
})

// Create Model
const Commande = mongoose.model('Commande', commandeSchema);

export default Commande;