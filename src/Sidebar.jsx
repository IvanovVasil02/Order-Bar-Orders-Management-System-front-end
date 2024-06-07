import { Button, Col, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "./components/redux/actions/authenticationActions";

const Sidebar = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Col sm={2} className='p-0 bg-success d-none d-lg-block'>
        <Nav className='shadow-lg z-3 bg-white d-flex flex-column min-vh-100 h-100 w-100 col-10 col-md-2'>
          <div className='sticky-top d-flex flex-column align-items-center min-vh-100' id='nav-btn-cont'>
            <h2>OrderEase</h2>
            <div className='d-flex flex-column mt-4'>
              <Button className='pointer' onClick={() => props.handleSelectForm("ingredientForm")}>
                Ingredienti
              </Button>
              <Button className='pointer' onClick={() => props.handleSelectForm("productForm")}>
                Prodotti
              </Button>
              <Button className='pointer' onClick={() => props.handleSelectForm("tableForm")}>
                Tavoli
              </Button>
              <Button className='pointer' onClick={() => props.handleSelectForm("orderForm")}>
                Ordini
              </Button>
              <Button className='pointer' onClick={() => props.handleSelectForm("orderHistory")}>
                Storico
              </Button>
            </div>
            <Button className='pointer mt-auto' onClick={handleLogout}>
              Lougout
            </Button>
          </div>
        </Nav>
      </Col>
    </>
  );
};
export default Sidebar;
