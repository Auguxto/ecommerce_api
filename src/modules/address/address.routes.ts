import { Router } from "express";

import auth from "../../middlewares/auth";

import AddressController from "./address.controller";

const addressRoutes = Router();

addressRoutes.post("/", auth, new AddressController().create);
addressRoutes.get("/:id", auth, new AddressController().read);
addressRoutes.patch("/:id", auth, new AddressController().update);
addressRoutes.delete("/:id", auth, new AddressController().delete);

export default addressRoutes;
