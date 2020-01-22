import React, { useState } from "react";
import {withRouter} from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
// import CommentForm from "../CommentSection/CommentForm";
import App from '../CommentSection/App';

function CardDetails(props) {

  const [book, setBook] = useState({ book: [] });

  const url = "http://127.0.0.1:8001/book/";

  useEffect(() => {
    const id = props.match.params.id;
    axios.get(url + id, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data);
        setBook(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Book Details</h1>
      <hr />
      <div className="row">
        <div className="col-sm-8">
          <p> Title of Book : {book.title}</p>
          <p> Author of Book : {book.author}</p>
          <p> Publised Date : {book.published_date}</p>
          <p> Language of Book : {book.language}</p>
          <p> Publisher Id of Book : {book.publisher_id}</p>
          <hr/>
          <p>Description of the Book :</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
            fugit incidunt facere quae vel quas fugiat, eveniet soluta. Quod
            voluptates mollitia doloribus magni animi explicabo nesciunt debitis
            obcaecati temporibus minus.
          </p>
        </div>
        <div className="col-sm-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkB9gxfXeF9D4ClN1-fhRO7_t3GGSvWS9Y58RyQkmQnKNZZhZ9" alt="Book Image"
          style={{width: "350px", marginBottom: "50px"}}
          />
        </div>
      </div>
      <hr/>
      <App />
    </div>
  );
}

export default withRouter(CardDetails)
