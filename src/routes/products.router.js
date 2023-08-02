import { Router } from "express";
import productManager from "../ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const { limit } = req.query;

    if (!+limit) {
      return res.status(200).json({ products });
    } else {
      let limitedProducts = products.slice(0, limit);
      console.log(limitedProducts);
      return res.status(200).json({ limitedProducts });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(+pid);
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct({ ...req.body });
    return res.status(200).json({ newProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await productManager.updateProduct(+pid, req.body);
    return res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(+pid);
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
