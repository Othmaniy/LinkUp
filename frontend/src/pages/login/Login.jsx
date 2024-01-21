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
  const[isemailFocused,setemailFocused]=useState(false)
  const [ispasswordFocused, setpasswordFocused] = useState(false);
const handleChange =(e)=>{
  setForm({...form,[e.target.name]:e.target.value})
}
const getInputStyle = (isFocused, value) => ({
  borderColor: isFocused ?"rgb(247, 89, 144)" : "rgb(37, 205, 205)",
  borderWidth: isFocused ? "3px" : "3px",
  // boxShadow: "none",
  backgroundColor: !isFocused && value === "" ? "#fcb6b6" : "white",
});
const handleFocus = (setstate) => {
  setstate(true);
};
const handleBlur = (setstate) => {
  setstate(false);
};
const navigate =useNavigate()
console.log(form);
  const {login}= useContext(AuthContext)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const requiredFields = [
      "username",
      "email",
      "password",
      "username",
      "name",
    ];
    let hasEmptyField = false;
    for (const field of requiredFields) {
      if (!form[field]) {
        hasEmptyField = true;
        setForm((prevForm) => ({
          ...prevForm,
          [field]: "",
        }));
      }
    }
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
                
                
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                  sit eos officia neque necessitatibus labore tempore aliquid
                  voluptatum. Earum, dolor.
                </p>
                <p>donot have an account</p>
                {/* <Link to="/signup">
                <button className="mt-5 button1" >register</button>
                </Link> */}
              </Col>
        
            
              <Col sm={12} md={6} className="rightcontainer shadow">
              <span>login to your account</span>
                <span>donot have an account  <a href="/signup" style={{color:"rgb(37, 205, 205)"}}>register</a></span>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="mt-3"
                    onChange={handleChange}
                    onFocus={()=>handleFocus(setemailFocused)}
                    onBlur={()=>{
                      handleBlur(setemailFocused)
                    }}
                    style={getInputStyle(isemailFocused,form.email)}
                  />

                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="mt-3"
                    onChange={handleChange}
                    onFocus={()=>handleFocus(setpasswordFocused)}
                    onBlur={()=>{
                      handleBlur(setpasswordFocused)
                    }}
                    style={getInputStyle(ispasswordFocused,form.password)}
                  />
                  <button type="submit" className="mt-3 signIn">
                    Log In
                  </button>
                </form>
                <span style={{color:"red"}} className="mt-2">{error && error}</span>
                
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
