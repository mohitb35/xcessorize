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

export const formattedDate = (orderDate) => {
	const monthArray = [
		'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	];

	const date = orderDate.getDate();
	const month = monthArray[orderDate.getMonth()];
	const year = orderDate.getFullYear();

	return `${date} ${month} ${year}`;
}