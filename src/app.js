import express from "express";
import ProductManager from "./class/product-manager.js";

const PORT = 3000;
const app = express();

const productManager = new ProductManager("./src/data/db.json");

app.get("/", (req, res) => {
	res.send("Home Page");
});

app.get("/products", async (req, res) => {
	let data = await productManager.getProducts();
	let limit = req.query.limit;
	if (limit && limit > 0) {
		data = data.slice(0, limit);
	}
	res.json(data);
});

app.get("/products/:id", async (req, res) => {
	let data = await productManager.getProducts();
	let id = req.params.id;
	id = Number(id);
	if (isNaN(id)) {
		return res.json({ error: "Ingrese el ID numérico correspondiente" });
	}
	let product = data.find((p) => p.id === id);
	if (product) {
		res.json(product);
	} else {
		res.json({ error: "No existe ese producto" });
	}
});

app.get("/products/title/:title", async (req, res) => {
	let data = await productManager.getProducts();
	let title = req.params.title;

	let product = data.find((t) => t.title.toLowerCase() === title.toLowerCase());
	if (product) {
		res.json(product);
	} else {
		res.json({ error: `El producto ${product} no existe` });
	}
});

app.listen(PORT, () => console.log(`server online en puerto ${PORT}`));
