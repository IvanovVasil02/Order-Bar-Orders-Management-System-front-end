import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TableInfoModal from "../modals/TableInfoModal";
import CreateOrderModal from "../modals/CreateOrderModal";

function OrderForm() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    setTableData(value);
    setShow(true);
  };

  const [isProductSelected, setHandleIsProductSelected] = useState(false);

  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const handleCloseCreateOrderModal = () => {
    setShowCreateOrderModal(false);
    setHandleIsProductSelected(false);
  };
  const handleShowCreateOrderModal = () => {
    setShowCreateOrderModal(true);
  };

  return (
    <>
      <h2 className='mt-5'>Aggiungi Ordine</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className='d-flex flex-column justify-content-center align-items-center mb-5'
      >
        <div className='button-container pt-3'>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 1"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 1
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 2"}
            onClick={() => handleShowCreateOrderModal()}
            className='bg-free text-gray'
          >
            Tavolo 2
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 3"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 3
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 4"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 4
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 5"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 5
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 6"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 6
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 7"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 7
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 8"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 8
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 9"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 9
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 10"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 10
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 11"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 11
          </Button>
          <Button
            variant='outline-secondary'
            data-value={"Tavolo 12"}
            onClick={(e) => handleShow(e.currentTarget.getAttribute("data-value"))}
          >
            Tavolo 12
          </Button>
        </div>

        <Button type='submit' className='mt-5'>
          Submit form
        </Button>
      </Form>

      <TableInfoModal show={show} handleClose={handleClose} data={tableData} />
      <CreateOrderModal
        showCreateOrderModal={showCreateOrderModal}
        handleCloseCreateOrderModal={handleCloseCreateOrderModal}
        setHandleIsProductSelected={setHandleIsProductSelected}
        isProductSelected={isProductSelected}
      />
    </>
  );
}

export default OrderForm;
