import { Router } from "express";

import auth from "../../middlewares/auth";

import BrandController from "./brand.controller";

const brandRoutes = Router();

brandRoutes.post("/", auth, new BrandController().create);
brandRoutes.get("/:id", auth, new BrandController().read);

export default brandRoutes;
