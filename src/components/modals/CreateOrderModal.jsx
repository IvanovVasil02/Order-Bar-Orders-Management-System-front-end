import { Button, Col, Modal, Row } from "react-bootstrap";
import ProductsCategorycard from "../cards/ProductsCategoryCard";
import bibite from "../../assets/bibite.png";
import cibi_caldi from "../../assets/cibi_caldi.png";
import fritti from "../../assets/fritti.png";
import hamburger from "../../assets/hamburger.png";
import sandwich from "../../assets/sandwich.png";
import doner from "../../assets/doner.png";
import juices from "../../assets/succhi.png";
import sodas from "../../assets/soda.png";
import tea from "../../assets/tea.png";
import cocktail from "../../assets/cocktail.png";
import water from "../../assets/water.png";
import coffee from "../../assets/coffee.png";
import beer from "../../assets/beer.png";
import mocktails from "../../assets/mocktails.png";

import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { productCardSpawner } from "../utilities";
import DinnerBill from "./DinnerBill";
import { saveOrder } from "../redux/actions/ordersActions";

const CreateOrderModal = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);
  const productList = useSelector((state) => state.products.productList);

  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const hotDishesCtg = [
    { name: "Panini", category: "SANDWICH", img: sandwich },
    { name: "Hamburger", category: "HAMBURGER", img: hamburger },
    { name: "Piadine", category: "DONER", img: doner },
    { name: "Fritti", category: "FRIED", img: fritti },
  ];
  const drinksCtg = [
    { name: "Succhi", category: "JUICES", img: juices },
    { name: "Gassate", category: "HAMBURGER", img: sodas },
    { name: "Té", category: "TEA", img: tea },
    { name: "Birre", category: "BEER", img: beer },
    { name: "Cocktails", category: "COCKTAILS", img: cocktail },
    { name: "Mocktails", category: "MOCKTAILS", img: mocktails },
    { name: "Acqua", category: "WATER", img: water },
    { name: "coffee", category: "COFEE", img: coffee },
  ];

  const [order, setOrder] = useState({
    tableId: props.table.table_id,
    note: "",
    productList: [],
    totalPrice: 0,
    remainingToPay: 0,
  });

  useEffect(() => {
    if (props.table.order) {
      const updatedOrder = [];
      props.table.order.productList.map((product) =>
        updatedOrder.push({
          id: product.id,
          quantity: product.quantity,
          name: product.name,
          price: product.price,
          paidQuantity: product.paidQuantity,
        })
      );
      setOrder({
        ...order,
        productList: updatedOrder,
        totalPrice: props.table.order.totalPrice,
        remainingToPay: props.table.order.remainingToPay,
      });
    }
  }, [props.table]);

  const handleAddToOrder = (value) => {
    const productObject = { id: value.id, quantity: 1, name: value.name, price: value.price };

    const existingProductIndex = order.productList.findIndex((item) => item.id === value.id);

    if (existingProductIndex !== -1) {
      const updatedOrder = order.productList.map((product, index) =>
        index === existingProductIndex ? { ...product, quantity: product.quantity + 1 } : product
      );

      setOrder({
        ...order,
        productList: updatedOrder,
        totalPrice: calcAmount(value),
        remainingToPay: calcAmount() + value.price,
      });
    } else {
      setOrder({
        ...order,
        productList: [...order.productList, productObject],
        totalPrice: calcAmount(value),
        remainingToPay: calcAmount(),
      });
    }
  };

  const handleRemoveFromOrder = (idToRemove) => {
    const existingProductIndex = order.productList.findIndex((item) => item.id === idToRemove);

    if (existingProductIndex != -1) {
      const updatedOrder = order.productList
        .map((product) => (product.id === idToRemove ? { ...product, quantity: product.quantity - 1 } : product))
        .filter((product) => product.quantity > 0);

      setOrder({
        ...order,
        productList: updatedOrder,
        totalPrice: order.totalPrice,
        remainingToPay: calcAmount() - order.productList[existingProductIndex].price,
      });
    }
  };

  const calcAmount = (product) => {
    if (product) {
      let totalAmount =
        order.productList.reduce((acc, elm) => {
          return acc + elm.price * elm.quantity;
        }, 0) + product.price;
      return totalAmount;
    } else {
      return order.productList.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
    }
  };

  const getQuantityProduct = (value) => {
    const foundProduct = order.productList.find((product) => product.id === value);
    if (foundProduct != null) {
      return foundProduct.quantity;
    } else {
      return 0;
    }
  };

  const handleSaveOrder = () => {
    dispatch(saveOrder(props.table.table_id, "note", order, token));
  };

  const handleSelectCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    // props.setHandleIsProductSelected(true);
  };

  const handleSelectSubCategory = (selectedCategory) => {
    setSelectedSubCategory(selectedCategory);
    props.setHandleIsProductSelected(true);
  };

  const handleCloseModal = () => {
    props.handleCloseCreateOrderModal();
    setSelectedCategory("");
  };

  const goBack = () => {
    if (selectedCategory && selectedSubCategory) {
      props.setHandleIsProductSelected(false);
      setSelectedSubCategory("");
    }
    setSelectedCategory("");
  };

  const [showBill, setShowbill] = useState(false);
  const handleShowBill = () => {
    setShowbill(true);
  };
  const handleCloseBill = () => {
    setShowbill(false);
  };

  return (
    <>
      <Modal show={props.showCreateOrderModal} onHide={handleCloseModal} size='lg' className=' pb-3'>
        <Modal.Header>
          <Modal.Title>Tavolo N° {props.table.tableNumber}</Modal.Title>
          <IoIosAddCircleOutline className='fs-1 ms-auto pointer' onClick={handleCloseBill} />
          <MdOutlinePlaylistAddCheckCircle className='fs-1 ms-2 pointer' onClick={handleShowBill} />
          <IoIosCloseCircleOutline className='fs-1 ms-2 pointer' onClick={props.handleCloseCreateOrderModal} />
        </Modal.Header>
        <Modal.Body className='pb-5'>
          {!showBill && (
            <Row>
              <Col
                className={`overflow-y-scroll invisible-scrollbar ${props.isProductSelected ? "col-4" : "col-12"}`}
                style={{ maxHeight: 600 }}
              >
                <Row
                  className={`${selectedCategory && "d-none"}  ${
                    props.isProductSelected ? "flex-column" : "row-cols-2 "
                  }`}
                >
                  <ProductsCategorycard
                    ctgImg={cibi_caldi}
                    titleCategory='Cibi caldi'
                    selectProductFunction={handleSelectCategory}
                    category='HOT_DISHES'
                    padding='5'
                  />
                  <ProductsCategorycard
                    ctgImg={bibite}
                    titleCategory='Da bere'
                    selectProductFunction={handleSelectCategory}
                    category='DRINK'
                    padding='5'
                  />{" "}
                </Row>
                {/* HOT DISHES */}
                <Row
                  className={`${selectedCategory !== "HOT_DISHES" && "d-none"} ${
                    props.isProductSelected ? "flex-column" : "row-cols-2 row-cols-lg-4 "
                  }`}
                >
                  {hotDishesCtg.map((ctg, index) => (
                    <ProductsCategorycard
                      key={index}
                      ctgImg={ctg.img}
                      titleCategory={ctg.name}
                      selectProductFunction={handleSelectSubCategory}
                      category={ctg.category}
                      selectedSubCategory={selectedSubCategory}
                    />
                  ))}
                </Row>{" "}
                {/* DRINKS */}
                <Row
                  className={`${selectedCategory !== "DRINK" && "d-none"} ${
                    props.isProductSelected ? "flex-column" : "row-cols-2 row-cols-lg-4 "
                  }`}
                >
                  {drinksCtg.map((ctg, index) => (
                    <ProductsCategorycard
                      key={index}
                      ctgImg={ctg.img}
                      titleCategory={ctg.category}
                      selectProductFunction={handleSelectSubCategory}
                      category={ctg.category}
                      selectedSubCategory={selectedSubCategory}
                    />
                  ))}
                </Row>
              </Col>

              <Col
                style={{ maxHeight: 600 }}
                className={`overflow-y-scroll invisible-scrollbar ${!props.isProductSelected && "d-none"}`}
              >
                {productList && (
                  <Row className='flex-column gap-3'>
                    {productCardSpawner(
                      productList,
                      selectedSubCategory,
                      handleAddToOrder,
                      handleRemoveFromOrder,
                      getQuantityProduct
                    )}
                  </Row>
                )}
              </Col>
            </Row>
          )}

          <Row>
            {order && showBill && (
              <DinnerBill
                data={order}
                handleCloseBill={handleCloseBill}
                handleAddToOrder={handleAddToOrder}
                handleRemoveFromOrder={handleRemoveFromOrder}
              />
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <IoIosArrowDropleft className='me-auto fs-1 pointer' onClick={() => goBack()} />
          <Button className='submit-btn fs-5 p-1' onClick={props.handleCloseCreateOrderModal}>
            Close
          </Button>
          <Button className='submit-btn fs-5 p-1' onClick={handleSaveOrder}>
            Salva ordine
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateOrderModal;
