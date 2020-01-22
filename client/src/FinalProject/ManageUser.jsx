import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Book(props){

	const url = 'http://127.0.0.1:8001/api/users'

	const[user, setUser] = useState({user: []})
	const [role, setRole] = useState({
		role: ""
	})

	useEffect(
		()=>{
			axios.get(url, 
				{headers: {
          		"Authorization" : sessionStorage.getItem('token')
        		}
      	})
			.then(res=>{
				console.log(res.data)
				setUser(res.data)
			}).catch(err=>console.error(err))
		},[]
	)

	const handleChange = (e) =>{
        const {value} = e.target
        setRole({
            role:value
        })
    }

	const handleEdit = (usersId) =>{
        const data = {
            roleId:role.role
        }
        axios.put(`http://127.0.0.1:8001/api/test/user/${usersId}`, data,{
            headers:{
                "authorization": sessionStorage.getItem('token')
            }
        })
        .then (res => {
            console.log(res)
            alert("Role has been switched")
            window.location.replace('/users')
        })
        .catch(er => {
            console.log(er)
        })
    }

	return(
		<div className="container mt-5">
			<h1>List Of Users</h1>
			<hr/>
			<table className="table table-hover">
				<thead className="thead-dark">
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Roles</th>
						<th>Actions</th>
					</tr>
	       		</thead>
	       		<tbody>
					{user.user.map(users => (
			         <tr key = {users.id}>
			           <td>{users.name}</td>
			           <td>{users.username}</td>
			           <td>{users.email}</td>
						<td>
							{users.roles.map(role => (
								<select 
								className="custom-select" 
								name="roles" 
								id="roles" 
								onChange={(e)=>handleChange(e)}
								>
									<option value={role.id}>{role.name}</option>
									<option value={role.id === 1 ? 2 : 1}>
										{role.name === "ADMIN" ? "USER" : "ADMIN"}
									</option>
								</select>
							))}
					   </td>
					   <td> <button 
							className="btn btn-warning" 
							onClick={()=> handleEdit(users.id)}
							> 
							Edit
							</button> 
						</td>
					</tr>       
					))}
			     </tbody>
			</table>
		</div>
	)
}