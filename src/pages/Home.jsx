import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth } from '../firebase';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const user = auth.currentUser;
    const savedCart = user ? localStorage.getItem(`cartItems_${user.uid}`) : null;
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Redirect if not logged in, also clear cart if user logs out
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        setCart([]);
        navigate('/login');
      } else {
        // When user logs in, load their cart from localStorage
        const savedCart = localStorage.getItem(`cartItems_${user.uid}`);
        setCart(savedCart ? JSON.parse(savedCart) : []);
      }
    });

    fetch('http://localhost:4000/api/shopping')
      .then(res => res.json())
      .then(data => {
        setProducts(data.shopping);
        setFiltered(data.shopping);
      });

    return () => unsubscribe();
  }, [navigate]);

  // Save cart to localStorage with user-specific key
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      localStorage.setItem(`cartItems_${user.uid}`, JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const filterByCategory = (category) => {
    const result = products.filter(p => p.category === category);
    setFiltered(result);
  };

  const showAll = () => setFiltered(products);

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <>
      <Navbar cartCount={cart.length} onCartClick={goToCartPage} />

      <div className="home-container">
        <div style={{ marginBottom: '20px' }}>
          <button className="category-button" onClick={showAll}>All</button>
          <button className="category-button" onClick={() => filterByCategory("men's clothing")}>Men's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("women's clothing")}>Women's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("electronics")}>Electronics</button>
          <button className="category-button" onClick={() => filterByCategory("jewelery")}>Jewellery</button>
          <button className="category-button" onClick={() => filterByCategory("kitchen")}>Kitchen</button>
          <button className="category-button" onClick={() => filterByCategory("furniture")}>Furniture</button>


        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <h4>{product.title}</h4>
              <img src={product.image} alt={product.title} />
              <p><strong>${product.price}</strong></p>
              <p style={{ fontSize: '13px', flexGrow: 1 }}>{product.description.slice(0, 60)}...</p>
              <button className="add-button" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;

