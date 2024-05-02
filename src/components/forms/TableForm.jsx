import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { clearFields, handleBlur, handleInputFocus } from "../utilities";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createTables } from "../redux/actions/tablesActions";

function TableForm() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);
  const [validated, setValidated] = useState(false);
  const [num, setNum] = useState("");
  const [isTextVisible, setIsTextVisible] = useState({ table: { value: false, name: "Numero tavoli" } });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    dispatch(createTables(num, token));
    setValidated(true);
    setTimeout(() => {
      clearFields([setNum]);
    }, 3000);
  };

  return (
    <>
      <h2>Creia Tavoli</h2>
      <Form noValidate validated={validated} as={Col} className='m-5 w-lg-50 d-flex flex-column gap-4' required>
        <div className='input-container'>
          {(isTextVisible.table.value || num) && <p>Numero tavoli</p>}

          <Form.Group as={Col} controlId='validationCustom0232'>
            <Form.Control
              required
              type='text'
              value={num}
              placeholder='Numero tavoli'
              onClick={(e) => handleInputFocus("table", e, isTextVisible, setIsTextVisible)}
              onBlur={(e) => handleBlur("table", e, isTextVisible, setIsTextVisible)}
              onChange={(e) => setNum(e.target.value)}
            />
          </Form.Group>
        </div>

        <Button onClick={handleSubmit} className='submit-btn'>
          Crea tavoli <FaRegArrowAltCircleRight className='ms-auto' />
        </Button>
      </Form>
    </>
  );
}

export default TableForm;
