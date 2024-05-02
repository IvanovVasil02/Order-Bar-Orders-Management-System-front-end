import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const ProductBillRow = (props) => {
  return (
    <>
      <tr className='pointer td-bg'>
        <td>{props.product.quantity}</td>
        <td>{props.product.name}</td>
        <td>{props.product.price}€</td>
        <td>
          <IoIosAddCircleOutline className='fs-1' onClick={props.addFunction} />
        </td>
        <td>
          <IoIosRemoveCircleOutline className='fs-1' onClick={props.removeFunction} />
        </td>
      </tr>
    </>
  );
};
export default ProductBillRow;
