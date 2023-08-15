import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function OrderCard({user, cost, image, make, model, year, id, handleDelete}) {

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:5555/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            });
            if (response.ok) {
                handleDelete(id)
            } else {
                console.error('Delete failed')
            }
        } catch (error) {
            console.log('Delete failed', error)
        }
    }


    return(
        <Card style={{ width: '18rem' }}>
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
        <Button onClick={handleDeleteClick} variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    )
}

export default OrderCard

