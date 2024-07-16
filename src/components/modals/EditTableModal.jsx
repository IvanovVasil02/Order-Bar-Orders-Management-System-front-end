import { Button, Col, Form, Modal } from "react-bootstrap";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { clearFields, handleBlur, handleInputFocus } from "../utilities";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createTables } from "../redux/actions/tablesActions";

const EditTableModal = (props) => {
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

  const handleDelete = () => {
    console.log("ci8a");
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter' className='align-self-center'>
          Modifica Tavolo N° {props.table.tableNumber}
        </Modal.Title>
        <IoMdClose className='fs-3 ms-auto' onClick={props.handleClose} />
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center'>
        <Form noValidate validated={validated} as={Col} className='m-5 w-lg-50 d-flex flex-column  gap-4' required>
          <div className='input-container'>
            {(isTextVisible.table.value || num) && <p>Numero tavoli</p>}

            <Form.Group as={Col} controlId='validationCustom0232'>
              <Form.Control
                required
                type='text'
                value={num}
                placeholder={"Tavolo numero " + props.table.tableNumber}
                onClick={(e) => handleInputFocus("table", e, isTextVisible, setIsTextVisible)}
                onBlur={(e) => handleBlur("table", e, isTextVisible, setIsTextVisible)}
                onChange={(e) => setNum(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className='d-flex gap-3'>
            <Button onClick={handleSubmit} className='submit-btn w-100'>
              Salva <FaRegArrowAltCircleRight className='ms-auto' />
            </Button>
            <Button onClick={handleDelete} className='submit-btn w-100'>
              Elimina <FaRegArrowAltCircleRight className='ms-auto' />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditTableModal;
