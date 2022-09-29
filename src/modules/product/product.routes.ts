import { Router } from "express";

import auth from "../../middlewares/auth";

import ProductController from "./product.controller";

const productRoutes = Router();

productRoutes.post("/", auth, new ProductController().create);
productRoutes.get("/:id", new ProductController().read);
productRoutes.patch("/:id", auth, new ProductController().update);
productRoutes.delete("/:id", auth, new ProductController().delete);

export default productRoutes;
