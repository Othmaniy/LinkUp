import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import backimage from "../../assets/magicpattern-seamless-patterns-1705701406969.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function Register() {
  const [visible, setVisible] = useState(false);
  const [form, SetForm] = useState({});
  const [resmessage, setResmessage] = useState("");
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isemailFocused, setemailFocused] = useState(false);

  const [ispasswordFocused, setpasswordFocused] = useState(false);
  const [isnameFocused, setnameFocused] = useState(false);
  const [islastnameFocused, setlastnameFocused] = useState(false);
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

  const handleChange = (e) => {
    SetForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "username",
      "email",
      "password",
      "username",
      "name",
      "lastname",
    ];
    let hasEmptyField = false;
    for (const field of requiredFields) {
      if (!form[field]) {
        hasEmptyField = true;
        SetForm((prevForm) => ({
          ...prevForm,
          [field]: "",
        }));
      }
    }

    if (hasEmptyField) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/createaccount",
        form
      );
      console.log(response);
      console.log(response.data);
      console.log(response.data.message);
      setResmessage(response.data.message);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="signup" style={{}}>
      <div className="alli">
        <Container style={{ backgroundColor: " fff" }}>
          <Row className="a">
            <Col sm={12} md={6} className="leftcontainer shadow ">
              <h2>welcome to AMU book</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                sit eos officia neque necessitatibus labore tempore aliquid
                voluptatum. Earum, dolor.
              </p>
              {/* <Link to="/login">
                <button className="mt-5 button1">login</button>
              </Link> */}
            </Col>

            <Col sm={12} md={6} className="rightcontainer shadow ">
              <span style={{fontSize:"20px"}}>create new account</span>
              <span>alresdy have an account <a href="/login" style={{color:"rgb(37, 205, 205)"}}>login</a></span>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  className="mt-3"
                  onChange={handleChange}
                  onFocus={() => handleFocus(setUsernameFocused)}
                  onBlur={()=>{
                    handleBlur(setUsernameFocused)
                  }}
                  style={getInputStyle(isUsernameFocused,form.username)}
                />

                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="mt-3"
                  onChange={handleChange}
                  onFocus={() => handleFocus(setemailFocused)}
                  onBlur={()=>{handleBlur(setemailFocused)}}
                  style={getInputStyle(isemailFocused,form.email)}
                />
                <input
                  type="text"
                  placeholder="first name"
                  name="name"
                  className="mt-3"
                  onChange={handleChange}
                  onFocus={() => handleFocus(setnameFocused)}
                  onBlur={()=>{handleBlur(setnameFocused)}}
                  style={getInputStyle(isnameFocused,form.name)}
                />
                   <input
                  type="text"
                  placeholder="last name"
                  name="lastname"
                  className="mt-3"
                  onChange={handleChange}
                  onFocus={() => handleFocus(setlastnameFocused)}
                  onBlur={()=>{handleBlur(setlastnameFocused)}}
                  style={getInputStyle(islastnameFocused,form.lastname)}
                />
                <div className="visibility">
                <input
                  type={visible?"text":"password"}
                  placeholder="upassword"
                  name="password"
                  className="mt-3"
                  onChange={handleChange}
                  onFocus={() => handleFocus(setpasswordFocused)}
                  onBlur={()=>{handleBlur(setpasswordFocused)}}
                  style={getInputStyle(ispasswordFocused,form.password)}

                />
      
                <div className="eye" onClick={()=>setVisible(!visible)}>
                  {visible?(<AiFillEye />):(<AiFillEyeInvisible/>)}
                
                </div>
                </div>
                
                <button
                  type="submit"
                  className="mt-3 signIn"
                  onSubmit={handleSubmit}
                >
                  signup
                </button>
                <h6>{resmessage}</h6>
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
  );
}

export default Register;
