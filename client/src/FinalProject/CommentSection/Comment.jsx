import React, {useState, useEffect} from 'react';
import axios from "axios";
import {withRouter} from 'react-router-dom';
import moment from 'moment'

function Comment(props) {

    const [book, setBook] = useState({ 
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
    })
    
    const url = "http://127.0.0.1:8001/getbook/"
    
    useEffect(() => {
        const id = props.match.params.id
        axios.get(url+id, {headers: {
			"Authorization" : sessionStorage.getItem('token')
        }})
        .then(res => {
            // console.log(res.data)
            setBook(res.data.book)
        })
    }, [])

    return (
        <>
            <div className="col-8  pt-3 bg-white">
                {book.comments ?
                        <>
                        <h5 className="text-muted mb-4" >
                            <span
                            style={{fontSize: "30px", color: "black"}}
                            >Comment Section</span>
                        </h5>
                        {book.comments.map((comment, index) => (
                            <>
                            <div key={index}>
                                <div className="media mb-3">
                                    <img
                                        className="mr-3 bg-light rounded"
                                        src={`https://api.adorable.io/avatars/48/${comment.user.username}@adorable.io.png`}
                                        alt={comment.user.username}
                                        style={{
                                            width: "50px"
                                        }}
                                    />
                                    <div className="media-body p-2 shadow-sm rounded bg-light border">
                                        <small className="float-right text-muted">{moment(comment.createdAt).format('LT')}</small>
                                        <h6 className="mt-0 mb-1 text-muted">{comment.user.username}</h6>
                                        {comment.message}
                                    </div>
                                </div>
                            </div>
                            </>
                        ))}
                        </>
                        :
                        <div className="alert text-center alert-info">
                            Be the first to comment
                        </div>
                    }
            </div>
        </>
    )
}
export default withRouter(Comment)

                // <h5 className="text-muted mb-4" >
                //     <span className="badge badge-danger">{data.comment.length}</span>{" "}
                //     Comment{data.comment.length > 0 ? "s" : ""}
                // </h5>
                // <div>
                //     {data.comment.length === 0 ? (
                //         <div className="alert text-center alert-info">
                //         Be the first to comment
                //         </div>
                //     ) : null
                //     }
                // </div> 