import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/actions/productActions";
import Table from "../Table";
import { fetchAllTables } from "../redux/actions/tablesActions";
import { Row } from "react-bootstrap";

function OrderForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);

  useEffect(() => {
    dispatch(fetchAllProducts(token));
    dispatch(fetchAllTables(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tables = useSelector((state) => state.tables.tableList);

  return (
    <div className={`text-center ${props.isVisible ? "d-block" : "d-none"}`}>
      <h2 className='my-5'>Aggiungi Ordine</h2>

      <Row className='button-container pt-3 row-cols-3 w-100'>
        {tables && tables.map((table, index) => <Table key={index} table={table} editable={true} />)}
      </Row>
    </div>
  );
}

export default OrderForm;
