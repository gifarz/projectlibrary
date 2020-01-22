import React from 'react';

class About extends React.Component{
    render(){
        return(
            <div className="container m-5" style={{marginTop: "20px"}}>
                <h1>About Page</h1>
                {/* <p>{this.props.match.params.number}</p> */}
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat, dignissimos, voluptate expedita nemo rem magni modi, perferendis eaque odio tempore accusamus cupiditate quod id possimus deserunt eveniet itaque dolores?</p>
            </div>
        )
    }
}

export default About;