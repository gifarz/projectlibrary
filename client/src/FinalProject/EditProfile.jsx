import React, {useState, useEffect} from 'react';
import Axios from 'axios';

export default function EditProfile(props) {

    const [profile, setProfile] = useState({
        name: "",
        password: ""
    })

    const url = "http://127.0.0.1:8001/dashboard/"

	useEffect(
        ()=>{
            Axios.get(url,
                {headers: {
                      "Authorization" : sessionStorage.getItem('token')}
                })
            .then(res=>{
                console.log(res.data)
                setProfile(res.data)
            }).catch(err=>console.error(err))
        },[]
    )

    const handleSubmit = (e) =>{
        e.preventDefault()
        const id = props.match.params.id
        Axios.put(url+id, profile,
            {headers: {
                    "Authorization" : sessionStorage.getItem('token')}
            })
        .then(res=>{
            console.log(res.status)
            if(res.status === 201) {
                alert('Profile has been updated')
                props.history.push('/dashboard')
            } 
        }).catch(err=>console.error(err))
    }
    

    const handleChange = (e) => {
        const newProfile = {...profile}
        newProfile[e.target.id] = e.target.value
        setProfile(newProfile)
    }

    return (
        <div className="container mt-5">
            <h1>User Profile Update</h1>
            <hr/>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        onChange={(e)=>handleChange(e)} 
                        value={profile.name} 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="form-control"
                        placeholder="Insert the name"
                    />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        onChange={(e)=>handleChange(e)} 
                        value={profile.username} 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="form-control"
                        placeholder="Insert the username"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        onChange={(e)=>handleChange(e)} 
                        value={profile.email} 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-control"
                        placeholder="Insert email"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Password Confirmation</label>
                    <input 
                        onChange={(e)=>handleChange(e)} 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="form-control"
                        placeholder="Insert password"
                    />
                </div>
                <button className="btn btn-dark">Update</button>
            </form>

        </div>
    )
}