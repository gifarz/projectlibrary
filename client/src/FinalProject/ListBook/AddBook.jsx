import React, {useState} from 'react';
import axios from 'axios';
import moment from 'react-moment';
import Login from '../Login';

export default function Book(props){

    const url = 'http://127.0.0.1:8001/books/';
    const Token = sessionStorage.getItem('token')
    const Roles = sessionStorage.getItem('roles')

	const[Book, setBook] = useState({book: []})
	const [data, setData] = useState({
		title: '',
        author: '',
        published_date: '',
		pages: '',
        language: '',
        publisher_id: ''
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post(url, data, {headers: {
			"Authorization" : sessionStorage.getItem('token')
		}})
		.then(res=>{
            console.log(res.data)
            alert('Book has been added')
			const mydata={...Book}
            setBook(mydata)
            props.history.push('/book')
		}).catch(err=>console.error(err))
	}

	const handleChange = (e) => {
		const newdata={...data}
		newdata[e.target.id]=e.target.value
		setData(newdata)
	}

    
    return (
        <>
        {Token ?
            <>
            {Roles === "2" ?
                <>
                 <form className="container mt-5" onSubmit={(e)=>handleSubmit(e)} noValidate>
                    <div className="form-group" style={{textAlign: "center"}}>
                        <label>Title</label>
                        <input 
                            onChange={(e)=>handleChange(e)} 
                            value={data.title} 
                            type="text" 
                            id="title" 
                            name="title" 
                            className="form-control"
                            placeholder="Insert the title"
                            required
                        />
                        {/* {errors.title && <p style={{color: "red"}}>{errors.title}</p> } */}
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
                            placeholder="Insert the author"
                            required
                        />
                        {/* {errors.author && <p style={{color: "red"}}>{errors.author}</p> } */}
                    </div>

                    <div className="form-group">
                        <label>Published Date</label>
                        <input 
                            onChange={(e)=>handleChange(e)} 
                            value={moment(data.published_date).format('YYYY-MM-DD')} 
                            type="date" 
                            id="published_date" 
                            name="published_date" 
                            className="form-control"
                            placeholder="Insert the published date"
                            required
                        />
                        {/* {errors.author && <p style={{color: "red"}}>{errors.author}</p> } */}
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
                            required
                        />
                        {/* {errors.pages && <p style={{color: "red"}}>{errors.pages}</p> } */}
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
                            required
                        />
                        {/* {errors.language && <p style={{color: "red"}}>{errors.language}</p> } */}
                    </div>

                    <div className="form-group">
                        <label>Publisher ID</label>
                        <input 
                            onChange={(e)=>handleChange(e)} 
                            value={data.publisher_id} 
                            type="text" 
                            id="publisher_id" 
                            name="publisher_id" 
                            className="form-control"
                            placeholder="Insert the publisher id"
                            required
                        />
                        {/* {errors.language && <p style={{color: "red"}}>{errors.language}</p> } */}
                    </div>

                    <button className="btn btn-dark">Submit</button>
                </form>
                </>
                :
                <>
                <h1>Anda Bukan Admin</h1>
                </>
            }
            </>
            :
            <Login/>
        }
        </>
    )
}







