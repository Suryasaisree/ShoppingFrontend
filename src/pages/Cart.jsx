import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const location = useLocation();

  // Load initial cart and ensure quantity is at least 1
  const initialCartRaw = location.state?.cart || JSON.parse(localStorage.getItem('cartItems')) || [];
  const initialCart = initialCartRaw.map(item => ({
    ...item,
    quantity: item.quantity || 1,
  }));

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const handleIncrease = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const handleDecrease = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1); // Remove item if quantity is 1
    }
    setCart(newCart);
  };

  const handleRemove = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Cart Page</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">No items in the cart.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={item.id || index}>
              <div className="cart-item-left">
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleDecrease(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(index)}>+</button>
                  </div>
                </div>
              </div>
              <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ${calculateTotal()}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
