import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function CarCard({cost, image, make, model, orders, reviews, year, id}) {

    const handleOrderClick = async () => {
        try {
            await axios.post('http://localhost:5555/create-order', {car_id: id}, {withCredentials: true});
        } catch (error) {
            console.error('Error creating order', error)
        }
    }
    return (
        <Card style={{ width: '18rem', marginTop: '150px' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{make}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Model: {model}</ListGroup.Item>
        <ListGroup.Item>Year: {year}</ListGroup.Item>
        <ListGroup.Item>Cost: {cost}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button variant="primary" onClick={handleOrderClick}>Order</Button>
      </Card.Body>
    </Card>
        
    )
}

export default CarCard
