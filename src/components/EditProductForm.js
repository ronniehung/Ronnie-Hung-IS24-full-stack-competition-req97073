import React, { useState } from "react";
import { Form, FormGroup, Label, Button, Input, Row, Col} from 'reactstrap';

const PRODUCTS_API_URL = "api/products";

const EditProductForm = ({ product, onProductAdded }) => {
    const [productName, setProductName] = useState(product.productName);
    const [scrum, setScrum] = useState(product.scrumMasterName);
    const [productOwner, setProductOwner] = useState(product.productOwnerName);
    const [developers, setDevelopers] = useState(product.developers);
    const [startDate, setDate] = useState(product.startDate);
    const [methodology, setMethod] = useState(product.methodology);
    const [resMsg, setResMsg] = useState("");

    const id = product.productId;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        productName: event.target.productName.value,
        productOwnerName: event.target.productOwner.value,
        scrumMasterName: event.target.scrum.value,
        developers: event.target.developers.value.split(',').slice(0,5).map((name) => name.trim()),
        startDate: event.target.startDate.value,
        methodology: event.target.methodology.value
    }

    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    if(response.ok) {
        onProductAdded(body); //refresh the product list view
        setResMsg(`Product # ${id} has been edited.`);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="productName">
            Product Name:
        </Label>
        <Input
        type="text"
        name="productName"
        placeholder="Product1"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
        required={true}
        />
      </FormGroup>
      <Row>
          <Col md={6}>
            <FormGroup>
                <Label for="scrum">
                    Scrum Master:
                </Label>
                <Input
                type="text"
                name="scrum"
                placeholder="John Doe"
                value={scrum}
                onChange={(event) => setScrum(event.target.value)}
                required={true}
                />
            </FormGroup>
          </Col>
          <Col md={6}>
              <FormGroup>
                <Label for="productOwner">
                    Product Owner:
                </Label>
                <Input
                type="text"
                name="productOwner"
                placeholder="John Doe"
                value={productOwner}
                onChange={(event) => setProductOwner(event.target.value)}
                required={true}
                />
            </FormGroup>
          </Col>
      </Row>
      <FormGroup>
        <Label for="developers">
            Developers (separate names with comma or space, up to 5):
        </Label>
        <Input
          type="text"
          name="developers"
          placeholder="Joe, Jane, Jack, Joan"
          value={developers}
          onChange={(event) => setDevelopers(event.target.value)}
          required={true}
        />
      </FormGroup>
      <FormGroup>
        <Label for="startDate">
            Start Date:
        </Label>
        <Input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(event) => setDate(event.target.value)}
          required={true}
        />
      </FormGroup>
      <FormGroup>
        <Label for="methodology">
            Methodology:
        </Label>
        <Input
          type="text"
          name="methodology"
          value={methodology}
          onChange={(event) => setMethod(event.target.value)}
          required={true}
        />
      </FormGroup>
      <Button type="submit" color="primary">Save</Button>
      <p className="response mt-3 text-success">{resMsg}</p>
    </Form>
  );
};

export default EditProductForm;