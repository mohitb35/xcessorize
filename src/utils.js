export const cartItemCount = (cart) => {
	return cart.reduce( 
		(itemCount, item) => itemCount + item.quantity, 
		0
	)
}

export const cartTotal = (cart) => {
	return cart.reduce(
		(total, item) => total + (item.product.price*item.quantity), 
		0
	)
}