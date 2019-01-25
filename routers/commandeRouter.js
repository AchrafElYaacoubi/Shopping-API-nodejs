// Using express router
import express from "express";
import { getAllCommandes, getCommandeById, createCommande } from "../controllers/commandeController";

// Create Router
const commandeRouter = express.Router();

// Add function to route
commandeRouter.get('/', getAllCommandes);
commandeRouter.get('/:id', getCommandeById);
commandeRouter.post('/checkout', createCommande);

// Export router
export default commandeRouter;