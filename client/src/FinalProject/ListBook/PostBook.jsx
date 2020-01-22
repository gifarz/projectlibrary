import React from 'react';
import {withRouter} from 'react-router-dom';

const PostBook = (props) => {

    return (
        <>
            <h2>Insert a new book on the form below</h2>
            <hr/>
            <form className="container mt-5" onSubmit={(event)=>props.handleSubmit(event)} noValidate>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        onChange={(e)=>props.handleChange(e)} 
                        value={props.book.title} 
                        type="text" 
                        id="title" 
                        name="title" 
                        className="form-control"
                        placeholder="Insert the title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <input 
                        onChange={(e)=>props.handleChange(e)} 
                        value={props.book.author} 
                        type="text" 
                        id="author" 
                        name="author" 
                        className="form-control"
                        placeholder="Insert the author"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Published Date</label>
                    <input 
                        onChange={(e)=>props.handleChange(e)} 
                        value={props.book.published_date} 
                        type="date" 
                        id="published_date" 
                        name="published_date" 
                        className="form-control"
                        placeholder="Insert the published date"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Pages</label>
                    <input 
                        onChange={(e)=>props.handleChange(e)} 
                        value={props.book.pages} 
                        type="number" 
                        id="pages" 
                        name="pages" 
                        className="form-control"
                        placeholder="Insert page"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Language</label>
                    <input 
                        onChange={(e)=>props.handleChange(e)} 
                        value={props.book.language} 
                        type="text" 
                        id="language" 
                        name="language" 
                        className="form-control"
                        placeholder="Insert the language"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Publisher ID</label>
                    <input 
                        onChange={(e)=>props.handleChange(e)} 
                        value={props.book.publisher_id} 
                        type="text" 
                        id="publisher_id" 
                        name="publisher_id" 
                        className="form-control"
                        placeholder="Insert the publisher id"
                        required
                    />
                </div>

                <button className="btn btn-dark mb-4">Submit</button>
            </form>
        </>
    )
}

export default withRouter(PostBook)