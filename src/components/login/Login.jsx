import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchLogin, fetchRegister } from "../redux/actions/authenticationActions";
import { handleInputFocus, handleBlur } from "../utilities";
const Login = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [activeForm, setActiveForm] = useState("login");
  const [responseStatus, setResponseStatus] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isTextVisible, setIsTextVisible] = useState({
    name: { value: false, name: "Nome" },
    surname: { value: false, name: "Cognome" },
    email: { value: false, name: "Email" },
    password: { value: false, name: "Password" },
    phone: { value: false, name: "Recapito Telefonico" },
    address: { value: false, name: "Indirizzo" },
  });

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    try {
      const resp = await dispatch(fetchLogin(email, password));
      setResponseStatus(resp);
      setValidated(true);
    } catch (error) {
      console.log(error);
      setResponseStatus(error.message);
      setValidated(false);
    }

    setTimeout(() => setResponseStatus(null), 5000);
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    try {
      const resp = await dispatch(fetchRegister(name, surname, email, password, phone, address));
      setResponseStatus(resp);
      setValidated(true);
    } catch (error) {
      setResponseStatus(error);
      setValidated(false);
    }
    setTimeout(() => setResponseStatus(null), 5000);
  };

  return (
    <>
      <Container>
        <Row>
          <Col className='d-flex justify-content-center align-items-center flex-column'>
            <h2 className='pt-5'>Esegui l&apos; acesso per andare avanti!</h2>
            {activeForm === "login" && (
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmitLogin}
                className={`m-5 w-lg-50 d-flex flex-column gap-4 ${
                  activeForm === "login" ? "slide-in-left" : "slide-out-right"
                }`}
              >
                {responseStatus && <p className='text-center fs-4'>{responseStatus}</p>}
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
                <p className='text-center pointer'>
                  Non sei registrato?
                  <span className='pointer' onClick={() => setActiveForm("register")}>
                    Registrati!
                  </span>
                </p>
              </Form>
            )}
            {/* --------------------------------------------------REGISTER FORM---------------------------------------- */}
            {activeForm === "register" && (
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmitRegister}
                className={`m-5 w-lg-50 d-flex flex-column gap-4 ${
                  activeForm === "register" ? "slide-in-left" : "slide-out-right"
                }`}
              >
                {responseStatus?.message && <p className='text-center fs-4'>{responseStatus.message}</p>}
                <div className='d-flex gap-2'>
                  <div className='input-container'>
                    {(isTextVisible.name.value || name) && <p>Nome</p>}
                    <Form.Group as={Col} controlId='validationCustom010'>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Nome'
                        onClick={(e) => handleInputFocus("name", e, isTextVisible, setIsTextVisible)}
                        onBlur={(e) => handleBlur("name", e, isTextVisible, setIsTextVisible)}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    {responseStatus?.errorsList
                      ?.filter((error) => error.field === "name")
                      .map((error, index) => (
                        <p className='text-center flex-wrap' key={index}>
                          {error.message}
                        </p>
                      ))}
                  </div>{" "}
                  <div className='input-container'>
                    {(isTextVisible.surname.value || surname) && <p>Cognome</p>}
                    <Form.Group as={Col} controlId='validationCustom010'>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Cognome'
                        onClick={(e) => handleInputFocus("surname", e, isTextVisible, setIsTextVisible)}
                        onBlur={(e) => handleBlur("surname", e, isTextVisible, setIsTextVisible)}
                        onChange={(e) => setSurname(e.target.value)}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    {responseStatus?.errorsList
                      ?.filter((error) => error.field === "surname")
                      .map((error, index) => (
                        <p className='text-center flex-wrap' key={index}>
                          {error.message}
                        </p>
                      ))}
                  </div>{" "}
                </div>

                <div className='d-flex gap-2'>
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
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    {responseStatus?.errorsList
                      ?.filter((error) => error.field === "email")
                      .map((error, index) => (
                        <p className='text-center flex-wrap' key={index}>
                          {error.message}
                        </p>
                      ))}
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
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    {responseStatus?.errorsList
                      ?.filter((error) => error.field === "password")
                      .map((error, index) => (
                        <p className='text-center flex-wrap' key={index}>
                          {error.message}
                        </p>
                      ))}
                  </div>
                </div>

                <div className='d-flex gap-2'>
                  <div className='input-container'>
                    {(isTextVisible.phone.value || phone) && <p>Recapito Telefonico</p>}
                    <Form.Group as={Col} controlId='validationCustom010'>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Recapito Telefonico'
                        onClick={(e) => handleInputFocus("phone", e, isTextVisible, setIsTextVisible)}
                        onBlur={(e) => handleBlur("phone", e, isTextVisible, setIsTextVisible)}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    {responseStatus?.errorsList
                      ?.filter((error) => error.field === "phone")
                      .map((error, index) => (
                        <p className='text-center flex-wrap' key={index}>
                          {error.message}
                        </p>
                      ))}
                  </div>{" "}
                  <div className='input-container'>
                    {(isTextVisible.address.value || address) && <p>Indirizzo</p>}
                    <Form.Group as={Col} controlId='validationCustom010'>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Indirizzo'
                        onClick={(e) => handleInputFocus("address", e, isTextVisible, setIsTextVisible)}
                        onBlur={(e) => handleBlur("address", e, isTextVisible, setIsTextVisible)}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    {responseStatus?.errorsList
                      ?.filter((error) => error.field === "address")
                      .map((error, index) => (
                        <p className='text-center flex-wrap' key={index}>
                          {error.message}
                        </p>
                      ))}
                  </div>{" "}
                </div>

                <Button type='submit' className='submit-btn d-flex align-items-center px-3'>
                  Invio
                  <FaRegArrowAltCircleRight className='ms-auto' />
                </Button>
                <p className='text-center'>
                  Sei già registrato?{" "}
                  <span className='pointer' onClick={() => setActiveForm("login")}>
                    Loggati!
                  </span>
                </p>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
