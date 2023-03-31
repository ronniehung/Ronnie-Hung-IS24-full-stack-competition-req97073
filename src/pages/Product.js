import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';

import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProductForm';

const PRODUCTS_API_URL = "api/products/";

export default function ProductList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [isSearchScrum, setIsSearchScrum] = useState(true);

    const [filteredProducts, setFilteredProducts] = useState([]);
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };

    const switchSearch = () => {
      setIsSearchScrum(!isSearchScrum);
    }
  
    useEffect(() => {
      fetchProducts();
    }, [shouldRefresh]);

    useEffect(() => {
      if (searchTerm === "") {
        setFilteredProducts(products);
      } else {
        //if isSearchScrum is true, search products by Scrum Master
        //else, search products by Developer
        const filtered = isSearchScrum ? 
        products.filter((product) => product.scrumMasterName.toLowerCase().includes(searchTerm.toLowerCase())) :
        products.filter((product) => product.developers.map((name) => name.toLowerCase()).includes(searchTerm.toLowerCase()));
        
        setFilteredProducts(filtered);
      }
    }, [searchTerm, products]);

    const toggleAddModal = () => {
      setAddModal(!addModal);
    };

    const toggleEditModal = () => {
      setEditModal(!editModal);
    };
  
    const handleAddProduct = async () => {
      toggleAddModal();
      setShouldRefresh(!shouldRefresh);
    };
  
    const handleEdit = (product) => {
      setSelectedProduct(product);
      toggleEditModal();
      setShouldRefresh(!shouldRefresh);
    };

    const fetchProducts = async () => {
      const response = await fetch(PRODUCTS_API_URL);
      const data = await response.json();
      setProducts(data);
    }
  
    const handleDelete = async (productId) => {
      const response = await fetch(`${PRODUCTS_API_URL}/${productId}`, {
        method: "DELETE",
        body: JSON.stringify({productId: productId})
      });
      if (response.ok) {
        setFilteredProducts(filteredProducts.filter(p => p.id !== productId));
        fetchProducts(); //refresh the product list view
      } else {
        console.error(`Failed to delete product ${productId}.`);
      }
    };
  
    return (
    <>
      <div>
        <h1>Products</h1>
        <div className="mb-2">
          {<Input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearch}
          />}
          <FormGroup switch>
            <Label check>Search by {isSearchScrum ? 'Scrum Master' : 'Developer'}</Label>
            <Input type="switch" role="switch" onChange={switchSearch} />
          </FormGroup>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Product Number</th>
              <th>Product Name</th>
              <th>Product Owner Name</th>
              <th>Developers</th>
              <th>Scrum Master Name</th>
              <th>Start Date</th>
              <th>Methodology</th>
            </tr>
          </thead>
          <tbody>
             {filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productOwnerName}</td>
                <td className="devs">{
                  product.developers.map(function(dev){
                    return <span key={dev}>{dev}</span>;
                  }
                  )}</td>
                <td>{product.scrumMasterName}</td>
                <td>{product.startDate}</td>
                <td>{product.methodology}</td>
                <td>
                  <Button 
                    color="primary" 
                    size="sm" 
                    onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDelete(product.productId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))} 
          </tbody>
        </Table>
        <div className="d-flex justify-content-between">
          <Button color="success" onClick={handleAddProduct}>
            Add Product
          </Button>
          <p>Total Products: {filteredProducts.length}</p>
        </div>
        

        <Modal isOpen={addModal} toggle={toggleAddModal}>
          <ModalHeader toggle={toggleAddModal}>Add Product</ModalHeader>
          <ModalBody>
            {addModal && <AddProductForm toggle={toggleAddModal} product={products} onProductAdded={() => setShouldRefresh(!shouldRefresh)} />}
          </ModalBody>
        </Modal>
        
        <Modal isOpen={editModal} toggle={toggleEditModal}>
          <ModalHeader toggle={toggleEditModal}>Edit Product # {selectedProduct.productId}</ModalHeader>
          <ModalBody> 
            {editModal && <EditProductForm toggle={toggleEditModal} product={selectedProduct} onProductAdded={() => setShouldRefresh(!shouldRefresh)} />}
          </ModalBody>
       </Modal>

      </div>
      </>
    );
}  