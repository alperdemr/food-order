import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  if(action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price + action.item.amount;
    return {
      items : updatedItems,
      totalAmount : updatedTotalAmount
    };
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispacthCartAction] = useReducer(
    cardReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispacthCartAction({type: "ADD", item:item})
  };

  const removeItemFromCartHandler = (id) => {
    dispacthCartAction({type: "REMOVE", id:id})
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
