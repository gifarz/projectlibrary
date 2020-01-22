import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from '../Login';
import {useForm} from 'react-hook-form'

export default function Book(props){

	const url = 'http://127.0.0.1:8001/book/'
	const Token = sessionStorage.getItem('token')
	const Roles = sessionStorage.getItem('roles')
	const {register, errors, handleSubmit} = useForm({
		mode: "onChange" 
	})

	const [book, setBook] = useState({book: []})
	const [data, setData] = useState({
		title: '',
        author: '',
        published_date: '',
		pages: '',
        language: '',
        publisher_id: ''
	})

	useEffect(
		()=>{
			axios.get(url, 
				{headers: {
          		"Authorization" : sessionStorage.getItem('token')
        		}
      	})
			.then(res=>{
				console.log(res.data)
				setBook(res.data)
			}).catch(err=>console.error(err))
		},[]
	)

 	const handleRemove = (id) => {
 		console.log(id)
 		axios.delete(url+id, {headers: {
			"Authorization" : sessionStorage.getItem('token')
		 }})
 		.then(res=>{
			console.log(res.data)
			alert('Data Berhasil Di hapus')
 		}).catch(err=>console.error(err))
 	}

	const handleUpdate = (id) => {
		console.log(id)
		props.history.push('/bookupdate/'+id)
	}

	const submit = () => {
		// e.preventDefault()
		axios.post(url, data, {headers: {
			"Authorization" : sessionStorage.getItem('token')
		}})
		.then(res=>{
            console.log(res.data)
			const mydata={...book}
			setBook(mydata)
			window.location.replace('/addbook')
		}).catch(err=>console.error(err))
	}

	const handleChange= (e) => {
		const newdata={...data}
		newdata[e.target.id]=e.target.value
		setData(newdata)
	}

	return(
		<>
			{Token ? 
			<div className="container mt-5">
				{Roles === "2" ? 
				<>
					<h2>Insert a new book on the form below</h2>
					<hr/>
					<form className="container mt-5" onSubmit={handleSubmit(submit)} noValidate>
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
								required
								ref={register({
									required: "This is required",
									minLength: {
										value: 3,
										message: "Minimal characters is 3"
									}
                                })}
							/>
						</div>
						{errors.title && <p style={{color: "red"}}>{errors.title.message}</p> }

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
								ref={register({
									required: "This is required",
									minLength: {
										value: 3,
										message: "Minimal characters is 3"
									}
                                })}
							/>
						</div>
						{errors.author && <p style={{color: "red"}}>{errors.author.message}</p> }

						<div className="form-group">
							<label>Published Date</label>
							<input 
								onChange={(e)=>handleChange(e)} 
								value={data.published_date} 
								type="date" 
								id="published_date" 
								name="published_date" 
								className="form-control"
								placeholder="Insert the published date"
								required
								ref={register({
									required: "This is required",
									minLength: {
										value: 3,
										message: "Minimal characters is 3"
									}
                                })}
							/>
						</div>
						{errors.published_date && <p style={{color: "red"}}>{errors.published_date.message}</p> }

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
								ref={register({
									required: "This is required",
									minLength: {
										value: 1,
										message: "Minimal characters is 3"
									}
                                })}
							/>
						</div>
						{errors.pages && <p style={{color: "red"}}>{errors.pages.message}</p> }

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
								ref={register({
									required: "This is required",
									minLength: {
										value: 3,
										message: "Minimal characters is 3"
									}
                                })}
							/>
						</div>
						{errors.language && <p style={{color: "red"}}>{errors.language.message}</p> }

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
								ref={register({
									required: "This is required",
									minLength: {
										value: 3,
										message: "Minimal characters is 3"
									}
                                })}
							/>
						</div>
						{errors.publisher_id && <p style={{color: "red"}}>{errors.publisher_id.message}</p> }

						<button className="btn btn-dark mb-4">Submit</button>
					</form>
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
						<tbody>{book.book.map(book => (
							<tr key = {book.id}>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.published_date}</td>
							<td>{book.pages}</td>
							<td>{book.language}</td>
							<td>{book.publisher_id}</td>
							<td>
								<button 
								onClick={()=>handleUpdate(book.id)} 
								className="btn btn-primary btn-sm mr-1 mb-1"
								>Update
								</button>

								<button 
								onClick={()=>handleRemove(book.id)} 
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
				:
				<h1>Kamu bukan admin</h1>
				}
			</div>
			:
			<Login/>
			}
		</>
		
	)
}