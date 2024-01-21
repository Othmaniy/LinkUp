import React, { useContext, useState } from "react";
import "./login.css";
import {Link, useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../../components/context/authcontext";
function Login() {
  const [form,setForm] = useState({})
  const[error,setError] =useState(null)
const handleChange =(e)=>{
  setForm({...form,[e.target.name]:e.target.value})
}
const navigate =useNavigate()
console.log(form);
  const {login}= useContext(AuthContext)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await login(form);
      navigate("/")
    }
    catch(err){
       console.log(err);
       console.log(err.response.data.message);
      
       setError(err.response.data.message)
    }
    }
    
 
    
  return (
    <>
      <div className="alli">
        <Container>
          <Row>
            
              <Col sm={12} md={6} className="leftcontainer shadow">
                <h1>login</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                  sit eos officia neque necessitatibus labore tempore aliquid
                  voluptatum. Earum, dolor.
                </p>
                <p>donot have an account</p>
                <Link to="/signup">
                <button className="mt-5 button1" >register</button>
                </Link>
              </Col>
        
            
              <Col sm={12} md={6} className="rightcontainer shadow">
                <h1>login</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="mt-3"
                    onChange={handleChange}
                  />

                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="mt-3"
                    onChange={handleChange}
                  />
                  <button type="submit" className="mt-3 signIn">
                    Log In
                  </button>
                </form>
                {error && error}
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
    </>
  );
}

export default Login;
