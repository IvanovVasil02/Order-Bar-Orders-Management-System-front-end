import { useSelector } from "react-redux";
import OrderHistoryForm from "../forms/OrderHistoryForm";
import OrderList from "../itemList/OrderList";

const OrderHistoryPage = (props) => {
  const token = useSelector((state) => state.main.savedToken);
  const orders = useSelector((state) => state.orders.orderList.content);

  return (
    <div className={`text-center ${props.isVisible ? "d-block" : "d-none"}`}>
      <h2 className='pt-5'>Storico comande</h2>

      <div className='d-flex justify-content-center'>
        <OrderHistoryForm token={token} />
      </div>
      {orders && <OrderList orders={orders} />}
    </div>
  );
};

export default OrderHistoryPage;
