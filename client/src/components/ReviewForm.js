import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react'

function ReviewForm({addReview, review, updateReview}) {

    const [reviewText, setReviewText] = useState(review ? review.comment : '')

    const handleSubmit = async (e) => {
        try {
            const url = review ? `http://localhost:5555/reviews/${review.id}` : 'http://localhost:5555/reviews';
            const method = review ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({comment: reviewText}),
            });

            const newOrUpdatedReview = await response.json();
            if (response.ok) {
                review ? updateReview(newOrUpdatedReview) : addReview(newOrUpdatedReview);
                setReviewText('')
                console.log('Review posted successfully')
            } else {
                console.error('Review failed');
            }
        } catch (error) {
            console.log('Review failed:', error)
        }
    }

    return (
        <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          backgroundColor: 'white'
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
            defaultValue="Default Value"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={{ backgroundColor: 'white', color: 'black' }}
          />
          <Button type="submit" variant="contained">Submit</Button>
        </div>
      </form>
      
    )
}

export default ReviewForm
