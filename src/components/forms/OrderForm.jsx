import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/actions/productActions";
import Table from "../Table";
import { fetchAllTables } from "../redux/actions/tablesActions";
import { Row } from "react-bootstrap";

function OrderForm() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);

  useEffect(() => {
    dispatch(fetchAllProducts(token));
    dispatch(fetchAllTables(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tables = useSelector((state) => state.tables.tableList);

  return (
    <>
      <h2 className='mt-5'>Aggiungi Ordine</h2>

      <Row className='button-container pt-3 row-cols-3'>
        {tables && tables.map((table, index) => <Table key={index} table={table} />)}
      </Row>
    </>
  );
}

export default OrderForm;
