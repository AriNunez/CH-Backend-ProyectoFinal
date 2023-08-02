import { Router } from "express";
import cartManager from "../CartsManager.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const createdCart = await cartManager.createCart();
    return res.status(200).json({ message: "Cart", cart: createdCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    return res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
