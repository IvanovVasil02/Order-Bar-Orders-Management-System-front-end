import { Button, CloseButton, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { HiOutlineBars3 } from "react-icons/hi2";
import Sidebar from "../Sidebar";
import OrderForm from "./forms/OrderForm";
import { useContext, useState } from "react";
import ProductForm from "./mainPages/ProductsPage";
import OrderHistoryPage from "./mainPages/OrderHistoryPage";
import { ActiveFormContext } from "../contexts/ActiveFormContext";
import IngredientsPage from "./mainPages/IngredientsPage";
import TablesPage from "./mainPages/TablesPage";
import Login from "./login/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/actions/authenticationActions";

const Main = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { activeForm, handleSelectForm } = useContext(ActiveFormContext);
  const token = useSelector((state) => state.main.savedToken);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("main");
    dispatch(logout());
  };

  return (
    <>
      <Container fluid>
        <Row className='flex-row'>
          {" "}
          {token ? (
            <>
              <Sidebar activeForm={activeForm} handleSelectForm={handleSelectForm} />
              <Col className='d-flex flex-column justify-content-center p-md-5'>
                <IngredientsPage isVisible={activeForm === "ingredientForm"} />
                <ProductForm isVisible={activeForm === "productForm"} />
                <TablesPage isVisible={activeForm === "tableForm"} />
                <OrderForm isVisible={activeForm === "orderForm"} />{" "}
                <OrderHistoryPage isVisible={activeForm === "orderHistory"} />
              </Col>
              <HiOutlineBars3 className='toggle-btn shadow-lg d-lg-none' onClick={handleShow} />
              <Offcanvas show={show} onHide={handleClose} className='min-vh-100'>
                <Offcanvas.Body className='p-0'>
                  <div className='sticky-top d-flex flex-column align-items-center min-vh-100' id='nav-btn-cont'>
                    <h2>OrderEase</h2>
                    <div className='d-flex flex-column mt-4'>
                      <Button className='pointer' onClick={() => handleSelectForm("ingredientForm")}>
                        Ingredienti
                      </Button>
                      <Button className='pointer' onClick={() => handleSelectForm("productForm")}>
                        Prodotti
                      </Button>
                      <Button className='pointer' onClick={() => handleSelectForm("tableForm")}>
                        Tavoli
                      </Button>
                      <Button className='pointer' onClick={() => handleSelectForm("orderForm")}>
                        Ordini
                      </Button>
                      <Button className='pointer' onClick={() => handleSelectForm("orderHistory")}>
                        Storico
                      </Button>
                      <Button className='pointer' onClick={() => handleLogout()}>
                        Lougout
                      </Button>
                    </div>
                    <div className='d-flex align-items-center position-absolute bottom-0'>
                      <CloseButton onClick={handleClose} />
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          ) : (
            <Login />
          )}
        </Row>
      </Container>
    </>
  );
};
export default Main;
