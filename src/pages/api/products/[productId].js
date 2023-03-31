import { products } from '../../../data/data';

export default function handler(req, res) {
    const { method, query } = req;
    const { productId } = query;
    const id = Number(productId)-1;
  
    switch (req.method) {
      case "GET":
        // Get all products
        if (productId) {
            //find index of product in data
            const index = products.findIndex((product) => product.productId === Number(productId));
            if (index !== -1) { //if product is found
                //send http response code 200
                res.status(200).json(products[index]);
            } else {
                //if product not found, send 404 response code
                res.status(404).json({message: `Product with ID ${productId} not found`});
            }
        } 
        break;
      case "PUT":
        // Update an existing product with api url api/products/:productId and product data in request body

        //find index of product in data
        const index = products.findIndex((product) => product.productId === Number(productId));
        if (index !== -1) { //if product is found
          // Replace the existing product with the updated data
          products[index] = { ...products[index], ...req.body };
          //send http response code 200
          res.status(200).json(products[index]);          
        } else {
            //if product not found, send 404 response code
            res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
        break;
      case "DELETE":
        // Delete a product
        if(productId){
            //find index of product in data
            const index = products.findIndex((product) => product.productId === Number(productId));
            if (index !== -1) { //if product is found
                products.splice(index, 1);
                res.status(200).json({ message: "Product deleted successfully" });
            } else {
                //if product not found, send 405 response code
                res.status(405).json({ message: `Product with ID ${productId} not found` });
            }
        }
        break;
      default:
        // res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ message: `Method ${method} not allowed` });
        break;
    }
} 