import fs from "fs";
import productManager from "./ProductManager";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    if (fs.existsSync(this.path)) {
      const carts = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(carts);
    } else {
      return [];
    }
  }

  async getCartById(idCart) {
    try {
      const carts = await this.getCarts();
      const cart = carts.filter((element) => element.id == idCart);
      console.log(cart);
      return !cart ? `No se encontró ningun carrito con el id ${idCart}` : cart;
    } catch (error) {
      return error;
    }
  }

  async createCart() {
    try {
      const carts = await this.getCarts();
      let id;

      !carts.length ? (id = 1) : (id = carts[carts.length - 1].id + 1);

      const newCart = { id, products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return newCart;
    } catch (error) {
      return error;
    }
  }

  async addProduct(idCart, idProduct) {
    try {
      const product = await productManager.getProductById(idProduct);
      if (typeof product !== "string") {
        const carts = await this.getCarts();
        const cart = carts.find((element) => element.id === idCart);

        if (cart) {
          const productIndex = cart.products.findIndex(
            (element) => element.product === idProduct
          );

          if (productIndex === -1) {
            cart.products.push({ product: idProduct, quantity: 1 });
          } else {
            cart.products[productIndex].quantity++;
          }
          await fs.promises.writeFile(this.path, JSON.stringify(carts));
          return cart;
        }
      } else {
        return "El id de producto no existe";
      }
    } catch (error) {
      return error;
    }
  }
}

const cartManager = new CartManager("./Carts.json");

export default cartManager;
