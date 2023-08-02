import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(object) {
    try {
      const products = await this.getProducts();
      let newProduct = { status: true, thumbnails: [], ...object };
      let id;

      if (
        newProduct.title &&
        typeof newProduct.title === "string" &&
        newProduct.description &&
        typeof newProduct.description === "string" &&
        newProduct.code &&
        typeof newProduct.code === "string" &&
        newProduct.price &&
        typeof newProduct.price === "number" &&
        newProduct.status &&
        typeof newProduct.status === "boolean" &&
        newProduct.stock &&
        typeof newProduct.stock === "number" &&
        newProduct.category &&
        typeof newProduct.category === "string"
      ) {
        !products.length
          ? (id = 1)
          : (id = products[products.length - 1].id + 1);
        newProduct = { ...newProduct, id };
        console.log({ newProduct });
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return newProduct;
      } else {
        return "No fue posible agregar el producto";
      }
    } catch (error) {
      return error;
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const datosArchivo = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(datosArchivo);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(idProduct) {
    try {
      const products = await this.getProducts();
      const product = products.find((element) => element.id === idProduct);

      return !product
        ? `No se encontró ningun producto con el id ${idProduct}`
        : product;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(idProduct, dataToUpdate) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(
        (element) => element.id === idProduct
      );

      if (productIndex === -1) {
        return `No se encontró ningun producto con el id ${idProduct}`;
      }
      const product = products[productIndex];
      const productUpdated = { ...product, ...dataToUpdate };
      products[productIndex] = productUpdated;
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return productUpdated;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts();
      const newProducts = products.filter(
        (element) => element.id !== idProduct
      );
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
    } catch (error) {
      return error;
    }
  }
}

const productManager = new ProductManager("./Products.json");

// async function testing(){
//   let mensaje = await productManager.addProduct(  {
//     "title": "producto prueba",
//     "description": "Este es un producto prueba 9",
//     "price": 2009,
//     "thumbnail": "Sin imagen",
//     "code": "code9",
//     "stock": 9,
//     "id": 10
//   })

//   console.log(mensaje);

// }

// testing()

export default productManager;
