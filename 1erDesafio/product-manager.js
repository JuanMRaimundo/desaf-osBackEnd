export default class ProductManager {
	products;
	static COUNTER = 0;
	constructor() {
		this.products = [];
		ProductManager.COUNTER = ProductManager.COUNTER + 1;
	}

	static counterInstances() {
		console.log(this.COUNTER);
	}
	addProducts(title, description, price, thumbnail, code, stock) {
		const codeNoRepeated = this.products.some((v) => v.code === code);
		if (codeNoRepeated) {
			return `El producto con código: ${code} ya se encuentra registrado`;
		}
		const newId = ++ProductManager.COUNTER;
		const newProduct = {
			id: newId,
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};
		this.products.push(newProduct);
		return "Producto añadido exitosamente";
	}

	getProducts() {
		const gettingProducts = this.products;
		return gettingProducts;
	}
	getProductsById(id) {
		const gettingProductId = this.products.find((v) => v.id === id);

		if (gettingProductId) {
			console.log("Producto seleccionado: ");
			return gettingProductId;
		} else {
			console.log("Producto no encontrado.");
			return null;
		}
	}
	//dejo comentado el método para generar un número random, por si más adelante me sirve
	/* 	generatingCode() {
		return Math.floor(Math.random() * 1000);
	} */
}
