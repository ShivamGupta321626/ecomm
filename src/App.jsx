import React, { useState } from 'react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // "signin" or "register"
  
  // Auth states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Cart states
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [
    { id: 1, name: "All Categories", icon: "📦", desc: "View all available items" },
    { id: 2, name: "Household & Cleaning", icon: "🧹", desc: "Cleaners, Mops, Dustbins" },
    { id: 3, name: "Stationery & Files", icon: "📚", desc: "Pens, Notebooks, Files" },
    { id: 4, name: "Industrial Safety", icon: "🛡️", desc: "Helmets, Gloves, Safety" },
    { id: 5, name: "Xerox & Print", icon: "🖨️", desc: "Papers, Printing Material" },
  ];

  const products = [
    { id: 1, name: "Durable Broom and Mop Set Sbonet", rating: "★★★★★", priceText: "₹299", priceVal: 299, category: "Household & Cleaning" },
    { id: 2, name: "Advanced Floor Cleaner Liquid (5L)", rating: "★★★★☆", priceText: "₹399", priceVal: 399, category: "Household & Cleaning" },
    { id: 3, name: "Heavy Duty Dishwashing Liquid & Scrub", rating: "★★★★★", priceText: "₹149", priceVal: 149, category: "Household & Cleaning" },
    { id: 4, name: "Plastic Dustbin with Paddle Mechanism", rating: "★★★★☆", priceText: "₹349", priceVal: 349, category: "Household & Cleaning" },
    { id: 5, name: "Fountain Pen for Fine Detailed", rating: "★★★★☆", priceText: "₹299", priceVal: 299, category: "Stationery & Files" },
    { id: 6, name: "High-Quality Notebooks (Pack of 4)", rating: "★★★★★", priceText: "₹299", priceVal: 299, category: "Stationery & Files" },
    { id: 7, name: "Ring Binders or Ring Binders Board", rating: "★★★★☆", priceText: "₹299", priceVal: 299, category: "Stationery & Files" },
    { id: 8, name: "Industrial Safety Helmet & Gloves", rating: "★★★★☆", priceText: "₹299", priceVal: 299, category: "Industrial Safety" },
    { id: 9, name: "A4 Xerox Paper Rim (75 GSM)", rating: "★★★★★", priceText: "₹350", priceVal: 350, category: "Xerox & Print" },
  ];

  const filteredProducts = selectedCategory === "All Categories" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Add to Cart Function
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} added to cart!`);
  };

  // Update Quantity in Cart
  const updateQuantity = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Cart Totals calculation
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalAmount = cart.reduce((sum, item) => sum + (item.priceVal * item.quantity), 0);
  const deliveryFee = subtotalAmount >= 600 || subtotalAmount === 0 ? 0 : 50;
  const grandTotal = subtotalAmount + deliveryFee;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === "register") {
      if (!name || !email || !password) {
        alert("Please fill all fields!");
        return;
      }
      setCurrentUser(name);
      alert("Registration Successful!");
    } else {
      if (!email || !password) {
        alert("Please enter email and password!");
        return;
      }
      const userName = email.split('@')[0];
      setCurrentUser(userName.charAt(0).toUpperCase() + userName.slice(1));
      alert("Sign In Successful!");
    }
    setIsAuthOpen(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    alert("Logged out successfully!");
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0, padding: 0, width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: '#0284c7', color: 'white', textAlign: 'center', padding: '8px', fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px' }}>
        ✨ Get Free Delivery On Purchase of ₹600 + Extra 10% Off on Bulk Orders!
      </div>

      {/* Professional Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setSelectedCategory("All Categories")}>
          <div style={{ width: '42px', height: '42px', backgroundColor: '#0f172a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.2)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 5 9 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 9 12 2 12 2Z" fill="url(#logo_grad)" />
              <path d="M12 6V16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="14" r="1.5" fill="white"/>
              <defs>
                <linearGradient id="logo_grad" x1="5" y1="2" x2="19" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563eb" />
                  <stop offset="1" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px' }}>Shivam Stationery Mart</h1>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Premium Office & School Supplies</span>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ width: '35%', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search items, pens, notebooks..." 
            style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '9999px', padding: '10px 20px', fontSize: '14px', outline: 'none', backgroundColor: '#f8fafc' }}
          />
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
          <div>
            {currentUser ? (
              <div>
                <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold', margin: 0 }}>Hello, {currentUser}</p>
                <p onClick={handleLogout} style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600', margin: 0, cursor: 'pointer', textDecoration: 'underline' }}>Log Out</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>New Customer?</p>
                <p 
                  onClick={() => { setAuthMode("register"); setIsAuthOpen(true); }} 
                  style={{ fontWeight: 'bold', color: '#2563eb', margin: 0, cursor: 'pointer', display: 'inline-block' }}
                >
                  Register
                </p>
                <span style={{ color: '#cbd5e1', margin: '0 4px' }}>|</span>
                <p 
                  onClick={() => { setAuthMode("signin"); setIsAuthOpen(true); }} 
                  style={{ fontWeight: 'bold', color: '#0f172a', margin: 0, cursor: 'pointer', display: 'inline-block' }}
                >
                  Sign In
                </p>
              </div>
            )}
          </div>
          
          {/* Cart Button */}
          <div 
            onClick={() => setIsCartOpen(true)}
            style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '8px 18px', borderRadius: '9999px', cursor: 'pointer', border: '1px solid #e2e8f0' }}
          >
            <span style={{ fontWeight: '600', color: '#0f172a' }}>🛒 My Cart</span>
            <span style={{ marginLeft: '8px', backgroundColor: '#ef4444', color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '2px 7px', borderRadius: '9999px' }}>
              {totalItemsCount}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        
        {/* Category Cards Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>EXPLORE BY CATEGORIES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => setSelectedCategory(cat.name)}
                style={{ 
                  backgroundColor: selectedCategory === cat.name ? '#eff6ff' : 'white', 
                  border: selectedCategory === cat.name ? '2px solid #2563eb' : '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '18px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>{cat.name}</h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.3px' }}>
            {selectedCategory === "All Categories" ? "FEATURED PRODUCTS & DEALS" : `${selectedCategory}`}
          </h2>
          {selectedCategory !== "All Categories" && (
            <span onClick={() => setSelectedCategory("All Categories")} style={{ color: '#2563eb', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>View All Products</span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div>
                  <div style={{ height: '140px', backgroundColor: '#f1f5f9', borderRadius: '8px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '13px', fontWeight: '500' }}>
                    [ {product.category} ]
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px', minHeight: '40px', lineHeight: '1.4' }}>{product.name}</h3>
                  <p style={{ color: '#eab308', fontSize: '14px', margin: '0 0 8px 0', letterSpacing: '2px' }}>{product.rating}</p>
                  <p style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px 0' }}>{product.priceText}</p>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: '#64748b', fontSize: '14px' }}>No products found in this category.</p>
          )}
        </div>
      </main>

      {/* Professional Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', padding: '40px 32px 20px 32px', marginTop: '60px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '30px' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Shivam Stationery Mart</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#94a3b8', margin: 0 }}>
              Your trusted destination for high-quality school supplies, office stationery, cleaning essentials, and industrial safety materials.
            </p>
          </div>
          <div>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Quick Categories</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', lineHeight: '2', color: '#94a3b8' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory("Household & Cleaning")}>Household & Cleaning</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory("Stationery & Files")}>Stationery & Files</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory("Industrial Safety")}>Industrial Safety</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory("Xerox & Print")}>Xerox & Print</li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Contact Us</h3>
            <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#94a3b8' }}>
              <p style={{ margin: '0 0 6px 0' }}>📍 Address: Main Market, Your City, India</p>
              <p style={{ margin: '0 0 6px 0' }}>📞 Phone: +91 98765 43210</p>
              <p style={{ margin: '0 0 6px 0' }}>✉️ Email: support@shivamstationery.com</p>
              <p style={{ margin: 0 }}>⏰ Timing: Mon - Sat (9:00 AM - 8:00 PM)</p>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
          © 2026 Shivam Stationery Mart. All Rights Reserved. Designed with React.
        </div>
      </footer>

      {/* Cart Summary & Bill Modal */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative', boxSizing: 'border-box' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Your Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            {/* Cart Items List */}
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px', marginBottom: '16px' }}>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px 0' }}>{item.name}</h4>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{item.priceText} × {item.quantity}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ backgroundColor: '#e2e8f0', border: 'none', width: '26px', height: '26px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                      <span style={{ fontSize: '14px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ backgroundColor: '#e2e8f0', border: 'none', width: '26px', height: '26px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                  <p style={{ fontSize: '32px', margin: '0 0 10px 0' }}>🛒</p>
                  <p style={{ fontSize: '14px', margin: 0 }}>Your cart is empty!</p>
                </div>
              )}
            </div>

            {/* Bill Summary Section */}
            {cart.length > 0 && (
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '6px' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotalAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '8px' }}>
                  <span>Delivery Fee {subtotalAmount >= 600 && <span style={{ color: '#16a34a', fontSize: '11px' }}>(Free above ₹600)</span>}</span>
                  <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '800', color: '#0f172a', borderTop: '1px solid #cbd5e1', paddingTop: '8px' }}>
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            {cart.length > 0 && (
              <button 
                onClick={() => { alert(`Order placed successfully! Total Amount: ₹${grandTotal}`); setCart([]); setIsCartOpen(false); }}
                style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' }}
              >
                Proceed to Checkout (₹{grandTotal})
              </button>
            )}

          </div>
        </div>
      )}

      {/* Auth Modal Popup */}
      {isAuthOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative', boxSizing: 'border-box' }}>
            <button onClick={() => setIsAuthOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>✕</button>

            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>
              {authMode === "signin" ? "Welcome Back!" : "Create Account"}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginBottom: '24px' }}>
              {authMode === "signin" ? "Please sign in to continue shopping" : "Register to get exclusive bulk discounts"}
            </p>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {authMode === "register" && (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              )}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '8px' }}>
                {authMode === "signin" ? "Sign In" : "Register Now"}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
              {authMode === "signin" ? (
                <p>Don't have an account? <span onClick={() => setAuthMode("register")} style={{ color: '#2563eb', fontWeight: '700', cursor: 'pointer' }}>Register</span></p>
              ) : (
                <p>Already have an account? <span onClick={() => setAuthMode("signin")} style={{ color: '#2563eb', fontWeight: '700', cursor: 'pointer' }}>Sign In</span></p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}