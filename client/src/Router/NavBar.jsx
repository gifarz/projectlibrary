import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import {withRouter} from 'react-router-dom'


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const Token = sessionStorage.getItem("token")
  const Roles = sessionStorage.getItem("roles")

  const handleHome = () => {
    props.history.push('/')
  }

  const handleSignOut = () => {
    sessionStorage.clear("token")
    props.history.push('/login')
  }

  const handleRegister = () => {
    props.history.push('/register')
  }

  const handleLogin = () => {
    props.history.push('/login')
  }

  const handleDashboard = () => {
    props.history.push('/dashboard')
  }

  const handleAddbook = () => {
    props.history.push('/addbook')
  }

  const handleUser = () => {
    props.history.push('/users')
  }

  const handleListBook = () => {
    props.history.push('/book')
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" style={{backgroundColor: "#0d0c0c"}}>
        <NavbarBrand style={{color: "white"}} onClick={handleHome}>@YourLibrary</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {Token ? 
            <>
              {Roles === "2" ? (
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink onClick={handleDashboard} style={{color: "white"}}>Dashboard</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={handleAddbook} style={{color: "white"}}>Add Book</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={handleUser} style={{color: "white"}}>Manage User</NavLink>
                  </NavItem>
                </Nav>
              )
              :
              (
                <>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink onClick={handleDashboard} style={{color: "white"}}>Dashboard</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={handleListBook} style={{color: "white"}}>List of Book</NavLink>
                  </NavItem>
                </Nav>
                </>
              )
              }
                <>
                  <NavbarText className="ml-auto" navbar> 
                    <button className="btn btn-danger" onClick={handleSignOut}>
                      Logout
                    </button> 
                  </NavbarText>
                </>
            </>
                  :
                <div className="ml-auto"> 
                  <NavbarText style={{marginRight: "10px"}}> 
                    <button className="btn btn-primary" onClick={handleRegister}> 
                      Register
                    </button> 
                  </NavbarText>
                  <NavbarText> 
                    <button className="btn btn-danger" onClick={handleLogin}>
                      Login
                    </button> 
                  </NavbarText>
                </div>
          }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(NavBar)
