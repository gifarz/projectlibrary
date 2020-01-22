import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import moment from 'moment';
import Login from '../Login';

function Update(props) {

    const [data, setData] = useState({
        title: '',
        author: '',
        published_date: '',
        pages: '',
        language: '',
        publisher_id: ''
    })
    
    const apiUrl = 'http://127.0.0.1:8001/book/';
    const Token = sessionStorage.getItem('token')
    const Roles = sessionStorage.getItem('roles')

	useEffect(
        ()=>{
            const id = props.match.params.id
            Axios.get(apiUrl+id,
                {headers: {
                      "Authorization" : sessionStorage.getItem('token')}
                })
            .then(res=>{
                console.log(res.data)
                setData(res.data)
            }).catch(err=>console.error(err))
        },[]
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = props.match.params.id
        Axios.put(apiUrl+id, data,
            {headers: {
                    "Authorization" : sessionStorage.getItem('token')}
            })
        .then(res=>{
            console.log(res.status)
            if(res.status === 201) {
                alert('Book has been updated')
                props.history.push('/addbook')
            } 
        }).catch(err=>console.error(err))
    }
    

    const handleChange = (e) => {
        const newBook = {...data}
        newBook[e.target.id] = e.target.value
        setData(newBook)
    }

    return (
        <>
        {Token ?
            <>
            {Roles === "2" ?
                <div className="container mt-5">
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                value={data.title} 
                                type="text" 
                                id="title" 
                                name="title" 
                                className="form-control"
                                placeholder="Insert the title"
                            />
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                value={data.author} 
                                type="text" 
                                id="author" 
                                name="author" 
                                className="form-control"
                                placeholder="Insert the Author"
                            />
                        </div>
                        <div className="form-group">
                            <label>Published Date</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                value={moment(data.published_date).format('YYYY-MM-DD')}  
                                type="date" 
                                id="published_id" 
                                name="published_id" 
                                className="form-control"
                                placeholder="Insert the published date"
                            />
                        </div>
                        <div className="form-group">
                            <label>Pages</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                value={data.pages} 
                                type="number" 
                                id="pages" 
                                name="pages" 
                                className="form-control"
                                placeholder="Insert page"
                            />
                        </div>
                        <div className="form-group">
                            <label>Language</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                value={data.language} 
                                type="text" 
                                id="language" 
                                name="language" 
                                className="form-control"
                                placeholder="Insert the language"
                            />
                        </div>
                        <div className="form-group">
                            <label>Published ID</label>
                            <input 
                                onChange={(e)=>handleChange(e)} 
                                value={data.publisher_id} 
                                type="text" 
                                id="publisher_id" 
                                name="publisher_id" 
                                className="form-control"
                                placeholder="Insert the publisher id"
                            />
                        </div>
                        <button className="btn btn-dark">Submit</button>
                    </form>
                </div>
                :
                null
            }
            </>
        :
        <Login/>
        }
        </>
    )
} 
export default Update;