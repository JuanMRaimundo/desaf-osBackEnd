import { error } from "console";
import fs from "fs";
import path from "path";
import { title } from "process";

let rootFile = "./data/db.json";
export default class ProductManager {
	path;

	static COUNTER = 0;
	constructor(rootFile) {
		this.path = rootFile;
		this.getProducts();
		ProductManager.COUNTER = ProductManager.COUNTER + 1;
	}

	static counterInstances() {
		console.log(this.COUNTER);
	}

	async getProducts() {
		try {
			const data = await fs.promises.readFile(this.path, { encoding: "utf-8" });
			/* console.log(`Listado de productos: ${data}`); */
			return JSON.parse(data);
		} catch (error) {
			console.log(`Advertencia, error al leer el archivo: ${error}`);
			return [];
		}
	}
	async getProductsById(id) {
		try {
			let products = await this.getProducts();
			let productSelected = products.find((v) => v.id === id);

			if (productSelected) {
				console.log(`Producto seleccionado ${JSON.stringify(productSelected)}`);
				return productSelected;
			} else {
				console.log("Producto no encontrado.");
				return null;
			}
		} catch (error) {
			console.log(`Cuidado, error al leer el archivo: ${error.message}`);
			return null;
		}
	}

	async addProducts(title, description, price, thumbnail, code, stock) {
		try {
			let products = await this.getProducts();

			let codeNoRepeated = products.some((v) => v.code === code);

			if (codeNoRepeated) {
				return `El producto con código: ${code} ya se encuentra registrado`;
			} else {
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

				products.push(newProduct);
				await fs.promises.writeFile(
					this.path,
					JSON.stringify(products, null, 5),
					{
						encoding: "utf-8",
					}
				);
				console.log("Producto añadido exitosamente");
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	async updateProduct(id, upProductData) {
		try {
			let productList = await this.getProducts();
			let findProductIndex = productList.findIndex((p) => p.id === id);

			if (findProductIndex !== -1) {
				productList[findProductIndex] = {
					...productList[findProductIndex],
					...upProductData,
				};

				await fs.promises.writeFile(
					this.path,
					JSON.stringify(productList, null, 5),
					{
						encoding: "utf-8",
					}
				);

				console.log("Producto actualizado:", productList[findProductIndex]);
			} else {
				console.log("Producto no encontrado");
			}
		} catch (error) {
			console.log(`Error: ${error.message} al querer actualizar producto`);
		}
	}

	async deleteProduct(id) {
		try {
			let products = await this.getProducts();
			console.log("productos del delete" + products);
			let index = products.findIndex((p) => p.id === id);
			if (index !== -1) {
				products.splice(index, 1);
				await fs.promises.writeFile(
					this.path,
					JSON.stringify(products, null, 5)
				);
				console.log("Producto eliminado exitosamente");
			} else {
				return console.log("Producto no encontrado");
			}
		} catch (error) {
			console.log(`Error: ${error.message} al querer eliminar producto`);
		}
	}
	//dejo comentado el método para generar un número random, por si más adelante me sirve
	/* 	generatingCode() {
		return Math.floor(Math.random() * 1000);
	} */
}

const productManager = new ProductManager(rootFile);

productManager.addProducts(
	"Zapatillas",
	"Topper",
	60578,
	"./assets/img/zaps-topper",
	369852146,
	10
);
productManager.addProducts(
	"Pantalón",
	"Nike",
	35000,
	"./assets/img/pant-nike",
	369852146,
	15
);

productManager.addProducts(
	"Pantalón-2",
	"Nike",
	35000,
	"./assets/img/pant-nike",
	3696857,
	15
);
productManager.addProducts(
	"Short",
	"UnderArmour",
	15400,
	"./assets/img/short-under",
	3216549,
	10
);
productManager.getProductsById(5);
productManager.deleteProduct(3);
productManager.addProducts(
	"Botines",
	"Puma",
	154456,
	"./assets/img/short-under",
	326584654,
	12
);

productManager.updateProduct(4, {
	title: "Botines Tapón aluminio",
	description: "Puma-12",
	price: 12500,
	thumbnail: "./assets/img/bot-pum",
	code: 65735435,
	stock: 16,
});
