// Using express router
import express from "express";
import { createCategory, deleteCategory } from "../controllers/categoryController";

// Create Router
const categoryRouter = express.Router();

// Add function to route

categoryRouter.post('/', createCategory);
categoryRouter.delete('/:id', deleteCategory)

// Export router
export default categoryRouter;