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

export const formattedAddress = (address) => {
	return (
		`${address['line 1']}, ${address['line 2'] || ''}, ${address['city']} - ${address['pincode']}, ${address['state']}`
	).replace(', ,', ',');
}



export const processFetchError = (error, resourceName) => {
	let processedError = {
		displayMessage: null,
		logMessage: error.message,
		stack: error.stack
	}

	if (error.isAxiosError) {	
		if (!error.response) {
			processedError.displayMessage = 'Could not reach the server. Please check your network and try again';
		} else {
			processedError.displayMessage = `${capitalizeFirstLetter(resourceName)} could not be fetched.`
		}
	}

	return processedError;
}

export const processCreateError = (error, resourceName) => {
	let processedError = {
		displayMessage: null,
		logMessage: error.message,
		stack: error.stack
	}

	if (error.isAxiosError) {	
		if (!error.response) {
			processedError.displayMessage = 'Could not reach the server. Please check your network and try again';
		} else {
			processedError.displayMessage = `An error occurred. ${capitalizeFirstLetter(resourceName)} could not be created. Please try after some time.`;
		}
	}

	return processedError;
}

export const processGeneralError = (error) => {
	return {
		displayMessage: error.displayMessage,
		logMessage: error.message,
		stack: error.stack
	}
}

export const capitalizeFirstLetter = (str) => {
	return str[0].toUpperCase() + str.slice(1);
}