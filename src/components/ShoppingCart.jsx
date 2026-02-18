import Button from './Button';

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function getTotals(cartItems) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
}

/**
 * Reusable shopping cart component.
 * Props:
 * - cartItems: [{ id, title, price, quantity }]
 * - onIncrement(id): add one
 * - onDecrement(id): remove one
 * - variant: 'summary' | 'full'
 * - onNavigateToCart(): optional (used by summary)
 */
function ShoppingCart({
  cartItems = [],
  onIncrement,
  onDecrement,
  variant = 'full',
  onNavigateToCart
}) {
  const { totalItems, totalPrice } = getTotals(cartItems);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{
        padding: '12px 15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <strong>Shopping Cart</strong>
        <p style={{ margin: '8px 0 0 0' }}>Your cart is empty</p>
      </div>
    );
  }

  if (variant === 'summary') {
    return (
      <div style={{
        padding: '12px 15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <div>
          <strong>Cart:</strong> {totalItems} item{totalItems === 1 ? '' : 's'} • {formatMoney(totalPrice)}
        </div>

        {typeof onNavigateToCart === 'function' && (
          <Button variant="primary" onClick={onNavigateToCart}>
            View Cart
          </Button>
        )}
      </div>
    );
  }

  // Full cart UI
  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    }}>
      <h3 style={{ marginTop: 0 }}>Shopping Cart</h3>

      <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
        {cartItems.map(item => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #ddd',
              gap: '12px'
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{item.title}</strong>
              <div style={{ color: '#666', marginTop: '2px' }}>
                {item.quantity} × {formatMoney(item.price)} = {formatMoney(item.price * item.quantity)}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button
                variant="secondary"
                onClick={() => onIncrement && onIncrement(item.id)}
                disabled={!onIncrement}
                style={{ minWidth: '44px' }}
              >
                +
              </Button>

              <Button
                variant="danger"
                onClick={() => onDecrement && onDecrement(item.id)}
                disabled={!onDecrement}
                style={{ minWidth: '44px' }}
              >
                −
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{
        marginTop: '15px',
        paddingTop: '10px',
        borderTop: '2px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <strong>Total:</strong>
        <strong>{formatMoney(totalPrice)}</strong>
      </div>

      <Button
        onClick={() => alert(`Checkout completed for ${formatMoney(totalPrice)}!`)}
        variant="success"
        style={{ width: '100%', marginTop: '10px' }}
      >
        Checkout
      </Button>
    </div>
  );
}

export default ShoppingCart;
