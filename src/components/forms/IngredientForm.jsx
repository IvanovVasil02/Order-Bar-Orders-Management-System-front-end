import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function IngedientForm() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <h2>Creia nuovo ingrediente</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className='d-flex flex-column justify-content-center align-items-center'
      >
        <Form.Group as={Col} md='8' controlId='validationCustom01' className='pt-5'>
          <Form.Label>Nome ingrediente</Form.Label>
          <Form.Control required type='text' />
        </Form.Group>

        <Form.Group as={Col} md='8' controlId='validationCustom01' className='pt-5'>
          <Form.Label>Quantità</Form.Label>
          <Form.Control required type='text' />
        </Form.Group>
        <Button type='submit' className='mt-5'>
          Submit form
        </Button>
      </Form>
    </>
  );
}

export default IngedientForm;
