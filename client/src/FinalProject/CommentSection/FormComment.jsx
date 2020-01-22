import React from 'react';

const FormComment = (props) => {

    return (

            <div className="col-4  pt-3 border-right">
            <h3 style={{marginBottom: "25px"}}>Leave Comment Here</h3>
            <form onSubmit={event => props.handleSubmit(event)}>
                <div className="form-group">
                    <textarea 
                    onChange={(e)=>props.handleChange(e)}
                    value={props.comment.message}
                    className="form-control"
                    placeholder="input your message" 
                    name="message" 
                    id="message"
                    required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-dark">
                        Comment
                    </button>
                </div>
            </form>
        </div>

    )
}

export default FormComment;