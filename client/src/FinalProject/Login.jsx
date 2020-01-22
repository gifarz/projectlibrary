import React ,{useState} from 'react';
import axios from 'axios';
import './style.css'

 const Login = (props) => {

    const url = "http://127.0.0.1:8001/api/auth/signin"

    const [form,setForm ] = useState({
        username:"",
        password:""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(url,form)
        .then(res=>{
            if(res.status === 200){
                sessionStorage.setItem("token",res.data.accessToken);
                sessionStorage.setItem("roles", res.data.roles)
                window.location.replace('/dashboard/')
            } else if(res.status === 404){
                alert('Invalid username or password')
            } else {
                throw new Error('Login Failed')
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }

    const handleChange = (e) => {
		const {name,value} = e.target
		setForm({
			...form,
			[name] : value
		})
    }

    return (
        <div className="bg"
        style={{
            background: 'url(https://images.wallpaperscraft.com/image/library_books_reading_125466_1920x1080.jpg) center / cover',
            position: "relative",
            height: "610px",
            paddingTop: "100px"
        }}>

            <div className="card" style={{width: "500px", margin: "auto", zIndex: 2}}>
                <div className="card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <h3>Please Login!</h3>
                        <hr/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend3">@</span>
                        <input 
                            onChange={(e) => handleChange(e)}
                            value={form.username}
                            type="text" 
                            name="username" 
                            id="username" 
                            className="form-control" 
                            placeholder="Insert username"
                        />
                        </div>
                    </div>
                    <div className="form-group"> 
                        <label>Password</label>
                        <input 
                            onChange={(e) => handleChange(e)}
                            value={form.password}
                            type="password" 
                            name="password" 
                            id="password" 
                            className="form-control" 
                            placeholder="Insert password"
                        />
                    </div>
                    <p>Don't have an account ? Please register <a href="/register">here</a> </p>
                    <button className="btn btn-success">Login</button>
                </form>
                </div>
            </div> 
            
        </div>
    )
    
}

export default Login;
