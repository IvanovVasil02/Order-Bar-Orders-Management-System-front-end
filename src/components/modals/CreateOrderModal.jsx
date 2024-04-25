import { Button, Col, Modal, Row } from "react-bootstrap";
import ProductsCategorycard from "../cards/ProductsCategoryCard";
import bibite from "../../assets/bibite.png";
import cocktail from "../../assets/cocktail.png";
import fritti from "../../assets/fritti.png";
import hamburger from "../../assets/hamburger.png";
import sandwich from "../../assets/sandwich.png";
import doner from "../../assets/doner.png";
import { useState } from "react";
import ProductCard from "../cards/ProductCard";

const CreateOrderModal = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectProduct = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    props.setHandleIsProductSelected(true);
  };
  return (
    <>
      <Modal
        show={props.showCreateOrderModal}
        onHide={props.handleCloseCreateOrderModal}
        size='lg'
        className='overflow-hidden pb-3'
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-5'>
          <Row>
            <Col
              className={`overflow-y-scroll invisible-scrollbar ${props.isProductSelected ? "col-4" : "col-12"}`}
              style={{ maxHeight: 600 }}
            >
              <Row className={`  ${props.isProductSelected ? "flex-column" : "row-cols-2 row-cols-sm-3"}`}>
                <ProductsCategorycard
                  ctgImg={sandwich}
                  titleCategory='Panini'
                  selectProductFunction={handleSelectProduct}
                />
                <ProductsCategorycard
                  ctgImg={hamburger}
                  titleCategory='Hamburger'
                  selectProductFunction={handleSelectProduct}
                />{" "}
                <ProductsCategorycard ctgImg={doner} titleCategory='Piadine' />
                <ProductsCategorycard
                  ctgImg={fritti}
                  titleCategory='Fritti'
                  selectProductFunction={handleSelectProduct}
                />{" "}
                <ProductsCategorycard
                  ctgImg={bibite}
                  titleCategory='Bibite'
                  selectProductFunction={handleSelectProduct}
                />{" "}
                <ProductsCategorycard
                  ctgImg={cocktail}
                  titleCategory='Cocktails'
                  selectProductFunction={handleSelectProduct}
                />
              </Row>
            </Col>

            <Col
              style={{ maxHeight: 600 }}
              className={`overflow-y-scroll invisible-scrollbar ${!props.isProductSelected && "d-none"}`}
            >
              <Row className='flex-column gap-3'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleCloseCreateOrderModal}>
            Close
          </Button>
          <Button variant='primary' onClick={props.handleCloseCreateOrderModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateOrderModal;
