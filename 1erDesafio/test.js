import ProductManager from "./product-manager.js";

const product = new ProductManager();

const results = product.getProducts();

const product1 = product.addProducts(
	"Remera",
	"Adidas Dry-fit t-shirt",
	35000,
	"./assets/img/adidasT-DRYFIT",
	369852147,
	20
);
console.log(product1);
const product2 = product.addProducts(
	"Pantalón",
	"Nike Dry-fit long",
	40000,
	"./assets/img/nikeP-DRYFIT",
	369852146,
	13
);
console.log(product2);
const product3 = product.addProducts(
	"Zapatillas",
	"Topper",
	60555,
	"./assets/img/zaps-topper",
	369852146,
	10
);
console.log(product3);
console.log("Estos son los elementos cargados hasta el momento:");
console.log(results);
console.log(product.getProductsById(52));
console.log(product.getProductsById(2));
