import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
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
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { FiArrowRightCircle } from "react-icons/fi";

const Main = () => {
  const dispatch = useDispatch();
  const { activeForm, handleSelectForm, show, handleShow, handleClose } = useContext(ActiveFormContext);
  const token = useSelector((state) => state.main.savedToken);

  const handleLogout = () => {
    localStorage.removeItem("main");
    dispatch(logout());
  };

  const [style, api] = useSpring(() => ({ x: show ? 0 : -100, opacity: show ? 1 : 0 }));

  const [touchAction, setTouchAction] = useState("auto");

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    // Rileva il movimento da sinistra verso destra per aprire l'Offcanvas

    if (mx > 10) {
      setTouchAction("none");
      handleShow();
    } else {
      setTouchAction("auto");
    }

    // Rileva il movimento sopra l'Offcanvas per chiuderlo
    if (mx < -5) {
      handleClose();
    }

    // Aggiorna lo stile in base al movimento
    api.start({ x: down ? mx : show ? 0 : -100, opacity: down ? 1 : show ? 1 : 0 });
  });

  return (
    <Container fluid {...bind()} style={{ touchAction: touchAction }}>
      <Row className='flex-row'>
        {token ? (
          <>
            <Sidebar activeForm={activeForm} handleSelectForm={handleSelectForm} />
            <Col className='d-flex flex-column justify-content-center p-md-5'>
              <IngredientsPage isVisible={activeForm === "ingredientForm"} />
              <ProductForm isVisible={activeForm === "productForm"} />
              <TablesPage isVisible={activeForm === "tableForm"} />
              <OrderForm isVisible={activeForm === "orderForm"} />
              <OrderHistoryPage isVisible={activeForm === "orderHistory"} />
            </Col>
            <animated.div style={style}>
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
                      <Button className='pointer' onClick={handleLogout}>
                        Logout
                      </Button>
                      <Button className='pointer fs-1' onClick={() => handleClose()}>
                        <FiArrowRightCircle />
                      </Button>
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </animated.div>
          </>
        ) : (
          <Login />
        )}
      </Row>
    </Container>
  );
};

export default Main;
