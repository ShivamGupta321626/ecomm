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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { id: 1, name: "All Categories", icon: "📦", desc: "View all available items" },
    { id: 2, name: "Household & Cleaning", icon: "🧹", desc: "Cleaners, Mops, Dustbins" },
    { id: 3, name: "Stationery & Files", icon: "📚", desc: "Pens, Notebooks, Files" },
    { id: 4, name: "Industrial Safety", icon: "🛡️", desc: "Helmets, Gloves, Safety" },
    { id: 5, name: "Xerox & Print", icon: "🖨️", desc: "Papers, Printing Material" },
  ];

  // Expanded Products List across all categories
  const products = [
    // Household & Cleaning
    { id: 1, name: "Durable Broom and Mop Set Sbonet", rating: "★★★★★", reviews: "(128)", priceText: "₹299", originalPrice: "₹333", priceVal: 299, discount: "10% OFF", category: "Household & Cleaning" },
    { id: 2, name: "Advanced Floor Cleaner Liquid (5L)", rating: "★★★★☆", reviews: "(96)", priceText: "₹399", originalPrice: "₹470", priceVal: 399, discount: "15% OFF", category: "Household & Cleaning" },
    { id: 3, name: "Heavy Duty Dishwashing Liquid & Scrub", rating: "★★★★★", reviews: "(76)", priceText: "₹149", originalPrice: "₹169", priceVal: 149, discount: "12% OFF", category: "Household & Cleaning" },
    { id: 4, name: "Plastic Dustbin with Paddle Mechanism", rating: "★★★★☆", reviews: "(54)", priceText: "₹349", originalPrice: "₹379", priceVal: 349, discount: "8% OFF", category: "Household & Cleaning" },
    { id: 5, name: "Multipurpose Surface Disinfectant Spray", rating: "★★★★★", reviews: "(88)", priceText: "₹199", originalPrice: "₹250", priceVal: 199, discount: "20% OFF", category: "Household & Cleaning" },
    { id: 6, name: "Microfiber Cleaning Cloth (Pack of 5)", rating: "★★★★★", reviews: "(140)", priceText: "₹249", originalPrice: "₹300", priceVal: 249, discount: "17% OFF", category: "Household & Cleaning" },
    { id: 7, name: "Glass Cleaner Liquid with Spray Trigger", rating: "★★★★☆", reviews: "(62)", priceText: "₹179", originalPrice: "₹210", priceVal: 179, discount: "15% OFF", category: "Household & Cleaning" },
    { id: 8, name: "Phenyl Concentrated Liquid (2L)", rating: "★★★★☆", reviews: "(45)", priceText: "₹129", originalPrice: "₹150", priceVal: 129, discount: "14% OFF", category: "Household & Cleaning" },
    { id: 9, name: "Toilet Bowl Cleaning Brush & Stand", rating: "★★★★★", reviews: "(91)", priceText: "₹219", originalPrice: "₹299", priceVal: 219, discount: "27% OFF", category: "Household & Cleaning" },
    { id: 10, name: "Stainless Steel Scrubber Pads (Pack of 10)", rating: "★★★★☆", reviews: "(115)", priceText: "₹99", originalPrice: "₹130", priceVal: 99, discount: "24% OFF", category: "Household & Cleaning" },

    // Stationery & Files
    { id: 11, name: "Fountain Pen for Fine Detailed Writing", rating: "★★★★☆", reviews: "(42)", priceText: "₹299", originalPrice: "₹349", priceVal: 299, discount: "14% OFF", category: "Stationery & Files" },
    { id: 12, name: "High-Quality Notebooks (Pack of 4)", rating: "★★★★★", reviews: "(112)", priceText: "₹299", originalPrice: "₹350", priceVal: 299, discount: "15% OFF", category: "Stationery & Files" },
    { id: 13, name: "Ring Binders or Arch Board Files", rating: "★★★★☆", reviews: "(38)", priceText: "₹299", originalPrice: "₹340", priceVal: 299, discount: "12% OFF", category: "Stationery & Files" },
    { id: 14, name: "Gel Ink Ball Pens Box (Pack of 20)", rating: "★★★★★", reviews: "(230)", priceText: "₹199", originalPrice: "₹250", priceVal: 199, discount: "20% OFF", category: "Stationery & Files" },
    { id: 15, name: "Sticky Notes Memo Pads Assorted Colors", rating: "★★★★☆", reviews: "(84)", priceText: "₹120", originalPrice: "₹150", priceVal: 120, discount: "20% OFF", category: "Stationery & Files" },
    { id: 16, name: "Office Stapler Heavy Duty with Pins", rating: "★★★★★", reviews: "(67)", priceText: "₹175", originalPrice: "₹220", priceVal: 175, discount: "20% OFF", category: "Stationery & Files" },
    { id: 17, name: "Permanent Marker Pens (Set of 4)", rating: "★★★★☆", reviews: "(50)", priceText: "₹160", originalPrice: "₹199", priceVal: 160, discount: "20% OFF", category: "Stationery & Files" },
    { id: 18, name: "Document Clear Bag Folders (Pack of 5)", rating: "★★★★★", reviews: "(95)", priceText: "₹199", originalPrice: "₹250", priceVal: 199, discount: "20% OFF", category: "Stationery & Files" },
    { id: 19, name: "Correction Pen & Tape Set", rating: "★★★★☆", reviews: "(33)", priceText: "₹90", originalPrice: "₹120", priceVal: 90, discount: "25% OFF", category: "Stationery & Files" },
    { id: 20, name: "Desk Organizer Metal Mesh Stand", rating: "★★★★★", reviews: "(104)", priceText: "₹449", originalPrice: "₹599", priceVal: 449, discount: "25% OFF", category: "Stationery & Files" },

    // Industrial Safety
    { id: 21, name: "Industrial Safety Helmet & Gloves Combo", rating: "★★★★☆", reviews: "(65)", priceText: "₹299", originalPrice: "₹399", priceVal: 299, discount: "25% OFF", category: "Industrial Safety" },
    { id: 22, name: "High Visibility Reflective Safety Jacket", rating: "★★★★★", reviews: "(78)", priceText: "₹349", originalPrice: "₹450", priceVal: 349, discount: "22% OFF", category: "Industrial Safety" },
    { id: 23, name: "Anti-Fog Protective Safety Goggles", rating: "★★★★☆", reviews: "(49)", priceText: "₹199", originalPrice: "₹250", priceVal: 199, discount: "20% OFF", category: "Industrial Safety" },
    { id: 24, name: "Heavy Duty Cotton Work Gloves (Pair of 10)", rating: "★★★★★", reviews: "(120)", priceText: "₹399", originalPrice: "₹500", priceVal: 399, discount: "20% OFF", category: "Industrial Safety" },
    { id: 25, name: "Dust Protection Face Mask N95 (Box of 5)", rating: "★★★★★", reviews: "(215)", priceText: "₹249", originalPrice: "₹350", priceVal: 249, discount: "28% OFF", category: "Industrial Safety" },
    { id: 26, name: "Steel Toe Safety Boots Protector", rating: "★★★★☆", reviews: "(88)", priceText: "₹1299", originalPrice: "₹1599", priceVal: 1299, discount: "18% OFF", category: "Industrial Safety" },
    { id: 27, name: "Industrial Ear Plugs Noise Cancellation", rating: "★★★★☆", reviews: "(41)", priceText: "₹149", originalPrice: "₹199", priceVal: 149, discount: "25% OFF", category: "Industrial Safety" },

    // Xerox & Print
    { id: 28, name: "A4 Xerox Paper Rim (75 GSM - 500 Sheets)", rating: "★★★★★", reviews: "(210)", priceText: "₹350", originalPrice: "₹400", priceVal: 350, discount: "12% OFF", category: "Xerox & Print" },
    { id: 29, name: "Thermal Printer Paper Rolls (Pack of 10)", rating: "★★★★☆", reviews: "(82)", priceText: "₹299", originalPrice: "₹399", priceVal: 299, discount: "25% OFF", category: "Xerox & Print" },
    { id: 30, name: "Glossy Photo Paper A4 Size (50 Sheets)", rating: "★★★★★", reviews: "(64)", priceText: "₹449", originalPrice: "₹550", priceVal: 449, discount: "18% OFF", category: "Xerox & Print" },
    { id: 31, name: "Lamination Pouches A4 Size (Pack of 50)", rating: "★★★★☆", reviews: "(55)", priceText: "₹320", originalPrice: "₹399", priceVal: 320, discount: "20% OFF", category: "Xerox & Print" },
    { id: 32, name: "Spiral Binding Plastic Combs (Box of 100)", rating: "★★★★★", reviews: "(39)", priceText: "₹199", originalPrice: "₹249", priceVal: 199, discount: "20% OFF", category: "Xerox & Print" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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
            radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.06) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(14, 165, 233, 0.06) 0px, transparent 50%);
          background-size: 200% 200%;
          animation: meshMove 15s ease infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        @keyframes slideFromTop {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .anim-top { animation: slideFromTop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 24px -4px rgba(15, 23, 42, 0.08);
          border-color: #93c5fd;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scrollRightToLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .ticker-container {
          background-color: #1d4ed8;
          color: #ffffff;
          padding: 11px 0;
          font-size: 13px;
          font-weight: 700;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          z-index: 110;
          box-shadow: 0 4px 15px rgba(29, 78, 216, 0.3);
        }

        .ticker-text {
          display: inline-block;
          animation: scrollRightToLeft 18s linear infinite;
        }
      `}</style>

      <div className="professional-bg" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        
        {/* Ticker Bar */}
        <div className="ticker-container">
          <div className="ticker-text">
            <span style={{ fontSize: '16px', marginRight: '8px' }}>✨</span> 
            Special Offer: Get Free Delivery on Orders Above ₹600 + Extra 10% Off on Bulk Orders! 
            <span style={{ fontSize: '16px', marginLeft: '8px', marginRight: '50px' }}>🎉</span>
            <span style={{ fontSize: '16px', marginRight: '8px' }}>🚀</span> 
            Shivam Stationery Mart - Quality Products at Unbeatable Prices! 
            <span style={{ fontSize: '16px', marginLeft: '8px' }}>💼</span>
          </div>
        </div>

        {/* Main Header */}
        <header className="glass-card" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #e2e8f0', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', boxSizing: 'border-box', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => handleCategoryChange("All Categories")}>
            <div style={{ width: '42px', height: '42px', backgroundColor: '#1d4ed8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 5 9 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 9 12 2 12 2Z" fill="white" />
                <path d="M12 6V16" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="14" r="1.5" fill="#1d4ed8"/>
              </svg>
            </div>
            <div>
              <h1 style={{ color: '#0f172a', fontSize: '17px', fontWeight: '800', margin: 0, letterSpacing: '-0.3px' }}>Shivam Stationery Mart</h1>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>ENTERPRISE & RETAIL SUPPLIES</span>
            </div>
          </div>

          <div style={{ width: '36%', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search items, pens, notebooks..." 
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '9999px', padding: '10px 20px 10px 20px', fontSize: '14px', outline: 'none', backgroundColor: '#ffffff', boxSizing: 'border-box', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)' }}
            />
            <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#1d4ed8', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', cursor: 'pointer' }}>
              🔍
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
            <div>
              {currentUser ? (
                <div>
                  <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold', margin: 0 }}>Hello, {currentUser}</p>
                  <p onClick={() => setCurrentUser(null)} style={{ fontSize: '12px', color: '#ef4444', fontWeight: '600', margin: 0, cursor: 'pointer', textDecoration: 'underline' }}>Log Out</p>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Hello, Guest!</p>
                  <div>
                    <span onClick={() => { setAuthMode("register"); setIsAuthOpen(true); }} style={{ fontWeight: '700', color: '#1d4ed8', cursor: 'pointer' }}>Register</span>
                    <span style={{ color: '#cbd5e1', margin: '0 4px' }}>|</span>
                    <span onClick={() => { setAuthMode("signin"); setIsAuthOpen(true); }} style={{ fontWeight: '700', color: '#0f172a', cursor: 'pointer' }}>Sign In</span>
                  </div>
                </div>
              )}
            </div>
            
            <div onClick={() => setIsCartOpen(true)} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1d4ed8', color: 'white', padding: '8px 18px', borderRadius: '9999px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)', fontWeight: '600', gap: '8px' }}>
              <span>🛒 Cart</span>
              <span style={{ backgroundColor: '#ffffff', color: '#1d4ed8', fontSize: '12px', fontWeight: '800', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItemsCount}</span>
            </div>
          </div>
        </header>

        {/* Sub Navigation Bar */}
        <div style={{ backgroundColor: '#1e3a8a', padding: '0 32px', display: 'flex', alignItems: 'center', gap: '28px', color: '#ffffff', fontSize: '14px', fontWeight: '500', height: '46px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <div onClick={() => handleCategoryChange("All Categories")} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '8px' }}>
            <span>🏠</span> Home
          </div>
          <div onClick={() => handleCategoryChange("Household & Cleaning")} style={{ cursor: 'pointer', opacity: 0.9 }}>Categories ▾</div>
          <div style={{ cursor: 'pointer', opacity: 0.9 }}>🏷️ Deals</div>
          <div style={{ cursor: 'pointer', opacity: 0.9 }}>✨ New Arrivals</div>
          <div style={{ cursor: 'pointer', opacity: 0.9 }}>📦 Bulk Orders ▾</div>
          <div style={{ cursor: 'pointer', opacity: 0.9 }}>✉️ Contact Us</div>
        </div>

        <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 24px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
          
          {/* Hero Banner Section */}
          <div className="glass-card" style={{ borderRadius: '24px', padding: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240, 249, 255, 0.9) 100%)', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '420px', zIndex: 2 }}>
              <span style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Your One Stop Stationery Shop
              </span>
              <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', lineHeight: '1.15', margin: '14px 0 14px 0' }}>
                Everything You Need, <span style={{ color: '#1d4ed8' }}>Delivered</span> with Care
              </h1>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                Premium quality products at unbeatable prices. Perfect for offices, schools, and your daily needs.
              </p>
              <div style={{ display: 'flex', gap: '14px' }}>
                <button onClick={() => handleCategoryChange("All Categories")} style={{ backgroundColor: '#1d4ed8', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)' }}>
                  Shop Now →
                </button>
                <button onClick={() => handleCategoryChange("Household & Cleaning")} style={{ backgroundColor: '#ffffff', color: '#1e293b', border: '1px solid #cbd5e1', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  View Deals 🏷️
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '360px', height: '240px', background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <img
                src="/banner.png"
                alt="Stationery & Enterprise Essentials"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '14px', display: 'block' }}
              />
            </div>

            {/* Right Trust Badges Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', minWidth: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🚚</span>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Free Delivery</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>On orders above ₹600</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🛡️</span>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Best Quality</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Premium & Trusted</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🔄</span>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Easy Returns</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Hassle free returns</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🔒</span>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Secure Payment</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>100% safe & secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Explore Categories Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#334155', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#1d4ed8', fontSize: '18px' }}>•</span> EXPLORE CATEGORIES
              </h2>
              <span onClick={() => handleCategoryChange("All Categories")} style={{ color: '#1d4ed8', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>View All Categories →</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px' }}>
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => handleCategoryChange(cat.name)}
                  className="card-hover glass-card"
                  style={{ 
                    backgroundColor: selectedCategory === cat.name && !searchQuery ? '#eff6ff' : '#ffffff', 
                    border: selectedCategory === cat.name && !searchQuery ? '2px solid #1d4ed8' : '1px solid #e2e8f0', 
                    borderRadius: '14px', 
                    padding: '18px', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '26px' }}>{cat.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>{cat.name}</h3>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{cat.desc}</p>
                    </div>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Products Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#334155', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#1d4ed8', fontSize: '18px' }}>•</span> FEATURED PRODUCTS & DEALS ({filteredProducts.length})
              </h2>
              <span onClick={() => handleCategoryChange("All Categories")} style={{ color: '#1d4ed8', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>View All Products →</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <div key={product.id} className="card-hover glass-card" style={{ borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', position: 'relative' }}>
                    
                    {product.discount && (
                      <span style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#1d4ed8', color: 'white', fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px', zIndex: 2 }}>
                        {product.discount}
                      </span>
                    )}

                    <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '16px', cursor: 'pointer', background: '#f1f5f9', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ♡
                    </span>

                    <div>
                      <div style={{ height: '130px', backgroundColor: '#f8fafc', borderRadius: '10px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '12px', fontWeight: '600', border: '1px dashed #cbd5e1' }}>
                        [ {product.category} ]
                      </div>
                      <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '8px', minHeight: '38px', lineHeight: '1.4' }}>{product.name}</h3>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ color: '#eab308', fontSize: '13px' }}>{product.rating}</span>
                        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{product.reviews}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{product.priceText}</span>
                        {product.originalPrice && (
                          <span style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <button onClick={() => addToCart(product)} style={{ width: '100%', backgroundColor: '#1d4ed8', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 10px rgba(29, 78, 216, 0.2)' }}>
                      🛒 Add to Cart
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '28px', margin: '0 0 10px 0' }}>🔍</p>
                  <p style={{ color: '#64748b', fontSize: '15px', fontWeight: '600', margin: 0 }}>No products found matching "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Pagination Controls UI */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '35px' }}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1}
                  style={{ padding: '8px 16px', backgroundColor: currentPage === 1 ? '#e2e8f0' : '#1d4ed8', color: currentPage === 1 ? '#94a3b8' : 'white', border: 'none', borderRadius: '8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '13px' }}
                >
                  ← Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: currentPage === number ? '#1d4ed8' : '#ffffff',
                      color: currentPage === number ? '#ffffff' : '#1e293b',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '13px'
                    }}
                  >
                    {number}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages}
                  style={{ padding: '8px 16px', backgroundColor: currentPage === totalPages ? '#e2e8f0' : '#1d4ed8', color: currentPage === totalPages ? '#94a3b8' : 'white', border: 'none', borderRadius: '8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '13px' }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', padding: '50px 32px 24px 32px', marginTop: '60px', borderTop: '1px solid #1e293b' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '30px' }}>
            <div>
              <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Shivam Stationery Mart</h3>
              <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#94a3b8', margin: 0 }}>
                Your trusted destination for high-quality school supplies, office stationery, cleaning essentials, and industrial safety materials.
              </p>
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Quick Categories</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', lineHeight: '2', color: '#94a3b8' }}>
                <li style={{ cursor: 'pointer' }} onClick={() => handleCategoryChange("Household & Cleaning")}>Household & Cleaning</li>
                <li style={{ cursor: 'pointer' }} onClick={() => handleCategoryChange("Stationery & Files")}>Stationery & Files</li>
                <li style={{ cursor: 'pointer' }} onClick={() => handleCategoryChange("Industrial Safety")}>Industrial Safety</li>
                <li style={{ cursor: 'pointer' }} onClick={() => handleCategoryChange("Xerox & Print")}>Xerox & Print</li>
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
          <div style={{ maxWidth: '1240px', margin: '0 auto', borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
            © 2026 Shivam Stationery Mart. All Rights Reserved. Professional React App.
          </div>
        </footer>

      </div>

      {/* Cart Modal */}
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
                  <p style={{ fontSize: '32px', margin: '0 0 8px 0' }}>🛒</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>Your cart is empty</p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#64748b' }}>Subtotal:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>₹{subtotalAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                  <span style={{ color: '#64748b' }}>Delivery Fee:</span>
                  <span style={{ fontWeight: '700', color: deliveryFee === 0 ? '#16a34a' : '#0f172a' }}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '16px', fontWeight: '800' }}>
                  <span style={{ color: '#0f172a' }}>Total:</span>
                  <span style={{ color: '#1d4ed8' }}>₹{grandTotal}</span>
                </div>
                <button onClick={() => { setIsCartOpen(false); alert("Proceeding to checkout!"); }} style={{ width: '100%', backgroundColor: '#1d4ed8', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}