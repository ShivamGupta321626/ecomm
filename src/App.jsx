import React, { useState } from "react";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    {
      id: 1,
      name: "All Categories",
      icon: "📦",
      desc: "View all available items",
    },
    {
      id: 2,
      name: "Stationery Items",
      icon: "✏️",
      desc: "Pens, pencils & office supplies",
    },
    {
      id: 3,
      name: "Books",
      icon: "📚",
      desc: "School & educational books",
    },
    {
      id: 4,
      name: "Registers",
      icon: "📒",
      desc: "Registers & notebooks",
    },
    {
      id: 5,
      name: "Files",
      icon: "📁",
      desc: "Files & document folders",
    },
    {
      id: 6,
      name: "Printing Papers",
      icon: "📄",
      desc: "A4, Xerox & printing papers",
    },
    {
      id: 7,
      name: "Industrial Safety",
      icon: "🦺",
      desc: "Helmets, gloves & safety items",
    },
    {
      id: 8,
      name: "Cleaning Materials",
      icon: "🧹",
      desc: "Cleaning & housekeeping items",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Ball Pen Box",
      rating: "★★★★★",
      reviews: "(120)",
      priceText: "₹199",
      originalPrice: "₹250",
      priceVal: 199,
      discount: "20% OFF",
      category: "Stationery Items",
    },
    {
      id: 2,
      name: "HB Pencil Set",
      rating: "★★★★★",
      reviews: "(85)",
      priceText: "₹99",
      originalPrice: "₹120",
      priceVal: 99,
      discount: "18% OFF",
      category: "Stationery Items",
    },
    {
      id: 3,
      name: "Geometry Box",
      rating: "★★★★☆",
      reviews: "(64)",
      priceText: "₹149",
      originalPrice: "₹180",
      priceVal: 149,
      discount: "17% OFF",
      category: "Stationery Items",
    },
    {
      id: 4,
      name: "Office Stapler Heavy Duty",
      rating: "★★★★★",
      reviews: "(67)",
      priceText: "₹175",
      originalPrice: "₹220",
      priceVal: 175,
      discount: "20% OFF",
      category: "Stationery Items",
    },

    {
      id: 5,
      name: "School Mathematics Book",
      rating: "★★★★★",
      reviews: "(55)",
      priceText: "₹180",
      originalPrice: "₹220",
      priceVal: 180,
      discount: "18% OFF",
      category: "Books",
    },
    {
      id: 6,
      name: "English Grammar Book",
      rating: "★★★★☆",
      reviews: "(72)",
      priceText: "₹220",
      originalPrice: "₹280",
      priceVal: 220,
      discount: "21% OFF",
      category: "Books",
    },
    {
      id: 7,
      name: "Computer Programming Book",
      rating: "★★★★★",
      reviews: "(91)",
      priceText: "₹399",
      originalPrice: "₹499",
      priceVal: 399,
      discount: "20% OFF",
      category: "Books",
    },
    {
      id: 8,
      name: "General Knowledge Book",
      rating: "★★★★☆",
      reviews: "(48)",
      priceText: "₹150",
      originalPrice: "₹199",
      priceVal: 150,
      discount: "25% OFF",
      category: "Books",
    },

    {
      id: 9,
      name: "Long Size Office Register",
      rating: "★★★★★",
      reviews: "(110)",
      priceText: "₹160",
      originalPrice: "₹200",
      priceVal: 160,
      discount: "20% OFF",
      category: "Registers",
    },
    {
      id: 10,
      name: "Hard Bound Register 300 Pages",
      rating: "★★★★★",
      reviews: "(96)",
      priceText: "₹280",
      originalPrice: "₹340",
      priceVal: 280,
      discount: "18% OFF",
      category: "Registers",
    },
    {
      id: 11,
      name: "Attendance Register",
      rating: "★★★★☆",
      reviews: "(53)",
      priceText: "₹180",
      originalPrice: "₹220",
      priceVal: 180,
      discount: "18% OFF",
      category: "Registers",
    },
    {
      id: 12,
      name: "Cash Book Register",
      rating: "★★★★★",
      reviews: "(61)",
      priceText: "₹220",
      originalPrice: "₹270",
      priceVal: 220,
      discount: "18% OFF",
      category: "Registers",
    },

    {
      id: 13,
      name: "Office Document File",
      rating: "★★★★☆",
      reviews: "(75)",
      priceText: "₹80",
      originalPrice: "₹100",
      priceVal: 80,
      discount: "20% OFF",
      category: "Files",
    },
    {
      id: 14,
      name: "Ring Binder File",
      rating: "★★★★★",
      reviews: "(89)",
      priceText: "₹140",
      originalPrice: "₹180",
      priceVal: 140,
      discount: "22% OFF",
      category: "Files",
    },
    {
      id: 15,
      name: "Plastic Document Folder",
      rating: "★★★★☆",
      reviews: "(58)",
      priceText: "₹60",
      originalPrice: "₹80",
      priceVal: 60,
      discount: "25% OFF",
      category: "Files",
    },
    {
      id: 16,
      name: "Executive Office File",
      rating: "★★★★★",
      reviews: "(71)",
      priceText: "₹190",
      originalPrice: "₹240",
      priceVal: 190,
      discount: "21% OFF",
      category: "Files",
    },

    {
      id: 17,
      name: "A4 Xerox Paper 75 GSM",
      rating: "★★★★★",
      reviews: "(210)",
      priceText: "₹350",
      originalPrice: "₹400",
      priceVal: 350,
      discount: "12% OFF",
      category: "Printing Papers",
    },
    {
      id: 18,
      name: "A4 Printing Paper 80 GSM",
      rating: "★★★★★",
      reviews: "(145)",
      priceText: "₹399",
      originalPrice: "₹450",
      priceVal: 399,
      discount: "11% OFF",
      category: "Printing Papers",
    },
    {
      id: 19,
      name: "Glossy Photo Paper A4",
      rating: "★★★★★",
      reviews: "(64)",
      priceText: "₹449",
      originalPrice: "₹550",
      priceVal: 449,
      discount: "18% OFF",
      category: "Printing Papers",
    },
    {
      id: 20,
      name: "Thermal Printer Paper Rolls",
      rating: "★★★★☆",
      reviews: "(82)",
      priceText: "₹299",
      originalPrice: "₹399",
      priceVal: 299,
      discount: "25% OFF",
      category: "Printing Papers",
    },

    {
      id: 21,
      name: "Industrial Safety Helmet",
      rating: "★★★★★",
      reviews: "(85)",
      priceText: "₹399",
      originalPrice: "₹500",
      priceVal: 399,
      discount: "20% OFF",
      category: "Industrial Safety",
    },
    {
      id: 22,
      name: "Reflective Safety Jacket",
      rating: "★★★★★",
      reviews: "(78)",
      priceText: "₹349",
      originalPrice: "₹450",
      priceVal: 349,
      discount: "22% OFF",
      category: "Industrial Safety",
    },
    {
      id: 23,
      name: "Protective Safety Goggles",
      rating: "★★★★☆",
      reviews: "(49)",
      priceText: "₹199",
      originalPrice: "₹250",
      priceVal: 199,
      discount: "20% OFF",
      category: "Industrial Safety",
    },
    {
      id: 24,
      name: "Heavy Duty Work Gloves",
      rating: "★★★★★",
      reviews: "(120)",
      priceText: "₹399",
      originalPrice: "₹500",
      priceVal: 399,
      discount: "20% OFF",
      category: "Industrial Safety",
    },
    {
      id: 25,
      name: "Industrial Safety Shoes",
      rating: "★★★★☆",
      reviews: "(88)",
      priceText: "₹1299",
      originalPrice: "₹1599",
      priceVal: 1299,
      discount: "18% OFF",
      category: "Industrial Safety",
    },

    {
      id: 26,
      name: "Floor Cleaning Liquid 5L",
      rating: "★★★★★",
      reviews: "(95)",
      priceText: "₹399",
      originalPrice: "₹470",
      priceVal: 399,
      discount: "15% OFF",
      category: "Cleaning Materials",
    },
    {
      id: 27,
      name: "Microfiber Cleaning Cloth Pack",
      rating: "★★★★★",
      reviews: "(140)",
      priceText: "₹249",
      originalPrice: "₹300",
      priceVal: 249,
      discount: "17% OFF",
      category: "Cleaning Materials",
    },
    {
      id: 28,
      name: "Plastic Dustbin",
      rating: "★★★★☆",
      reviews: "(54)",
      priceText: "₹349",
      originalPrice: "₹379",
      priceVal: 349,
      discount: "8% OFF",
      category: "Cleaning Materials",
    },
    {
      id: 29,
      name: "Glass Cleaner Spray",
      rating: "★★★★☆",
      reviews: "(62)",
      priceText: "₹179",
      originalPrice: "₹210",
      priceVal: 179,
      discount: "15% OFF",
      category: "Cleaning Materials",
    },
    {
      id: 30,
      name: "Toilet Cleaning Brush",
      rating: "★★★★★",
      reviews: "(91)",
      priceText: "₹219",
      originalPrice: "₹299",
      priceVal: 219,
      discount: "27% OFF",
      category: "Cleaning Materials",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
    setShowCategories(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    alert(`${product.name} added to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;

            return newQty > 0
              ? {
                  ...item,
                  quantity: newQty,
                }
              : null;
          }

          return item;
        })
        .filter(Boolean)
    );
  };

  const totalItemsCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotalAmount = cart.reduce(
    (sum, item) =>
      sum + item.priceVal * item.quantity,
    0
  );

  const deliveryFee =
    subtotalAmount >= 600 || subtotalAmount === 0
      ? 0
      : 50;

  const grandTotal =
    subtotalAmount + deliveryFee;

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const submitAuth = () => {
    if (
      !email ||
      !password ||
      (authMode === "register" && !name)
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const username =
      authMode === "register"
        ? name
        : email.split("@")[0];

    setCurrentUser(username);
    setIsAuthOpen(false);

    setName("");
    setEmail("");
    setPassword("");

    alert(
      authMode === "register"
        ? "Registration successful! 🎉"
        : "Sign in successful! 🎉"
    );
  };

  const processPayment = () => {
    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }

    if (
      paymentMethod === "card" &&
      (!cardNumber || !cardExpiry || !cardCvv)
    ) {
      alert("Please enter complete card details.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = {
        id:
          "SSM" +
          Math.floor(
            100000 + Math.random() * 900000
          ),
        amount: grandTotal,
        customer: shippingName,
        method: paymentMethod,
      };

      setSuccessOrder(order);
      setIsProcessing(false);
      setIsPaymentOpen(false);
    }, 1800);
  };

  return (
    <div
      style={{
        fontFamily:
          "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        @keyframes meshMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slideFromTop {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .professional-bg {
          background-color: #f8fafc;
          background-image:
            radial-gradient(
              at 0% 0%,
              rgba(37, 99, 235, 0.06) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 100% 0%,
              rgba(14, 165, 233, 0.06) 0px,
              transparent 50%
            );
          background-size: 200% 200%;
          animation: meshMove 15s ease infinite;
        }

        .glass-card {
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226,232,240,.8);
        }

        .anim-top {
          animation:
            slideFromTop .5s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .fade-modal {
          animation: fadeIn .25s ease forwards;
        }

        .card-hover {
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow:
            0 16px 24px -4px
            rgba(15,23,42,.10);
          border-color: #93c5fd;
        }

        .nav-item:hover {
          background: rgba(255,255,255,.15);
        }

        .category-dropdown-item {
          transition: all .2s ease;
        }

        .category-dropdown-item:hover {
          background: #eff6ff;
          color: #1d4ed8;
          transform: translateX(3px);
        }

        .button-hover {
          transition: all .2s ease;
        }

        .button-hover:hover {
          transform: translateY(-2px);
        }

        .ticker-container {
          background-color: #1d4ed8;
          color: #fff;
          padding: 11px 0;
          font-size: 13px;
          font-weight: 700;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          z-index: 110;
          box-shadow:
            0 4px 15px
            rgba(29,78,216,.3);
        }

        .ticker-text {
          display: inline-block;
          animation:
            scrollRightToLeft 18s
            linear infinite;
        }

        @keyframes scrollRightToLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        @media(max-width: 900px) {
          .main-header {
            flex-wrap: wrap !important;
            gap: 15px !important;
          }

          .search-box {
            width: 100% !important;
            order: 3;
          }

          .hero-section {
            flex-direction: column !important;
          }

          .hero-image {
            width: 100% !important;
            margin-top: 25px;
          }

          .trust-card {
            width: 100% !important;
            margin-top: 20px;
          }
        }

        @media(max-width: 600px) {
          .header-padding {
            padding: 12px 15px !important;
          }

          .nav-padding {
            padding: 0 15px !important;
            gap: 10px !important;
            overflow-x: auto;
          }

          .hero-padding {
            padding: 25px !important;
          }

          .hero-title {
            font-size: 28px !important;
          }
        }
      `}</style>

      <div
        className="professional-bg"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* TICKER */}
        <div className="ticker-container">
          <div className="ticker-text">
            ✨ Special Offer: Free Delivery on
            Orders Above ₹600 + Extra 10% Off on
            Bulk Orders! 🎉 &nbsp;&nbsp;&nbsp;
            🚀 Shivam Stationery Mart - Quality
            Products at Unbeatable Prices! 💼
          </div>
        </div>

        {/* HEADER */}
        <header
          className="glass-card main-header header-padding"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            borderBottom:
              "1px solid #e2e8f0",
            padding: "14px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            width: "100%",
            boxShadow:
              "0 2px 10px rgba(0,0,0,.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onClick={() =>
              handleCategoryChange(
                "All Categories"
              )
            }
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#1d4ed8",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
                boxShadow:
                  "0 4px 12px rgba(29,78,216,.3)",
              }}
            >
              🛍️
            </div>

            <div>
              <h1
                style={{
                  color: "#0f172a",
                  fontSize: "17px",
                  fontWeight: "800",
                  margin: 0,
                }}
              >
                Shivam Stationery Mart
              </h1>

              <span
                style={{
                  fontSize: "10px",
                  color: "#64748b",
                  fontWeight: "700",
                  textTransform:
                    "uppercase",
                  letterSpacing: "1px",
                }}
              >
                ENTERPRISE & RETAIL SUPPLIES
              </span>
            </div>
          </div>

          {/* SEARCH */}
          <div
            className="search-box"
            style={{
              width: "36%",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Search items, books, registers..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: "100%",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "9999px",
                padding:
                  "11px 48px 11px 20px",
                fontSize: "14px",
                outline: "none",
                backgroundColor:
                  "#ffffff",
              }}
            />

            <div
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                backgroundColor:
                  "#1d4ed8",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              🔍
            </div>
          </div>

          {/* ACCOUNT + CART */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "14px",
            }}
          >
            <div>
              {currentUser ? (
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#16a34a",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Hello, {currentUser}
                  </p>

                  <p
                    onClick={() =>
                      setCurrentUser(null)
                    }
                    style={{
                      fontSize: "12px",
                      color: "#ef4444",
                      fontWeight: "600",
                      margin: 0,
                      cursor: "pointer",
                      textDecoration:
                        "underline",
                    }}
                  >
                    Log Out
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      margin: 0,
                    }}
                  >
                    Hello, Guest!
                  </p>

                  <div>
                    <span
                      onClick={() =>
                        openAuth(
                          "register"
                        )
                      }
                      style={{
                        fontWeight: "700",
                        color: "#1d4ed8",
                        cursor: "pointer",
                      }}
                    >
                      Register
                    </span>

                    <span
                      style={{
                        color: "#cbd5e1",
                        margin: "0 4px",
                      }}
                    >
                      |
                    </span>

                    <span
                      onClick={() =>
                        openAuth(
                          "signin"
                        )
                      }
                      style={{
                        fontWeight: "700",
                        color: "#0f172a",
                        cursor: "pointer",
                      }}
                    >
                      Sign In
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={() =>
                setIsCartOpen(true)
              }
              className="button-hover"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  "#1d4ed8",
                color: "white",
                padding:
                  "8px 18px",
                borderRadius:
                  "9999px",
                cursor: "pointer",
                boxShadow:
                  "0 4px 12px rgba(29,78,216,.25)",
                fontWeight: "600",
                gap: "8px",
              }}
            >
              🛒 Cart

              <span
                style={{
                  backgroundColor:
                    "#ffffff",
                  color: "#1d4ed8",
                  fontSize: "12px",
                  fontWeight: "800",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                }}
              >
                {totalItemsCount}
              </span>
            </div>
          </div>
        </header>

        {/* NAVIGATION */}
        <div
          className="nav-padding"
          style={{
            backgroundColor: "#1e3a8a",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            height: "48px",
            boxShadow:
              "0 2px 6px rgba(0,0,0,.1)",
          }}
        >
          <div
            onClick={() =>
              handleCategoryChange(
                "All Categories"
              )
            }
            className="nav-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "7px 14px",
              borderRadius: "8px",
            }}
          >
            🏠 Home
          </div>

          {/* CATEGORIES */}
          <div
            style={{
              position: "relative",
            }}
            onMouseEnter={() =>
              setShowCategories(true)
            }
            onMouseLeave={() =>
              setShowCategories(false)
            }
          >
            <div
              onClick={() =>
                setShowCategories(
                  !showCategories
                )
              }
              className="nav-item"
              style={{
                cursor: "pointer",
                padding: "7px 14px",
                borderRadius: "8px",
                whiteSpace: "nowrap",
              }}
            >
              📂 Categories ▾
            </div>

            {showCategories && (
              <div
                style={{
                  position: "absolute",
                  top: "43px",
                  left: 0,
                  width: "280px",
                  backgroundColor:
                    "#ffffff",
                  borderRadius: "14px",
                  padding: "8px",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,.22)",
                  zIndex: 9999,
                  border:
                    "1px solid #e2e8f0",
                }}
              >
                {categories
                  .slice(1)
                  .map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() =>
                        handleCategoryChange(
                          cat.name
                        )
                      }
                      className="category-dropdown-item"
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: "12px",
                        padding:
                          "12px",
                        borderRadius:
                          "9px",
                        cursor: "pointer",
                        color:
                          "#0f172a",
                      }}
                    >
                      <span
                        style={{
                          fontSize:
                            "22px",
                        }}
                      >
                        {cat.icon}
                      </span>

                      <div>
                        <div
                          style={{
                            fontSize:
                              "13px",
                            fontWeight:
                              "700",
                          }}
                        >
                          {cat.name}
                        </div>

                        <small
                          style={{
                            color:
                              "#94a3b8",
                            fontSize:
                              "10px",
                          }}
                        >
                          {cat.desc}
                        </small>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div
            onClick={() =>
              handleCategoryChange(
                "All Categories"
              )
            }
            style={{
              cursor: "pointer",
              opacity: 0.9,
            }}
          >
            🏷️ Deals
          </div>

          <div
            onClick={() =>
              handleCategoryChange(
                "Stationery Items"
              )
            }
            style={{
              cursor: "pointer",
              opacity: 0.9,
            }}
          >
            ✨ New Arrivals
          </div>

          <div
            style={{
              cursor: "pointer",
              opacity: 0.9,
            }}
          >
            📦 Bulk Orders ▾
          </div>

          <div
            style={{
              cursor: "pointer",
              opacity: 0.9,
            }}
          >
            ✉️ Contact Us
          </div>
        </div>

        {/* MAIN */}
        <main
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding:
              "32px 24px",
            flex: 1,
            width: "100%",
          }}
        >
          {/* HERO */}
          <div
            className="glass-card hero-section hero-padding"
            style={{
              borderRadius: "24px",
              padding: "40px",
              marginBottom: "40px",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              background:
                "linear-gradient(135deg,rgba(255,255,255,.95),rgba(240,249,255,.9))",
              boxShadow:
                "0 10px 30px -5px rgba(0,0,0,.04)",
              gap: "25px",
            }}
          >
            <div
              style={{
                maxWidth: "420px",
              }}
            >
              <span
                style={{
                  backgroundColor:
                    "#dbeafe",
                  color: "#1d4ed8",
                  padding:
                    "6px 14px",
                  borderRadius:
                    "9999px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                YOUR ONE STOP SHOP
              </span>

              <h1
                className="hero-title"
                style={{
                  fontSize: "36px",
                  fontWeight: "900",
                  color: "#0f172a",
                  lineHeight: "1.15",
                  margin:
                    "14px 0",
                }}
              >
                Everything You Need,{" "}
                <span
                  style={{
                    color: "#1d4ed8",
                  }}
                >
                  Delivered
                </span>{" "}
                with Care
              </h1>

              <p
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  lineHeight: "1.6",
                  marginBottom:
                    "20px",
                }}
              >
                Premium quality stationery,
                books, registers, files,
                printing papers, cleaning
                materials and industrial
                safety products.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <button
                  onClick={() =>
                    handleCategoryChange(
                      "All Categories"
                    )
                  }
                  className="button-hover"
                  style={{
                    backgroundColor:
                      "#1d4ed8",
                    color: "white",
                    border: "none",
                    padding:
                      "12px 24px",
                    borderRadius:
                      "10px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Shop Now →
                </button>

                <button
                  onClick={() =>
                    handleCategoryChange(
                      "Stationery Items"
                    )
                  }
                  className="button-hover"
                  style={{
                    backgroundColor:
                      "white",
                    color: "#1e293b",
                    border:
                      "1px solid #cbd5e1",
                    padding:
                      "12px 24px",
                    borderRadius:
                      "10px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  View Products
                </button>
              </div>
            </div>

            <div
              className="hero-image"
              style={{
                width: "360px",
                height: "240px",
                background:
                  "#ffffff",
                padding: "10px",
                borderRadius:
                  "20px",
                border:
                  "1px solid #e2e8f0",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.06)",
                overflow: "hidden",
              }}
            >
              <img
                src="/banner.png"
                alt="Shivam Stationery Mart"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit:
                    "cover",
                  borderRadius:
                    "14px",
                }}
              />
            </div>

            <div
              className="trust-card"
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "14px",
                backgroundColor:
                  "white",
                padding: "20px",
                borderRadius:
                  "16px",
                border:
                  "1px solid #e2e8f0",
                minWidth: "220px",
              }}
            >
              <div>🚚 <b>Free Delivery</b></div>
              <div>🛡️ <b>Best Quality</b></div>
              <div>🔄 <b>Easy Returns</b></div>
              <div>🔒 <b>Secure Payment</b></div>
            </div>
          </div>

          {/* CATEGORIES */}
          <div
            style={{
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "18px",
              }}
            >
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#334155",
                  margin: 0,
                }}
              >
                🔵 EXPLORE CATEGORIES
              </h2>

              <span
                onClick={() =>
                  handleCategoryChange(
                    "All Categories"
                  )
                }
                style={{
                  color: "#1d4ed8",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                View All →
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(210px,1fr))",
                gap: "16px",
              }}
            >
              {categories.map(
                (cat) => (
                  <div
                    key={cat.id}
                    onClick={() =>
                      handleCategoryChange(
                        cat.name
                      )
                    }
                    className="card-hover glass-card"
                    style={{
                      backgroundColor:
                        selectedCategory ===
                        cat.name
                          ? "#eff6ff"
                          : "#fff",
                      border:
                        selectedCategory ===
                        cat.name
                          ? "2px solid #1d4ed8"
                          : "1px solid #e2e8f0",
                      borderRadius:
                        "14px",
                      padding: "18px",
                      cursor:
                        "pointer",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "space-between",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize:
                            "26px",
                        }}
                      >
                        {cat.icon}
                      </span>

                      <div>
                        <h3
                          style={{
                            fontSize:
                              "13px",
                            margin:
                              "0 0 3px",
                            color:
                              "#0f172a",
                          }}
                        >
                          {cat.name}
                        </h3>

                        <p
                          style={{
                            fontSize:
                              "10px",
                            color:
                              "#64748b",
                            margin: 0,
                          }}
                        >
                          {cat.desc}
                        </p>
                      </div>
                    </div>

                    <span>→</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                marginBottom:
                  "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#334155",
                  margin: 0,
                }}
              >
                🔵 PRODUCTS (
                {filteredProducts.length})
              </h2>

              <span
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                }}
              >
                {selectedCategory}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(240px,1fr))",
                gap: "20px",
              }}
            >
              {currentProducts.length >
              0 ? (
                currentProducts.map(
                  (product) => (
                    <div
                      key={product.id}
                      className="card-hover glass-card"
                      style={{
                        borderRadius:
                          "16px",
                        padding:
                          "16px",
                        position:
                          "relative",
                      }}
                    >
                      <span
                        style={{
                          position:
                            "absolute",
                          top: 16,
                          left: 16,
                          backgroundColor:
                            "#1d4ed8",
                          color:
                            "white",
                          fontSize:
                            "10px",
                          fontWeight:
                            "800",
                          padding:
                            "4px 8px",
                          borderRadius:
                            "6px",
                          zIndex: 2,
                        }}
                      >
                        {
                          product.discount
                        }
                      </span>

                      <div
                        style={{
                          height:
                            "140px",
                          background:
                            "linear-gradient(135deg,#eff6ff,#f8fafc)",
                          borderRadius:
                            "12px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          fontSize:
                            "45px",
                          marginBottom:
                            "14px",
                        }}
                      >
                        {
                          categories.find(
                            (c) =>
                              c.name ===
                              product.category
                          )?.icon
                        }
                      </div>

                      <small
                        style={{
                          color:
                            "#1d4ed8",
                          fontWeight:
                            "700",
                        }}
                      >
                        {
                          product.category
                        }
                      </small>

                      <h3
                        style={{
                          fontSize:
                            "13px",
                          color:
                            "#1e293b",
                          minHeight:
                            "38px",
                          lineHeight:
                            "1.4",
                        }}
                      >
                        {
                          product.name
                        }
                      </h3>

                      <div
                        style={{
                          color:
                            "#eab308",
                          fontSize:
                            "13px",
                          marginBottom:
                            "10px",
                        }}
                      >
                        {
                          product.rating
                        }{" "}
                        <span
                          style={{
                            color:
                              "#94a3b8",
                            fontSize:
                              "11px",
                          }}
                        >
                          {
                            product.reviews
                          }
                        </span>
                      </div>

                      <div
                        style={{
                          marginBottom:
                            "15px",
                        }}
                      >
                        <span
                          style={{
                            fontSize:
                              "18px",
                            fontWeight:
                              "800",
                          }}
                        >
                          {
                            product.priceText
                          }
                        </span>

                        <span
                          style={{
                            marginLeft:
                              "8px",
                            color:
                              "#94a3b8",
                            textDecoration:
                              "line-through",
                            fontSize:
                              "12px",
                          }}
                        >
                          {
                            product.originalPrice
                          }
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          addToCart(
                            product
                          )
                        }
                        className="button-hover"
                        style={{
                          width:
                            "100%",
                          backgroundColor:
                            "#1d4ed8",
                          color:
                            "white",
                          border:
                            "none",
                          padding:
                            "11px",
                          borderRadius:
                            "10px",
                          fontWeight:
                            "700",
                          cursor:
                            "pointer",
                        }}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  )
                )
              ) : (
                <div
                  style={{
                    gridColumn:
                      "1/-1",
                    textAlign:
                      "center",
                    padding:
                      "50px",
                    background:
                      "white",
                    borderRadius:
                      "14px",
                  }}
                >
                  🔍 No products found.
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                  gap: "8px",
                  marginTop:
                    "35px",
                }}
              >
                <button
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (p) =>
                        Math.max(
                          p - 1,
                          1
                        )
                    )
                  }
                  style={{
                    padding:
                      "9px 16px",
                    border: "none",
                    borderRadius:
                      "8px",
                    backgroundColor:
                      currentPage ===
                      1
                        ? "#e2e8f0"
                        : "#1d4ed8",
                    color:
                      currentPage ===
                      1
                        ? "#94a3b8"
                        : "white",
                    cursor:
                      currentPage ===
                      1
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  ← Previous
                </button>

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, i) =>
                    i + 1
                ).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      style={{
                        width:
                          "36px",
                        height:
                          "36px",
                        border:
                          "1px solid #cbd5e1",
                        borderRadius:
                          "8px",
                        backgroundColor:
                          currentPage ===
                          page
                            ? "#1d4ed8"
                            : "white",
                        color:
                          currentPage ===
                          page
                            ? "white"
                            : "#1e293b",
                        cursor:
                          "pointer",
                        fontWeight:
                          "700",
                      }}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (p) =>
                        Math.min(
                          p + 1,
                          totalPages
                        )
                    )
                  }
                  style={{
                    padding:
                      "9px 16px",
                    border: "none",
                    borderRadius:
                      "8px",
                    backgroundColor:
                      currentPage ===
                      totalPages
                        ? "#e2e8f0"
                        : "#1d4ed8",
                    color:
                      currentPage ===
                      totalPages
                        ? "#94a3b8"
                        : "white",
                    cursor:
                      "pointer",
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </main>

        {/* FOOTER */}
        <footer
          style={{
            backgroundColor:
              "#0f172a",
            color: "#cbd5e1",
            padding:
              "45px 32px 20px",
            marginTop:
              "50px",
          }}
        >
          <div
            style={{
              maxWidth:
                "1240px",
              margin:
                "0 auto",
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "35px",
            }}
          >
            <div>
              <h3
                style={{
                  color:
                    "white",
                }}
              >
                Shivam Stationery Mart
              </h3>

              <p
                style={{
                  fontSize:
                    "13px",
                  lineHeight:
                    "1.6",
                  color:
                    "#94a3b8",
                }}
              >
                Your trusted destination
                for stationery, books,
                office supplies, cleaning
                materials and industrial
                safety products.
              </p>
            </div>

            <div>
              <h3
                style={{
                  color:
                    "white",
                }}
              >
                Quick Categories
              </h3>

              {categories
                .slice(1)
                .map((cat) => (
                  <p
                    key={cat.id}
                    onClick={() =>
                      handleCategoryChange(
                        cat.name
                      )
                    }
                    style={{
                      fontSize:
                        "13px",
                      color:
                        "#94a3b8",
                      cursor:
                        "pointer",
                      margin:
                        "7px 0",
                    }}
                  >
                    {cat.icon}{" "}
                    {cat.name}
                  </p>
                ))}
            </div>

            <div>
              <h3
                style={{
                  color:
                    "white",
                }}
              >
                Contact Us
              </h3>

              <p
                style={{
                  fontSize:
                    "13px",
                  color:
                    "#94a3b8",
                }}
              >
                📍 Main Market, Your City,
                India
              </p>

              <p
                style={{
                  fontSize:
                    "13px",
                  color:
                    "#94a3b8",
                }}
              >
                📞 +91 98765 43210
              </p>

              <p
                style={{
                  fontSize:
                    "13px",
                  color:
                    "#94a3b8",
                }}
              >
                ✉️ support@shivamstationery.com
              </p>
            </div>
          </div>

          <div
            style={{
              maxWidth:
                "1240px",
              margin:
                "30px auto 0",
              paddingTop:
                "20px",
              borderTop:
                "1px solid #1e293b",
              textAlign:
                "center",
              fontSize:
                "12px",
              color:
                "#64748b",
            }}
          >
            © 2026 Shivam Stationery Mart.
            All Rights Reserved.
          </div>
        </footer>
      </div>

      {/* AUTH MODAL */}
      {isAuthOpen && (
        <div
          onClick={() =>
            setIsAuthOpen(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor:
              "rgba(15,23,42,.7)",
            backdropFilter:
              "blur(6px)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 3000,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="fade-modal"
            style={{
              width: "100%",
              maxWidth:
                "420px",
              backgroundColor:
                "white",
              borderRadius:
                "20px",
              padding:
                "30px",
              boxShadow:
                "0 30px 70px rgba(0,0,0,.3)",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color:
                      "#0f172a",
                  }}
                >
                  {authMode ===
                  "register"
                    ? "Create Account"
                    : "Welcome Back"}
                </h2>

                <p
                  style={{
                    color:
                      "#64748b",
                    fontSize:
                      "13px",
                  }}
                >
                  {authMode ===
                  "register"
                    ? "Register at Shivam Stationery Mart"
                    : "Sign in to continue"}
                </p>
              </div>

              <button
                onClick={() =>
                  setIsAuthOpen(
                    false
                  )
                }
                style={{
                  border:
                    "none",
                  background:
                    "#f1f5f9",
                  borderRadius:
                    "50%",
                  width:
                    "34px",
                  height:
                    "34px",
                  cursor:
                    "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {authMode ===
              "register" && (
              <input
                value={name}
                onChange={(e) =>
                  setName(
                    e.target
                      .value
                  )
                }
                placeholder="Full Name"
                style={{
                  width:
                    "100%",
                  padding:
                    "13px",
                  marginBottom:
                    "12px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius:
                    "9px",
                }}
              />
            )}

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target
                    .value
                )
              }
              placeholder="Email Address"
              style={{
                width:
                  "100%",
                padding:
                  "13px",
                marginBottom:
                  "12px",
                border:
                  "1px solid #cbd5e1",
                borderRadius:
                  "9px",
              }}
            />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target
                    .value
                )
              }
              placeholder="Password"
              style={{
                width:
                  "100%",
                padding:
                  "13px",
                marginBottom:
                  "18px",
                border:
                  "1px solid #cbd5e1",
                borderRadius:
                  "9px",
              }}
            />

            <button
              onClick={submitAuth}
              style={{
                width:
                  "100%",
                padding:
                  "13px",
                backgroundColor:
                  "#1d4ed8",
                color:
                  "white",
                border:
                  "none",
                borderRadius:
                  "10px",
                fontWeight:
                  "700",
                cursor:
                  "pointer",
              }}
            >
              {authMode ===
              "register"
                ? "Create Account"
                : "Sign In"}{" "}
              →
            </button>

            <p
              style={{
                textAlign:
                  "center",
                fontSize:
                  "13px",
                color:
                  "#64748b",
                marginTop:
                  "18px",
              }}
            >
              {authMode ===
              "register"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                onClick={() =>
                  setAuthMode(
                    authMode ===
                      "register"
                      ? "signin"
                      : "register"
                  )
                }
                style={{
                  color:
                    "#1d4ed8",
                  fontWeight:
                    "700",
                  cursor:
                    "pointer",
                }}
              >
                {authMode ===
                "register"
                  ? "Sign In"
                  : "Register"}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {isCartOpen && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            backgroundColor:
              "rgba(0,0,0,.55)",
            backdropFilter:
              "blur(5px)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 2500,
            padding: "20px",
          }}
        >
          <div
            className="fade-modal"
            style={{
              width:
                "100%",
              maxWidth:
                "500px",
              maxHeight:
                "85vh",
              backgroundColor:
                "white",
              borderRadius:
                "18px",
              padding:
                "25px",
              display:
                "flex",
              flexDirection:
                "column",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                borderBottom:
                  "1px solid #e2e8f0",
                paddingBottom:
                  "12px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                }}
              >
                🛒 Your Cart
              </h2>

              <button
                onClick={() =>
                  setIsCartOpen(
                    false
                  )
                }
                style={{
                  border:
                    "none",
                  background:
                    "#f1f5f9",
                  borderRadius:
                    "50%",
                  width:
                    "32px",
                  height:
                    "32px",
                  cursor:
                    "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                overflowY:
                  "auto",
                paddingTop:
                  "15px",
              }}
            >
              {cart.length >
              0 ? (
                cart.map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        padding:
                          "12px 0",
                        borderBottom:
                          "1px solid #f1f5f9",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                        }}
                      >
                        <b
                          style={{
                            fontSize:
                              "13px",
                          }}
                        >
                          {
                            item.name
                          }
                        </b>

                        <p
                          style={{
                            fontSize:
                              "12px",
                            color:
                              "#64748b",
                            margin:
                              "4px 0",
                          }}
                        >
                          ₹
                          {
                            item.priceVal
                          }{" "}
                          ×{" "}
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              -1
                            )
                          }
                        >
                          -
                        </button>

                        <b>
                          {
                            item.quantity
                          }
                        </b>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "45px",
                    color:
                      "#64748b",
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        "40px",
                    }}
                  >
                    🛒
                  </div>
                  Your cart is empty
                </div>
              )}
            </div>

            {cart.length >
              0 && (
              <div
                style={{
                  borderTop:
                    "1px solid #e2e8f0",
                  marginTop:
                    "15px",
                  paddingTop:
                    "15px",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      "8px",
                  }}
                >
                  <span>
                    Subtotal
                  </span>
                  <b>
                    ₹
                    {
                      subtotalAmount
                    }
                  </b>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      "8px",
                  }}
                >
                  <span>
                    Delivery
                  </span>
                  <b
                    style={{
                      color:
                        deliveryFee ===
                        0
                          ? "#16a34a"
                          : "#0f172a",
                    }}
                  >
                    {deliveryFee ===
                    0
                      ? "FREE"
                      : `₹${deliveryFee}`}
                  </b>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    fontSize:
                      "18px",
                    marginBottom:
                      "15px",
                  }}
                >
                  <b>Total</b>
                  <b
                    style={{
                      color:
                        "#1d4ed8",
                    }}
                  >
                    ₹
                    {
                      grandTotal
                    }
                  </b>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(
                      false
                    );
                    setIsCheckoutOpen(
                      true
                    );
                  }}
                  style={{
                    width:
                      "100%",
                    padding:
                      "13px",
                    backgroundColor:
                      "#1d4ed8",
                    color:
                      "white",
                    border:
                      "none",
                    borderRadius:
                      "10px",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {isCheckoutOpen && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            backgroundColor:
              "rgba(0,0,0,.6)",
            backdropFilter:
              "blur(5px)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 3000,
            padding: "20px",
          }}
        >
          <div
            className="fade-modal"
            style={{
              width:
                "100%",
              maxWidth:
                "550px",
              backgroundColor:
                "white",
              borderRadius:
                "20px",
              padding:
                "28px",
              maxHeight:
                "90vh",
              overflowY:
                "auto",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                  }}
                >
                  📦 Checkout
                </h2>

                <p
                  style={{
                    color:
                      "#64748b",
                    fontSize:
                      "13px",
                  }}
                >
                  Enter your delivery
                  details
                </p>
              </div>

              <button
                onClick={() =>
                  setIsCheckoutOpen(
                    false
                  )
                }
                style={{
                  border:
                    "none",
                  background:
                    "#f1f5f9",
                  borderRadius:
                    "50%",
                  width:
                    "34px",
                  height:
                    "34px",
                  cursor:
                    "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                background:
                  "#eff6ff",
                padding:
                  "15px",
                borderRadius:
                  "12px",
                margin:
                  "15px 0 20px",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>
                  Total Items
                </span>
                <b>
                  {
                    totalItemsCount
                  }
                </b>
              </div>

              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  marginTop:
                    "8px",
                }}
              >
                <span>
                  Delivery
                </span>
                <b>
                  {deliveryFee ===
                  0
                    ? "FREE"
                    : `₹${deliveryFee}`}
                </b>
              </div>

              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  marginTop:
                    "10px",
                  fontSize:
                    "18px",
                  color:
                    "#1d4ed8",
                }}
              >
                <b>Total</b>
                <b>
                  ₹
                  {
                    grandTotal
                  }
                </b>
              </div>
            </div>

            <input
              value={shippingName}
              onChange={(e) =>
                setShippingName(
                  e.target
                    .value
                )
              }
              placeholder="Full Name"
              style={{
                width:
                  "100%",
                padding:
                  "13px",
                marginBottom:
                  "12px",
                border:
                  "1px solid #cbd5e1",
                borderRadius:
                  "9px",
              }}
            />

            <input
              value={shippingPhone}
              onChange={(e) =>
                setShippingPhone(
                  e.target
                    .value
                )
              }
              placeholder="Mobile Number"
              style={{
                width:
                  "100%",
                padding:
                  "13px",
                marginBottom:
                  "12px",
                border:
                  "1px solid #cbd5e1",
                borderRadius:
                  "9px",
              }}
            />

            <textarea
              value={shippingAddress}
              onChange={(e) =>
                setShippingAddress(
                  e.target
                    .value
                )
              }
              placeholder="Complete Delivery Address"
              rows="4"
              style={{
                width:
                  "100%",
                padding:
                  "13px",
                marginBottom:
                  "18px",
                border:
                  "1px solid #cbd5e1",
                borderRadius:
                  "9px",
                resize:
                  "vertical",
              }}
            />

            <button
              onClick={() => {
                if (
                  !shippingName ||
                  !shippingPhone ||
                  !shippingAddress
                ) {
                  alert(
                    "Please fill all delivery details."
                  );
                  return;
                }

                setIsCheckoutOpen(
                  false
                );
                setIsPaymentOpen(
                  true
                );
              }}
              style={{
                width:
                  "100%",
                padding:
                  "13px",
                backgroundColor:
                  "#1d4ed8",
                color:
                  "white",
                border:
                  "none",
                borderRadius:
                  "10px",
                fontWeight:
                  "700",
                cursor:
                  "pointer",
              }}
            >
              Continue to Payment →
            </button>
          </div>
        </div>
      )}

      {/* PAYMENT */}
      {isPaymentOpen && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            backgroundColor:
              "rgba(15,23,42,.75)",
            backdropFilter:
              "blur(6px)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 3500,
            padding: "20px",
          }}
        >
          <div
            className="fade-modal"
            style={{
              width:
                "100%",
              maxWidth:
                "500px",
              backgroundColor:
                "white",
              borderRadius:
                "20px",
              padding:
                "28px",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                  }}
                >
                  🔒 Secure Payment
                </h2>

                <p
                  style={{
                    color:
                      "#64748b",
                    fontSize:
                      "13px",
                  }}
                >
                  Choose payment method
                </p>
              </div>

              <button
                onClick={() =>
                  setIsPaymentOpen(
                    false
                  )
                }
                style={{
                  border:
                    "none",
                  background:
                    "#f1f5f9",
                  borderRadius:
                    "50%",
                  width:
                    "34px",
                  height:
                    "34px",
                  cursor:
                    "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                background:
                  "#eff6ff",
                padding:
                  "18px",
                borderRadius:
                  "14px",
                textAlign:
                  "center",
                margin:
                  "15px 0 20px",
              }}
            >
              <small>
                Amount Payable
              </small>

              <div
                style={{
                  fontSize:
                    "30px",
                  fontWeight:
                    "900",
                  color:
                    "#1d4ed8",
                }}
              >
                ₹
                {
                  grandTotal
                }
              </div>
            </div>

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(2,1fr)",
                gap: "10px",
              }}
            >
              {[
                ["upi", "📱", "UPI"],
                ["card", "💳", "Card"],
                [
                  "netbanking",
                  "🏦",
                  "Net Banking",
                ],
                [
                  "cod",
                  "💵",
                  "Cash on Delivery",
                ],
              ].map(
                ([
                  method,
                  icon,
                  label,
                ]) => (
                  <button
                    key={
                      method
                    }
                    onClick={() =>
                      setPaymentMethod(
                        method
                      )
                    }
                    style={{
                      padding:
                        "12px 5px",
                      border:
                        paymentMethod ===
                        method
                          ? "2px solid #1d4ed8"
                          : "1px solid #cbd5e1",
                      background:
                        paymentMethod ===
                        method
                          ? "#eff6ff"
                          : "white",
                      borderRadius:
                        "10px",
                      cursor:
                        "pointer",
                      fontWeight:
                        "700",
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          "20px",
                      }}
                    >
                      {icon}
                    </div>
                    <small>
                      {label}
                    </small>
                  </button>
                )
              )}
            </div>

            <div
              style={{
                marginTop:
                  "20px",
              }}
            >
              {paymentMethod ===
                "upi" && (
                <input
                  value={upiId}
                  onChange={(e) =>
                    setUpiId(
                      e.target
                        .value
                    )
                  }
                  placeholder="Enter UPI ID (example@upi)"
                  style={{
                    width:
                      "100%",
                    padding:
                      "13px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius:
                      "9px",
                  }}
                />
              )}

              {paymentMethod ===
                "card" && (
                <>
                  <input
                    value={
                      cardNumber
                    }
                    onChange={(e) =>
                      setCardNumber(
                        e.target
                          .value
                      )
                    }
                    placeholder="Card Number"
                    maxLength="19"
                    style={{
                      width:
                        "100%",
                      padding:
                        "13px",
                      marginBottom:
                        "10px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius:
                        "9px",
                    }}
                  />

                  <div
                    style={{
                      display:
                        "flex",
                      gap: "10px",
                    }}
                  >
                    <input
                      value={
                        cardExpiry
                      }
                      onChange={(e) =>
                        setCardExpiry(
                          e.target
                            .value
                        )
                      }
                      placeholder="MM/YY"
                      style={{
                        flex: 1,
                        padding:
                          "13px",
                        border:
                          "1px solid #cbd5e1",
                        borderRadius:
                          "9px",
                      }}
                    />

                    <input
                      value={
                        cardCvv
                      }
                      onChange={(e) =>
                        setCardCvv(
                          e.target
                            .value
                        )
                      }
                      placeholder="CVV"
                      type="password"
                      maxLength="3"
                      style={{
                        flex: 1,
                        padding:
                          "13px",
                        border:
                          "1px solid #cbd5e1",
                        borderRadius:
                          "9px",
                      }}
                    />
                  </div>
                </>
              )}

              {paymentMethod ===
                "netbanking" && (
                <select
                  value={
                    selectedBank
                  }
                  onChange={(e) =>
                    setSelectedBank(
                      e.target
                        .value
                    )
                  }
                  style={{
                    width:
                      "100%",
                    padding:
                      "13px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius:
                      "9px",
                  }}
                >
                  <option>
                    HDFC Bank
                  </option>
                  <option>
                    State Bank of India
                  </option>
                  <option>
                    ICICI Bank
                  </option>
                  <option>
                    Axis Bank
                  </option>
                  <option>
                    Kotak Mahindra Bank
                  </option>
                  <option>
                    Bank of Baroda
                  </option>
                </select>
              )}

              {paymentMethod ===
                "cod" && (
                <div
                  style={{
                    background:
                      "#f0fdf4",
                    border:
                      "1px solid #bbf7d0",
                    padding:
                      "15px",
                    borderRadius:
                      "10px",
                    color:
                      "#166534",
                    fontSize:
                      "13px",
                  }}
                >
                  💵 Pay cash when your
                  order is delivered.
                </div>
              )}
            </div>

            <button
              disabled={
                isProcessing
              }
              onClick={
                processPayment
              }
              style={{
                width:
                  "100%",
                marginTop:
                  "20px",
                padding:
                  "14px",
                backgroundColor:
                  isProcessing
                    ? "#64748b"
                    : "#16a34a",
                color:
                  "white",
                border:
                  "none",
                borderRadius:
                  "10px",
                fontWeight:
                  "800",
                cursor:
                  isProcessing
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {isProcessing
                ? "⏳ Processing Payment..."
                : paymentMethod ===
                  "cod"
                ? "Confirm Order"
                : `Pay ₹${grandTotal} Securely`}
            </button>

            <p
              style={{
                textAlign:
                  "center",
                fontSize:
                  "10px",
                color:
                  "#94a3b8",
                marginBottom:
                  0,
              }}
            >
              🔒 Your payment information is
              protected
            </p>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {successOrder && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            backgroundColor:
              "rgba(15,23,42,.75)",
            backdropFilter:
              "blur(6px)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 5000,
            padding: "20px",
          }}
        >
          <div
            className="fade-modal"
            style={{
              width:
                "100%",
              maxWidth:
                "430px",
              backgroundColor:
                "white",
              borderRadius:
                "22px",
              padding:
                "35px",
              textAlign:
                "center",
            }}
          >
            <div
              style={{
                width:
                  "70px",
                height:
                  "70px",
                background:
                  "#dcfce7",
                color:
                  "#16a34a",
                borderRadius:
                  "50%",
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                fontSize:
                  "38px",
                margin:
                  "0 auto 20px",
              }}
            >
              ✓
            </div>

            <h2>
              Order Confirmed! 🎉
            </h2>

            <p
              style={{
                color:
                  "#64748b",
                fontSize:
                  "13px",
              }}
            >
              Thank you,{" "}
              {
                successOrder.customer
              }
              . Your order has been
              successfully placed.
            </p>

            <div
              style={{
                background:
                  "#f8fafc",
                padding:
                  "15px",
                borderRadius:
                  "12px",
                textAlign:
                  "left",
                fontSize:
                  "13px",
                margin:
                  "20px 0",
              }}
            >
              <p>
                <b>Order ID:</b>{" "}
                {
                  successOrder.id
                }
              </p>

              <p>
                <b>Amount:</b> ₹
                {
                  successOrder.amount
                }
              </p>

              <p>
                <b>Payment:</b>{" "}
                {successOrder.method ===
                "cod"
                  ? "Cash on Delivery"
                  : successOrder.method.toUpperCase()}
              </p>
            </div>

            <button
              onClick={() => {
                setSuccessOrder(
                  null
                );
                setCart([]);
                setShippingName(
                  ""
                );
                setShippingPhone(
                  ""
                );
                setShippingAddress(
                  ""
                );
                setUpiId("");
                setCardNumber("");
                setCardExpiry("");
                setCardCvv("");
              }}
              style={{
                width:
                  "100%",
                padding:
                  "13px",
                backgroundColor:
                  "#1d4ed8",
                color:
                  "white",
                border:
                  "none",
                borderRadius:
                  "10px",
                fontWeight:
                  "700",
                cursor:
                  "pointer",
              }}
            >
              Continue Shopping →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}