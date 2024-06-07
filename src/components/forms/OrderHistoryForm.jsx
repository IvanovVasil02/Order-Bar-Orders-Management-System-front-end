import { useContext, useEffect, useState } from "react";
import { clearFields, handleBlur, handleInputFocus } from "../utilities";
import { useDispatch } from "react-redux";
import { Button, Col, Form } from "react-bootstrap";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { fetchAllOrders } from "../redux/actions/ordersActions";
import { ActiveFormContext } from "../../contexts/ActiveFormContext";

const OrderHistoryForm = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [isTextVisible, setIsTextVisible] = useState({ table: { value: false, name: "Data" } });
  const { activeForm } = useContext(ActiveFormContext);
  useEffect(() => {
    if (activeForm === "orderHistory") {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // I mesi sono indicizzati a partire da 0
      const day = String(now.getDate()).padStart(2, "0");

      const todayDate = `${year}-${month}-${day}`;
      dispatch(fetchAllOrders(props.token, todayDate));
    }
  }, [activeForm, props.token, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(fetchAllOrders(props.token, date));

    setTimeout(() => {
      clearFields([setDate]);
    }, 3000);
  };

  return (
    <div>
      <Form noValidate as={Col} className='m-5 w-lg-50 d-flex flex-column  gap-4' required>
        <div className='input-container'>
          {(isTextVisible.table.value || date) && <p>Data Comande</p>}

          <Form.Group as={Col} controlId='validationCustom0232'>
            <Form.Control
              required
              type='date'
              value={date}
              onClick={(e) => handleInputFocus("table", e, isTextVisible, setIsTextVisible)}
              onBlur={(e) => handleBlur("table", e, isTextVisible, setIsTextVisible)}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </div>

        <Button onClick={handleSubmit} className='submit-btn w-100'>
          Invio <FaRegArrowAltCircleRight className='ms-auto' />
        </Button>
      </Form>
    </div>
  );
};
export default OrderHistoryForm;
