import env from "dotenv";
env.config();

import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler";

import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import addressRoutes from "./modules/address/address.routes";
import productRoutes from "./modules/product/product.routes";
import brandRoutes from "./modules/brand/brand.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/user/auth", authRoutes);
app.use("/user/address", addressRoutes);
app.use("/product", productRoutes);
app.use("/product/brand", brandRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("💻 Server is running!");
});
