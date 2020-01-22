import React, {useState, useEffect} from 'react';
import {
  Card, CardImg, CardBody, CardSubtitle,
  CardTitle, Button
} from 'reactstrap';
import axios from 'axios';

const CardBook = (props) => {
  const url = 'http://127.0.0.1:8001/book/'

	const[Book, setBook] = useState({book: []})

  const handleDetails = (id) => {
    console.log(id)
    props.history.push('/bookdetails/'+id)
  }

	useEffect(
		()=>{
			axios.get(url, 
				{ headers: {
          		"Authorization" : sessionStorage.getItem('token')
        		}
      	})
			.then(res=>{
				console.log(res.data)
				setBook(res.data)
			}).catch(err=>console.error(err))
		},[]
	)
  
  return (
    <div className="container mt-5">
      <h1>List Of Books</h1>
      <hr/>
      <div className="row justify-content-between">
          {Book.book.map(card => (
            <div key={card.id} className="uk-animation-toggle" tabindex="0">
              <Card style={{width: "310px"}} className="mb-4 uk-animation-shake">
                <CardImg top src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkB9gxfXeF9D4ClN1-fhRO7_t3GGSvWS9Y58RyQkmQnKNZZhZ9" alt="Card image cap"
                style={{width: "300px", height: "250px"}}
                />
                <CardBody>
                  <CardTitle>Title : {card.title}</CardTitle>
                  <CardSubtitle >Author : {card.author}</CardSubtitle>
                  <CardSubtitle>Language : {card.language}</CardSubtitle>
                  <hr/>
                  <Button 
                    color="warning" 
                    onClick={()=>handleDetails(card.id)}
                    >Details
                  </Button>
                </CardBody>
              </Card>
          </div>
          ))}
      </div>
    </div>
  );
};

export default CardBook;