export default async (req, res) => {
  const { id } = req.params
  try {
    const orderService = req.scope.resolve("orderService")
    const customerService = req.scope.resolve("customerService")
    let customer = await customerService.retrieve(id)
    customer = await customerService.decorate(
      customer,
      [
        "email",
        "payment_methods",
        "has_account",
        "shipping_addresses",
        "phone",
      ],
      []
    )

    customer.orders = await orderService.list({ customer_id: customer._id })

    res.json({ customer })
  } catch (err) {
    throw err
  }
}
