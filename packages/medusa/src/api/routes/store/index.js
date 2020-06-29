import { Router } from "express"
import cors from "cors"

import productRoutes from "./products"
import cartRoutes from "./carts"
import orderRoutes from "./orders"
import customerRoutes from "./customers"
import shippingOptionRoutes from "./shipping-options"

const route = Router()

export default (app, container, config) => {
  app.use("/store", route)

  const storeCors = config.store_cors || ""
  route.use(
    cors({
      origin: storeCors.split(","),
      credentials: true,
    })
  )

  customerRoutes(route)
  productRoutes(route)
  orderRoutes(route)
  cartRoutes(route)
  shippingOptionRoutes(route)

  return app
}
