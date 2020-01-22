import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';

const GetBooks = props => {

    const [data, setData] = useState(props.data)
    const url = "http://127.0.0.1:8001/book/"

    useEffect(()=> {
        Axios.get(url,
            {headers: {
                "Authorization" : sessionStorage.getItem('token')
            }}
        )
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
    }, [props])

    return(
        <>
            <h2>List of Books</h2>
            <hr/>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr style={{textAlign: "center"}}>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Pages</th>
                        <th>Published</th>
                        <th>Language</th>
                        <th>PublisherID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{data.book.map(book => (
                    <tr key = {book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.published_date}</td>
                    <td>{book.pages}</td>
                    <td>{book.language}</td>
                    <td>{book.publisher_id}</td>
                    <td>
                        <button 
                        onClick={()=>props.handleUpdate(book.id)} 
                        className="btn btn-primary btn-sm mr-1 mb-1"
                        >Update
                        </button>

                        <button 
                        onClick={()=>props.handleRemove(book.id)} 
                        className="btn btn-danger btn-sm mb-1"
                        style={{width: "65px"}}
                        >Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default withRouter(GetBooks);