import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";

const ProductBillRow = (props) => {
  return (
    <>
      <tr className='pointer td-bg'>
        <td>
          {props.product.quantity} {props.product.paidQuantity > 0 && `(${props.product.paidQuantity})`}
        </td>
        <td>{props.product.name}</td>
        <td>{props.product.price}€</td>
        {props.editable && (
          <>
            <td>
              <LuPlus className='fs-1 modal-btn shadow-sm' onClick={props.addFunction} />
            </td>
            <td>
              <LuMinus className='fs-1  modal-btn shadow-sm' onClick={props.removeFunction} />
            </td>
          </>
        )}
      </tr>
    </>
  );
};
export default ProductBillRow;
