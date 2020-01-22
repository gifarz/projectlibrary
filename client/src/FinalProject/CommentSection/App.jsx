import React, {useState} from 'react';
import axios from 'axios';
import FormComment from './FormComment';
import FieldComment from './FieldComment';
import {withRouter} from 'react-router-dom';

const App = (props) => {

    const url = 'http://127.0.0.1:8001/comment/'
    const initialState = {
        message: ""
    }

    const initialBookState = { 
        book: [{
            comments: [
                {
                    message: "",
                    createdAt: "",
                    user: {
                        username: ""
                    }
                }
            ]
        }]
    }

    const [comment, setComment] = useState(initialState)
    const [book, setBook] = useState(initialBookState)

    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setComment({
            ...comment,
            [name]: value
        })
    } 

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(url+props.match.params.id, comment,
            { headers: {
                "Authorization" : sessionStorage.getItem('token')
            }}
        )
        .then(res => {
            console.log(res.data)
            const comments = {...comment}
            setComment(comments)
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="row">
            <FormComment handleSubmit={handleSubmit} handleChange={handleChange} comment={comment}/>
            <FieldComment book={book}/>
        </div >
    )
}

export default withRouter(App);