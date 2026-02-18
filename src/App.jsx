import { useState } from 'react';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

const initialProducts = [
  {
    id: 1,
    title: 'Smartphone',
    description: 'Latest model with advanced features',
    price: 699,
    stock: 15,
    imageUrl: 'https://via.placeholder.com/300x150?text=Smartphone'
  },
  {
    id: 2,
    title: 'Laptop',
    description: 'Powerful laptop for work and gaming',
    price: 1299,
    stock: 8,
    imageUrl: 'https://via.placeholder.com/300x150?text=Laptop'
  },
  {
    id: 3,
    title: 'Headphones',
    description: 'Noise-cancelling wireless headphones',
    price: 249,
    stock: 23,
    imageUrl: 'https://via.placeholder.com/300x150?text=Headphones'
  },
  {
    id: 4,
    title: 'Smartwatch',
    description: 'Fitness tracking and notifications',
    price: 199,
    stock: 12,
    imageUrl: 'https://via.placeholder.com/300x150?text=Smartwatch'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) return;

    // decrement stock
    setProducts(products.map(p =>
      p.id === productId ? { ...p, stock: p.stock - 1 } : p
    ));

    // add/increment in cart
    const existing = cartItems.find(i => i.id === productId);
    if (existing) {
      setCartItems(cartItems.map(i =>
        i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { id: product.id, title: product.title, price: product.price, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;

    // increment stock back
    setProducts(products.map(p =>
      p.id === productId ? { ...p, stock: p.stock + 1 } : p
    ));

    // decrement/remove
    if (item.quantity > 1) {
      setCartItems(cartItems.map(i =>
        i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      ));
    } else {
      setCartItems(cartItems.filter(i => i.id !== productId));
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return (
          <ProductsPage
            products={products}
            cartItems={cartItems}
            onAddToCart={addToCart}
          />
        );
      case 'profile':
        return <ProfilePage />;
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onIncrement={addToCart}
            onDecrement={removeFromCart}
          />
        );
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartItemCount={cartItemCount}
      />

      {cartItemCount > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <ShoppingCart
            cartItems={cartItems}
            variant="summary"
            onNavigateToCart={() => handleNavigate('cart')}
          />
        </div>
      )}

      <main>
        {renderPage()}
      </main>

      <footer style={{
        marginTop: '50px',
        padding: '20px',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>React Multi-Page Application</p>
      </footer>
    </div>
  );
}

export default App;
