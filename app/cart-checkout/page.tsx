// app/cart-checkout/page.tsx
'use client'; // For useState if we were to make checkbox interactive

import { useState } from 'react';

export default function CartCheckoutPage() {
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  // Dummy cart items
  const cartItems = [
    { id: 'p1', name: 'Awesome T-Shirt (Red, L)', quantity: 1, price: 29.99 },
    { id: 'p2', name: 'Cool Cap - Black', quantity: 2, price: 15.00 },
    { id: 'p3', name: 'Generic Gadget XL', quantity: 1, price: 199.50 },
  ];

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingEstimate = cartItems.length > 0 ? 5.00 : 0; // No shipping if cart is empty
  const grandTotal = cartSubtotal + shippingEstimate;

  // Inline styles
  const pageStyle = { padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '20px auto' };
  const sectionStyle = { marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' };
  const headingStyle = { color: '#333', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' };
  const subHeadingStyle = { color: '#444', marginBottom: '15px' };
  const inputStyle = { width: 'calc(100% - 22px)', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' as const };
  const buttonStyle = { padding: '12px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' };
  const smallButtonStyle = { padding: '5px 8px', margin: '0 5px', cursor: 'pointer' };
  const cartItemStyle = { borderBottom: '1px solid #eee', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
  const formGroupStyle = { marginBottom: '15px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold' as const };


  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: 'center', color: '#222', marginBottom: '40px' }}>Shopping Cart & Checkout</h1>

      {/* Cart Items Section */}
      <section style={sectionStyle}>
        <h2 style={subHeadingStyle}>Your Cart</h2>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={cartItemStyle}>
                <div style={{ flexGrow: 1 }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>{item.name}</p>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9em' }}>Price: ${item.price.toFixed(2)}</p>
                  <p style={{ margin: '0', fontSize: '0.9em' }}>
                    Quantity: 
                    <button style={smallButtonStyle} disabled>-</button> {item.quantity} <button style={smallButtonStyle} disabled>+</button>
                  </p>
                </div>
                <div style={{ textAlign: 'right' as const }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button style={{ ...smallButtonStyle, backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }} disabled>Remove</button>
                </div>
              </div>
            ))}
            <div style={{ marginTop: '20px', textAlign: 'right' as const }}>
              <p><strong>Subtotal:</strong> ${cartSubtotal.toFixed(2)}</p>
              <p><strong>Shipping Estimate:</strong> ${shippingEstimate.toFixed(2)}</p>
              <h3 style={{ marginTop: '10px' }}>Grand Total: ${grandTotal.toFixed(2)}</h3>
            </div>
          </>
        ) : (
          <p>Your cart is currently empty.</p>
        )}
      </section>

      {/* Checkout Form Section */}
      {cartItems.length > 0 && ( // Only show checkout if cart is not empty
        <section style={sectionStyle}>
          <h2 style={subHeadingStyle}>Checkout</h2>
          <form onSubmit={(e) => e.preventDefault()} > {/* Prevent actual submission */}
            
            <h3 style={{ ...subHeadingStyle, fontSize: '1.1em', marginTop: '0' }}>Shipping Address</h3>
            <div style={formGroupStyle}>
              <label htmlFor="fullName" style={labelStyle}>Full Name</label>
              <input type="text" id="fullName" name="fullName" style={inputStyle} required />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="address1" style={labelStyle}>Address Line 1</label>
              <input type="text" id="address1" name="address1" style={inputStyle} required />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="city" style={labelStyle}>City</label>
              <input type="text" id="city" name="city" style={inputStyle} required />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="postalCode" style={labelStyle}>Postal Code</label>
              <input type="text" id="postalCode" name="postalCode" style={inputStyle} required />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="country" style={labelStyle}>Country</label>
              <input type="text" id="country" name="country" style={inputStyle} required />
            </div>

            <h3 style={{ ...subHeadingStyle, fontSize: '1.1em', marginTop: '30px' }}>Billing Address</h3>
            <div style={{ ...formGroupStyle, display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                id="billingSame" 
                name="billingSame" 
                checked={billingSameAsShipping} 
                onChange={(e) => setBillingSameAsShipping(e.target.checked)} 
                style={{ marginRight: '10px' }}
              />
              <label htmlFor="billingSame" style={{ ...labelStyle, marginBottom: '0' }}>Same as shipping address</label>
            </div>

            {!billingSameAsShipping && (
              <>
                {/* Billing address fields would go here, similar to shipping */}
                <p style={{ fontStyle: 'italic', color: '#666' }}>(Billing address fields would appear here if different)</p>
              </>
            )}

            <h3 style={{ ...subHeadingStyle, fontSize: '1.1em', marginTop: '30px' }}>Payment Information</h3>
            <div style={{ border: '1px dashed #ccc', padding: '15px', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Card Number:</p>
              <p style={{ color: '#777', fontStyle: 'italic' }}> (Placeholder: Actual card input fields are not implemented for security reasons)</p>
              <p style={{ margin: '10px 0 10px 0', fontWeight: 'bold' }}>Expiry Date (MM/YY):</p>
              <p style={{ margin: '10px 0 0 0', fontWeight: 'bold' }}>CVV:</p>
            </div>
            
            <button type="submit" style={{ ...buttonStyle, marginTop: '30px', width: '100%', backgroundColor: '#28a745' }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </form>
        </section>
      )}

      {/* Request a Quote Section */}
      <section style={{ ...sectionStyle, borderBottom: 'none', textAlign: 'center' as const }}>
        <h2 style={subHeadingStyle}>Need a Custom Quote?</h2>
        <p style={{ marginBottom: '15px' }}>For bulk orders or special requirements, please request a quote.</p>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#17a2b8' }}
          onClick={() => alert('Redirecting to quote request page... (placeholder)')} // Placeholder action
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#138496')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#17a2b8')}
        >
          Request a Quote
        </button>
      </section>
    </div>
  );
}
