import { Product, SalesChannel } from "@medusajs/medusa"
import faker from "faker"
import { Connection } from "typeorm"

export type SalesChannelFactoryData = {
  name?: string
  description?: string
  is_disabled?: boolean
  id?: string
  products?: Product[],
}

export const simpleSalesChannelFactory = async (
  connection: Connection,
  data: SalesChannelFactoryData = {},
  seed?: number
): Promise<SalesChannel> => {
  if (typeof seed !== "undefined") {
    faker.seed(seed)
  }

  const manager = connection.manager

  let salesChannel = manager.create(SalesChannel, {
    id: data.id ?? `simple-id-${Math.random() * 1000}`,
    name: data.name || faker.name.firstName(),
    description: data.description || faker.name.lastName(),
    is_disabled:
      typeof data.is_disabled !== undefined ? data.is_disabled : false,
  })

  salesChannel = await manager.save(salesChannel)

  if (data.products) {
    const promises = []
    for (const product of data.products) {
      promises.push(
        manager.query(`
          INSERT INTO product_sales_channel (product_id, sales_channel_id) VALUES ('${product.id}', '${salesChannel.id}');
        `)
      )
    }
    await Promise.all(promises)
  }

  return salesChannel
}
