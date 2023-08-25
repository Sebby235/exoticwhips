import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import ReviewForm from './ReviewForm'

function ReviewCard({comment, user, review, updateReview, editReview}) {

    const [editing, setEditing] = useState(false)

    const handleEditClick = () => {
        setEditing(true);
    }

    return (
        <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
                <Card.Title>Primary Card Title</Card.Title>
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
                    <Button variant="outlined" color="error" onClick={handleEditClick}>
                        Edit
                    </Button>
                )}
            </Card.Body>
        </Card>
    )
}

export default ReviewCard
