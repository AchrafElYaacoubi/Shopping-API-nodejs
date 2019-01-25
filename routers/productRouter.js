// Using express router
import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, addproductToCart } from "../controllers/productController";

// Create Router
const productRouter = express.Router();

// Add function to route
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.post('/addtocart/:id', addproductToCart);


// Export router
export default productRouter;