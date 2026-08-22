import React, { useState } from 'react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  
  // Auth states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Cart, Checkout & Payment states
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  
  // Payment Gateway Specific States
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  // Shipping form states
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      setShippingName(name);
      alert("Registration Successful!");
    } else {
      if (!email || !password) {
        alert("Please enter email and password!");
        return;
      }
      const userName = email.split('@')[0];
      const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
      setCurrentUser(formattedName);
      setShippingName(formattedName);
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

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress || !shippingPhone) {
      alert("Please fill in all delivery details!");
      return;
    }
    setIsCheckoutOpen(false);
    setIsPaymentOpen(true);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (paymentMethod === 'upi' && !upiId) {
      alert("Please enter a valid UPI ID (e.g. username@oksbi)");
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert("Please fill all card details correctly!");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentOpen(false);
      
      const orderDetails = {
        orderId: "SSM-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        name: shippingName,
        address: shippingAddress,
        phone: shippingPhone,
        items: [...cart],
        total: grandTotal,
        method: paymentMethod.toUpperCase()
      };

      setSuccessOrder(orderDetails);
      setCart([]);
      setUpiId("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
    }, 2500);
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', minHeight: '100vh', margin: 0, padding: 0, width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
      
      <style>{`
        @keyframes meshMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .professional-bg {
          background-color: #f8fafc;
          background-image: 
            radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(14, 165, 233, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.06) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.06) 0px, transparent 50%);
          background-size: 200% 200%;
          animation: meshMove 15s ease infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        @keyframes slideFromTop {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideFromBottom {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .anim-top { animation: slideFromTop 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-left { animation: slideFromLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-right { animation: slideFromRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-bottom { animation: slideFromBottom 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.04);
          border-color: #cbd5e1;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <div className="professional-bg" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        
        <div className="anim-top" style={{ backgroundColor: '#0f172a', color: '#f8fafc', textAlign: 'center', padding: '10px', fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px' }}>
          ✨ Special Offer: Get Free Delivery on Orders Above ₹600 + Extra 10% Off on Bulk Orders!
        </div>

        <header className="anim-top glass-card" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(226, 232, 240, 0.8)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setSelectedCategory("All Categories"); setSearchQuery(""); }}>
            <div style={{ width: '42px', height: '42px', backgroundColor: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 5 9 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 9 12 2 12 2Z" fill="white" />
                <path d="M12 6V16" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="14" r="1.5" fill="#2563eb"/>
              </svg>
            </div>
            <div>
              <h1 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px' }}>Shivam Stationery Mart</h1>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Enterprise & Retail Supplies</span>
            </div>
          </div>

          <div style={{ width: '35%', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search items, pens, notebooks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '9999px', padding: '10px 20px', fontSize: '14px', outline: 'none', backgroundColor: 'rgba(255,255,255,0.9)', boxSizing: 'border-box', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}
            />
            {searchQuery && (
              <span onClick={() => setSearchQuery("")} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#94a3b8', fontWeight: 'bold' }}>✕</span>
            )}
          </div>

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
                  <p onClick={() => { setAuthMode("register"); setIsAuthOpen(true); }} style={{ fontWeight: 'bold', color: '#2563eb', margin: 0, cursor: 'pointer', display: 'inline-block' }}>Register</p>
                  <span style={{ color: '#cbd5e1', margin: '0 4px' }}>|</span>
                  <p onClick={() => { setAuthMode("signin"); setIsAuthOpen(true); }} style={{ fontWeight: 'bold', color: '#0f172a', margin: 0, cursor: 'pointer', display: 'inline-block' }}>Sign In</p>
                </div>
              )}
            </div>
            
            <div onClick={() => setIsCartOpen(true)} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '8px 18px', borderRadius: '9999px', cursor: 'pointer', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>🛒 Cart</span>
              <span style={{ marginLeft: '8px', backgroundColor: '#2563eb', color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '2px 7px', borderRadius: '9999px' }}>{totalItemsCount}</span>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
          
          <div className="anim-left" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#334155', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Explore Categories</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => { setSelectedCategory(cat.name); setSearchQuery(""); }}
                  className="card-hover glass-card"
                  style={{ 
                    backgroundColor: selectedCategory === cat.name && !searchQuery ? 'rgba(239, 246, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)', 
                    border: selectedCategory === cat.name && !searchQuery ? '2px solid #2563eb' : '1px solid rgba(226, 232, 240, 0.8)', 
                    borderRadius: '14px', 
                    padding: '18px', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)'
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

          <div className="anim-right">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#334155', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                {searchQuery ? `Search Results for "${searchQuery}"` : (selectedCategory === "All Categories" ? "Featured Products & Deals" : `${selectedCategory}`)}
              </h2>
              {(selectedCategory !== "All Categories" || searchQuery) && (
                <span onClick={() => { setSelectedCategory("All Categories"); setSearchQuery(""); }} style={{ color: '#2563eb', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>View All Products</span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="card-hover glass-card" style={{ borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                    <div>
                      <div style={{ height: '140px', backgroundColor: '#f1f5f9', borderRadius: '10px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '13px', fontWeight: '500', border: '1px dashed #cbd5e1' }}>
                        [ {product.category} ]
                      </div>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px', minHeight: '40px', lineHeight: '1.4' }}>{product.name}</h3>
                      <p style={{ color: '#eab308', fontSize: '14px', margin: '0 0 8px 0', letterSpacing: '2px' }}>{product.rating}</p>
                      <p style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px 0' }}>{product.priceText}</p>
                    </div>
                    <button onClick={() => addToCart(product)} style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
                      Add to Cart
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', background: 'rgba(255,255,255,0.6)', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '28px', margin: '0 0 10px 0' }}>🔍</p>
                  <p style={{ color: '#64748b', fontSize: '15px', fontWeight: '600', margin: 0 }}>No products found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="anim-bottom" style={{ backgroundColor: '#0f172a', color: '#cbd5e1', padding: '50px 32px 24px 32px', marginTop: '60px', borderTop: '1px solid #1e293b' }}>
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
            © 2026 Shivam Stationery Mart. All Rights Reserved. Professional React App.
          </div>
        </footer>

      </div>

      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="anim-top glass-card" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', position: 'relative', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Your Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px', marginBottom: '16px' }}>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px 0' }}>{item.name}</h4>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{item.priceText} × {item.quantity}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ backgroundColor: '#e2e8f0', border: 'none', width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                      <span style={{ fontSize: '14px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ backgroundColor: '#e2e8f0', border: 'none', width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
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

            {cart.length > 0 && (
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
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

            {cart.length > 0 && (
              <button 
                onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} 
                style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)' }}
              >
                Proceed to Checkout (₹{grandTotal})
              </button>
            )}
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="anim-top glass-card" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', position: 'relative', boxSizing: 'border-box' }}>
            <button onClick={() => setIsCheckoutOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>✕</button>

            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Shipping Address</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Where should we deliver your order?</p>

            <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input type="text" placeholder="Enter your full name" value={shippingName} onChange={(e) => setShippingName(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'white' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                <input type="tel" placeholder="10-digit mobile number" value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'white' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Delivery Address</label>
                <textarea placeholder="House No, Street, Landmark, City, Pincode" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} rows="3" style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', backgroundColor: 'white' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
                Proceed to Secure Payment (₹{grandTotal})
              </button>
            </form>
          </div>
        </div>
      )}

      {isPaymentOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="anim-top" style={{ backgroundColor: 'white', borderRadius: '20px', width: '100%', maxWidth: '460px', overflow: 'hidden', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)', position: 'relative', boxSizing: 'border-box' }}>
            
            <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>🔒</span>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>Secure Pay Gateway</h3>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>Shivam Stationery Mart • Total: ₹{grandTotal}</p>
              </div>
              <button onClick={() => !isProcessing && setIsPaymentOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            {isProcessing ? (
              <div style={{ padding: '50px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '50px', height: '50px', border: '4px solid #e2e8f0', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }}></div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>Processing Payment...</h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Please do not refresh or close this window while we securely connect to your bank.</p>
              </div>
            ) : (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  <button 
                    type="button" 
                    onClick={() => setPaymentMethod('upi')}
                    style={{ padding: '12px 8px', borderRadius: '10px', border: paymentMethod === 'upi' ? '2px solid #2563eb' : '1px solid #cbd5e1', backgroundColor: paymentMethod === 'upi' ? '#eff6ff' : 'white', cursor: 'pointer', fontWeight: '600', fontSize: '13px', color: '#1e293b' }}
                  >
                    📱 UPI / QR
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPaymentMethod('card')}
                    style={{ padding: '12px 8px', borderRadius: '10px', border: paymentMethod === 'card' ? '2px solid #2563eb' : '1px solid #cbd5e1', backgroundColor: paymentMethod === 'card' ? '#eff6ff' : 'white', cursor: 'pointer', fontWeight: '600', fontSize: '13px', color: '#1e293b' }}
                  >
                    💳 Card
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPaymentMethod('netbanking')}
                    style={{ padding: '12px 8px', borderRadius: '10px', border: paymentMethod === 'netbanking' ? '2px solid #2563eb' : '1px solid #cbd5e1', backgroundColor: paymentMethod === 'netbanking' ? '#eff6ff' : 'white', cursor: 'pointer', fontWeight: '600', fontSize: '13px', color: '#1e293b' }}
                  >
                    🏦 NetBanking
                  </button>
                </div>

                <form onSubmit={handleProcessPayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {paymentMethod === 'upi' && (
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>Enter UPI ID / VPA</label>
                      <input type="text" placeholder="username@oksbi / username@paytm" value={upiId} onChange={(e) => setUpiId(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                      <div style={{ marginTop: '12px', textAlign: 'center', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px 0' }}>Or Scan QR with any UPI App</p>
                        <div style={{ fontSize: '32px' }}>📷 [ QR CODE SIMULATION ]</div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Card Number</label>
                        <input type="text" placeholder="4111 2222 3333 4444" maxLength="19" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Expiry (MM/YY)</label>
                          <input type="text" placeholder="MM/YY" maxLength="5" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>CVV</label>
                          <input type="password" placeholder="123" maxLength="4" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>Select Your Bank</label>
                      <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'white', boxSizing: 'border-box' }}>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="SBI Bank">State Bank of India (SBI)</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  <button type="submit" style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '6px', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }}>
                    Pay Securely ₹{grandTotal}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {successOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200 }}>
          <div className="anim-top" style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)', position: 'relative', boxSizing: 'border-box' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 12px auto' }}>✓</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>Payment Successful!</h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Your order has been placed successfully. Thank you for shopping with us!</p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', marginBottom: '20px', fontSize: '13px', color: '#334155', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>Order ID:</span>
                <span style={{ fontWeight: '700' }}>{successOrder.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>Date:</span>
                <span style={{ fontWeight: '600' }}>{successOrder.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>Payment Mode:</span>
                <span style={{ fontWeight: '600' }}>{successOrder.method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>Deliver To:</span>
                <span style={{ fontWeight: '600', textAlign: 'right', maxWidth: '220px' }}>{successOrder.name}, {successOrder.address} ({successOrder.phone})</span>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Ordered Items:</h4>
              {successOrder.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '6px', borderBottom: '1px dashed #f1f5f9', paddingBottom: '6px' }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: '600' }}>₹{item.priceVal * item.quantity}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '800', color: '#0f172a', marginTop: '10px', borderTop: '1px solid #cbd5e1', paddingTop: '8px' }}>
                <span>Total Paid:</span>
                <span style={{ color: '#16a34a' }}>₹{successOrder.total}</span>
              </div>
            </div>

            <button onClick={() => setSuccessOrder(null)} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
              Back to Store
            </button>
          </div>
        </div>
      )}

      {isAuthOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="anim-top glass-card" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', position: 'relative', boxSizing: 'border-box' }}>
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
                  <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'white' }} />
                </div>
              )}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'white' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'white' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '8px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
                {authMode === "signin" ? "Sign In" : "Register Now"}
              </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b', marginTop: '20px' }}>
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