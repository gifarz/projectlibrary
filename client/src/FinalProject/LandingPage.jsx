import React from 'react';
import './style.css'

export default function LandingPage(props) {

    const handleClick = () => {
        props.history.push('/register')
    }

    return (
        <div
        className="background"
        style={{
            background: "url(http://getwallpapers.com/wallpaper/full/3/5/f/888676-library-background-images-1920x1080-cell-phone.jpg) center / cover",
            width: "100%",
            height: "600px",
            marginTop: "0px",
            position: "absolute"
        }}>
            <div className="container mt-5 landing">
                <h1 
                style={{
                    fontFamily: "Lobster, cursive", 
                    fontSize: "55px",
                    color: "white"
                    }}
                >The Wonderful World of Reading
                </h1>
                <p 
                style={{
                    fontSize: "20px", 
                    marginTop: "20px"
                }}>We provide a large selection of books !
                </p>
                <div className="d-flex justify-content-center button mb-3">
                    <button 
                    className="btn btn-dark btn-outline-light" 
                    onClick={(e)=>handleClick(e)}
                    style={{

                    }}
                    >GET STARTED
                    </button>
                </div>
                <p className="d-flex justify-content-center">if you like to read just click the button above</p>
            </div>
        </div>
    )
}