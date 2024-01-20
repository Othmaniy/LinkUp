import React, { useState } from 'react'
import "./register.css"
import {Link} from "react-router-dom"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios"
import backimage from "../../assets/magicpattern-seamless-patterns-1705701406969.png";
function Register() {

  const [form,SetForm] =useState({});
  const [resmessage,setResmessage] = useState("");

  const handleChange=(e)=>{
    SetForm({...form,[e.target.name]:e.target.value})

  }
  console.log(form);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:4000/api/auth/createaccount",form)
      console.log(response);
      console.log(response.data);
      console.log(response.data.message);
      setResmessage(response.data.message);
    }
    catch(err){
      console.log(err);
      console.log(err.response.data.message);

    }

  }
  return (
    <div className='signup' style={{
    }}>
    <div className="alli">
        <Container style={{backgroundColor:" fff"}} >
          <Row className='a' >
            
              <Col sm={12} md={6} className="leftcontainer shadow ">
                <h1>wellcome to amu book</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                  sit eos officia neque necessitatibus labore tempore aliquid
                  voluptatum. Earum, dolor.
                </p>
                <Link to="/login">

                <button className="mt-5 button1" >login</button>
                </Link>
                
              </Col>
        
            
              <Col sm={12} md={6} className="rightcontainer shadow ">
                <h1>register</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    className="mt-3"
                    onChange={handleChange}
                  />

                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="mt-3"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    placeholder="upassword"
                    name="password"
                    className="mt-3"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="mt-3"
                    onChange={handleChange}
                  />
                  
                  <button type="submit" className="mt-3 signIn" onSubmit={handleSubmit}>
                    signup
                  </button>
                  <h6>{ resmessage}</h6>
                  
                </form>
              </Col>
            
          </Row>
        </Container>
      </div>

      {/* <div className='logincontainer'>
  <div className='card'>
    <div className='leftcontainer'>
      <h1>helloworld</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vero libero quam et repellat voluptatum accusantium mollitia ratione illum ducimus delectus ea odit consectetur non, ad vitae fuga reprehenderit similique?</p>
      <span></span>
    </div>
    <div className='rightcontainer'>
    <h1>login</h1>
    <form >
      <input type="text" placeholder='username' />
      <input type="password" placeholder='password' />
      <button>login</button>
    </form>
    </div>
  </div>

</div>
     */}
    </div>
  )
}

export default Register