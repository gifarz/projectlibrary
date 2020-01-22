import React, {useEffect, useState} from 'react';
import axios from 'axios'

export default function LoginSuccess(props) {

    const url = "http://127.0.0.1:8001/dashboard"
    const [profile, setProfile] = useState({user : []})

    useEffect(()=> {
        axios.get(url,
            {headers: {
                "Authorization" : sessionStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res.data)
            setProfile(res.data)
        })
    },[])
    
    const handleUpdate = (id) => {
        console.log(id)
        props.history.push('/editprofile/'+id)
    }

    return (
        <div>
            <div className="container mt-5">
                <h1 className="mb-4">Dashboard</h1>
                <hr/>
                <div className="mb-5">
                    <img 
                    src={`https://ui-avatars.com/api/?name=${profile.name}?background=0D8ABC&color=fff`} 
                    alt={profile.name}
                    className="center"
                    style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "150px", 
                        marginBottom: "30px",
                        marginTop: "20px", 
                        borderRadius: "80px",
                    }}
                    />
                    
                    <div 
                    className="card" 
                    style={{
                        width: "500px", 
                        margin: "auto", 
                        borderRadius: "10px"
                    }}>
                        <div className="card-body">
                            <div className=" media mb-3">
                                <h6 className="pt-2">Name</h6> 
                                <div className="media-body p-2 shadow-sm rounded bg-light border ml-5">
                                    <h6 className="mt-0 mb-1 text-muted">{profile.name}</h6>
                                </div>
                            </div>
                            <div className="media mb-3">
                                <h6 className="pt-2">Usersname</h6> 
                                <div className="media-body p-2 shadow-sm rounded bg-light border ml-3">
                                    <h6 className="mt-0 mb-1 text-muted">{profile.username}</h6>
                                </div>
                            </div>
                            <div className="media mb-3">
                                <h6 className="pt-2">Email</h6> 
                                <div className="media-body p-2 shadow-sm rounded bg-light border ml-5">
                                    <h6 className="mt-0 mb-1 text-muted">{profile.email}</h6>
                                </div>
                            </div>
                            <button 
                            className="btn btn-warning" 
                            onClick={()=>handleUpdate(profile.id)}
                            style={{width: "100%"}}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}