import { products } from '../../../data/data'

export default function handler( req, res ) {
    switch (req.method) {
        case "GET":
            //get all products
            res.status(200).json(products);
            break;

        case "POST":
            // Create a new product
            const newProduct = req.body;
            newProduct.productId = products[products.length-1].productId + 1; //create unique product number 
            products.push(newProduct);
            //send http response code 201
            res.status(201).json(newProduct);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).json({ message: `Method ${method} not allowed` });
            break;
    }
  
}