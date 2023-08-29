import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import ReviewForm from './ReviewForm'

function ReviewCard({comment, user, review, updateReview, editReview, handleDelete, id}) {

    const [editing, setEditing] = useState(false)

    const handleEditClick = () => {
        setEditing(true);
    }


    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:5555/reviews/${id}`, {
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

    return (
        <Card border="primary" style={{ width: '18rem', marginTop: '100px' }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
                <Card.Title>{user}</Card.Title>
                <Card.Text>
                    {comment}
                </Card.Text>
                {editing ? (
                    <ReviewForm
                        review={review}
                        updateReview={(updatedReview) => {
                            editReview(updatedReview);
                            setEditing(false);
                        }}
                    />
                ) : (
                    <React.Fragment>
                    <Button variant="outlined" color="error" onClick={handleEditClick}>
                        Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleDeleteClick}>
                    Delete
                  </Button>
                  </React.Fragment>
                  
                )}
            </Card.Body>
        </Card>
    )
}

export default ReviewCard
