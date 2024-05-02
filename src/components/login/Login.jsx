import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../redux/actions/authenticationActions";
import { handleInputFocus, handleBlur } from "../utilities";
const Login = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isTextVisible, setIsTextVisible] = useState({
    email: { value: false, name: "Email" },
    password: { value: false, name: "Password" },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    dispatch(fetchLogin(email, password));
    setValidated(true);
  };

  return (
    <>
      <Container>
        <Row>
          <Col className='d-flex justify-content-center align-items-center flex-column'>
            <h2 className='pt-5'>Esegui l&apos; acesso per andare avanti!</h2>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className='m-5 w-lg-50 d-flex flex-column gap-4'
            >
              <div className='input-container'>
                {(isTextVisible.email.value || email) && <p>Email</p>}
                <Form.Group as={Col} controlId='validationCustom010'>
                  <Form.Control
                    required
                    type='email'
                    placeholder='Email'
                    onClick={(e) => handleInputFocus("email", e, isTextVisible, setIsTextVisible)}
                    onBlur={(e) => handleBlur("email", e, isTextVisible, setIsTextVisible)}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='username'
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className='input-container'>
                {(isTextVisible.password.value || password) && <p>Password</p>}
                <Form.Group as={Col} controlId='validationCustom02'>
                  <Form.Control
                    required
                    type='password'
                    placeholder='Password'
                    onClick={(e) => handleInputFocus("password", e, isTextVisible, setIsTextVisible)}
                    onBlur={(e) => handleBlur("password", e, isTextVisible, setIsTextVisible)}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </div>

              <Button type='submit' className='submit-btn d-flex align-items-center px-3'>
                Invio
                <FaRegArrowAltCircleRight className='ms-auto' />
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
