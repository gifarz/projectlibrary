import React, {useState} from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import PostBook from './PostBook';
import GetBooks from './GetBooks';
import UpdateBook from './UpdateBook';

const App = (props) => {

    const url = "http://127.0.0.1:8001/book/"

    const initialBookState = {
        title: "",
        author: "",
        published_date: "",
        pages: "",
        language: "",
        publisher_id: ""
    }

    const initialGetBook = {
        book: [{
            title: "",
            author: "",
            published_date: "",
            pages: "",
            language: "",
            publisher_id: ""
        }]
    }

    const [book, setBook] = useState(initialBookState)
    const [data, setData] = useState(initialGetBook)
    const [editing, setEditing] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setBook({
            ...book,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post(url, book,
            { headers: {
                "Authorization" : sessionStorage.getItem('token')
            }}
        )
        .then(res => {
            console.log(res.data)
            setBook({...book})
        })
    }

    const handleUpdate = id => {
        props.history.push('/bookupdate/'+id)
    }

    const handleRemove = id => {
        Axios.delete(url+id,
            { headers: {
                "Authorization" : sessionStorage.getItem('token')
            }}    
        )
        .then(res => {
            setEditing(false)
            setData(data.book.filter(book => book.id !== id))
            alert('book has been deleted')
        })
    }

    return (
        <div className="container mt-5">
            <PostBook handleSubmit={handleSubmit} handleChange={handleChange} book={book}/>
            <GetBooks data={data} handleUpdate={handleUpdate} handleRemove={handleRemove}/>
            {/* <UpdateBook handleUpdate={handleUpdate} /> */}
        </div>
    )
}

export default withRouter(App)