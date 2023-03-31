# BC Gov IS24 Full Stack Code Challenge

>author: Ronnie Hung

## Install and Run

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Usage

### GET products
GET all products: GET http://localhost:3000/api/products/
GET product by id: GET http://localhost:3000/api/products/1

## POST a new product
POST http://localhost:3000/api/products/ with body: 
```
{
  "productName": "Product10",
  "productOwnerName": "Lily",
  "developers": [
            "Joe",
            "John",
            "Jane",
            "Joanne",
            "Jay"
        ],
  "scrumMasterName": "Mike",
  "startDate": "2023-03-01",
  "methodology": "Scrum"
 }
 ```

 ## PUT a product by id
PUT http://localhost:3000/api/products/1 with body:
 ```
 {
  "productName": "Product1",
  "productOwnerName": "Lily",
  "developers": [
            "Joe",
            "John",
            "Jane",
            "Joanne",
            "Jay"
        ],
  "scrumMasterName": "Mike",
  "startDate": "2023-03-01",
  "methodology": "Scrum"
 }
 ```

 ## DELETE a product by id
 DELETE http://localhost:3000/api/products/1


You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

API routes can be accessed on [http://localhost:3000/api/products](http://localhost:3000/api/products) or http://localhost:3000/api/products/:productId.

## Frameworks Used ##
* Next.js/React
* Bootstrap (reactstrap)