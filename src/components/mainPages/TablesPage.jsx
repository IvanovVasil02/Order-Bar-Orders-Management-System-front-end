import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllTables } from "../redux/actions/tablesActions";
import Table from "../Table";
import TableForm from "../forms/TableForm";

const TablesPage = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);

  useEffect(() => {
    dispatch(fetchAllTables(token));
  }, [dispatch, token]);

  const tables = useSelector((state) => state.tables.tableList);

  return (
    <div className={`text-center ${props.isVisible ? "d-block" : "d-none"}`}>
      <h2>Creia Tavoli</h2>
      <div className='d-flex justify-content-center'>
        <TableForm />
      </div>
      <div className='button-container pt-3 row-cols-3 w-100'>
        {tables && tables.map((table, index) => <Table key={index} table={table} editable={false} />)}
      </div>
    </div>
  );
};
export default TablesPage;
