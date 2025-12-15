// // src/Components/Navbar.jsx
// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaBars } from "react-icons/fa";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import "./Navbar.css";

// function Navbar({ cartCount, user }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const logout = async () => {
//     await signOut(auth);
//   };

//   const closeMenu = () => setMenuOpen(false);

 
//   const goToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/"); 

//       setTimeout(() => {
//         const el = document.getElementById(id);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//       }, 200);
//     } else {//in home page
//       const el = document.getElementById(id);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//     }
//     closeMenu();
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <a
//           href="#home"
//           onClick={(e) => {
//             e.preventDefault();
//             goToSection("home");
//           }}
//           className="nav-logo"
//         >
//           YourJewels
//         </a>

//         <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <a
//             href="#home"
//             onClick={(e) => {
//               e.preventDefault();
//               goToSection("home");
//             }}
//           >
//             Home
//           </a>

//           <a
//             href="#about"
//             onClick={(e) => {
//               e.preventDefault();
//               goToSection("about");
//             }}
//           >
//             About
//           </a>

//           <a
//             href="#contact"
//             onClick={(e) => {
//               e.preventDefault();
//               goToSection("contact");
//             }}
//           >
//             Contact
//           </a>

//           <Link to="/shop" onClick={closeMenu}>
//             Shop
//           </Link>

//           {user ? (
//             <>
//               <Link
//                 to={user.email === "admin@example.com" ? "/admin-dashboard" : "/user-dashboard"}
//                 onClick={closeMenu}
//               >
//                 Dashboard
//               </Link>
//               <button onClick={logout} className="logout-btn">Logout</button>
//             </>
//           ) : (
//             <Link to="/login" onClick={closeMenu}>Login</Link>
//           )}

//           <Link to="/cart" onClick={closeMenu} className="cart-link">
//             <FaShoppingCart />
//             {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
//           </Link>
//         </div>

//         <button
//           className="menu-btn"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <FaBars />
//         </button>
        
//       </div>
//     </nav>
//   );
// }

// export default Navbar;








// // src/Components/Navbar.jsx
// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaBars } from "react-icons/fa";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import "./Navbar.css";

// function Navbar({ cartCount }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Logout function: signs out and redirects to AuthModal
//   const logout = async () => {
//     await signOut(auth);
//     navigate("/"); // redirect to AuthModal
//     closeMenu();
//   };

//   const closeMenu = () => setMenuOpen(false);

//   const goToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/"); // go to home first
//       setTimeout(() => {
//         const el = document.getElementById(id);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//       }, 200);
//     } else {
//       const el = document.getElementById(id);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//     }
//     closeMenu();
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <a
//           href="#home"
//           onClick={(e) => {
//             e.preventDefault();
//             goToSection("home");
//           }}
//           className="nav-logo"
//         >
//           YourJewels
//         </a>

//         <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <a
//             href="#home"
//             onClick={(e) => {
//               e.preventDefault();
//               goToSection("home");
//             }}
//           >
//             Home
//           </a>

//           <a
//             href="#about"
//             onClick={(e) => {
//               e.preventDefault();
//               goToSection("about");
//             }}
//           >
//             About
//           </a>

//           <a
//             href="#contact"
//             onClick={(e) => {
//               e.preventDefault();
//               goToSection("contact");
//             }}
//           >
//             Contact
//           </a>

//           <Link to="/shop" onClick={closeMenu}>
//             Shop
//           </Link>

//           {/* Logout button always visible */}
//           <Link to="/" onClick={logout} className="logout-link">
//             Logout
//           </Link>

//           <Link to="/cart" onClick={closeMenu} className="cart-link">
//             <FaShoppingCart />
//             {cartCount > 0 &&  <span className="cart-count">{cartCount}</span>}
//           </Link>
//         </div>

//         <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars />
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



















// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaBars } from "react-icons/fa";
// import { signOut } from "../firebase";
// import "./Navbar.css";

// function Navbar({ cartCount, onLogout }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const closeMenu = () => setMenuOpen(false);

//   const goToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const el = document.getElementById(id);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//       }, 200);
//     } else {
//       const el = document.getElementById(id);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//     }
//     closeMenu();
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <a
//           href="#home"
//           onClick={(e) => {
//             e.preventDefault();
//             goToSection("home");
//           }}
//           className="nav-logo"
//         >
//           YourJewels
//         </a>

//         <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <a href="#home" onClick={(e) => { e.preventDefault(); goToSection("home"); }}>Home</a>
//           <a href="#about" onClick={(e) => { e.preventDefault(); goToSection("about"); }}>About</a>
//           <a href="#contact" onClick={(e) => { e.preventDefault(); goToSection("contact"); }}>Contact</a>
//           <Link to="/shop" onClick={closeMenu}>Shop</Link>
//           <Link to="/" onClick={onLogout} className="logout-link">Logout</Link>
//           <Link to="/cart" onClick={closeMenu} className="cart-link">
//             <FaShoppingCart />
//             {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
//           </Link>
//         </div>

//         <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars />
//         </button>
//       </div> 
//     </nav>
//   );
// }

// export default Navbar;














// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaBars } from "react-icons/fa";
// import "./Navbar.css";

// function Navbar({ cartCount, onLogout }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const closeMenu = () => setMenuOpen(false);

//   const goToSection = (id) => {
//     if (location.pathname !== "/myapp") {
//       navigate("/myapp");
//       setTimeout(() => {
//         const el = document.getElementById(id);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//       }, 200);
//     } else {
//       const el = document.getElementById(id);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//     }
//     closeMenu();
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <a href="#home" onClick={(e) => { e.preventDefault(); goToSection("home"); }} className="nav-logo">
//           YourJewels
//         </a>

//         <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <a href="#home" onClick={(e) => { e.preventDefault(); goToSection("home"); }}>Home</a>
//           <a href="#about" onClick={(e) => { e.preventDefault(); goToSection("about"); }}>About</a>
//           <a href="#contact" onClick={(e) => { e.preventDefault(); goToSection("contact"); }}>Contact</a>
//           <Link to="/myapp/shop" onClick={closeMenu}>Shop</Link>
//           <Link to="/myapp/cart" onClick={closeMenu} className="cart-link">
//             <FaShoppingCart />
//             {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
//           </Link>
//           <button onClick={onLogout} className="logout-link">Logout</button>
//         </div>

//         <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
//           <FaBars />
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;










// Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ cartCount, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const goToSection = (id) => {
    if (location.pathname !== "/myapp") {
      navigate("/myapp");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await onLogout();       // perform logout
    navigate("/");          // redirect to login/home page
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goToSection("home");
          }}
          className="nav-logo"
        >
          YourJewels
        </a>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={(e) => { e.preventDefault(); goToSection("home"); }}>Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); goToSection("about"); }}>About</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); goToSection("contact"); }}>Contact</a>
          <Link to="/myapp/shop" onClick={closeMenu}>Shop</Link>
          <Link to="/myapp/cart" onClick={closeMenu} className="cart-link">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          {/* Logout as <a> styled like link
          <a href="#" onClick={handleLogout} className="logout-link">
            Logout
          </a> */}

<span
  onClick={handleLogout}
  className="logout-link"
  style={{ cursor: "pointer" }}
>
  Logout
</span>

        </div>


        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;










