import ShoppingCart from '../components/ShoppingCart';

function CartPage({ cartItems, onIncrement, onDecrement }) {
  const isEmpty = !cartItems || cartItems.length === 0;

  return (
    <div>
      <h1>Cart Page</h1>
      {isEmpty ? (
        <p>Your cart is empty. Add some products to see them here.</p>
      ) : (
        <ShoppingCart
          cartItems={cartItems}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          variant="full"
        />
      )}
    </div>
  );
}

export default CartPage;
