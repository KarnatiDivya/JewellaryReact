
// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// import AuthModal from "./Components/AuthModal.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import MyApp from "./MyApp.jsx";

// function AppContent() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{ textAlign: "center", marginTop: "2em" }}>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<AuthModal />} />
//         <Route path="/admin-login" element={<AdminLogin />} />

//         {/* Protected Routes */}
//         <Route
//           path="/admin-dashboard"
//           element={user?.email === "admin@gmail.com" ? <AdminDashboard /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/myapp"
//           element={user && user.email !== "admin@gmail.com" ? <MyApp /> : <Navigate to="/" />}
//         />
       


//         {/* Catch-all redirect based on user type */}
//         <Route
//           path="*"
//           element={
//             user
//               ? user.email === "admin@gmail.com"
//                 ? <Navigate to="/admin-dashboard" />
//                 : <Navigate to="/myapp" />
//               : <Navigate to="/" />
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }




// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";

// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// import AuthModal from "./Components/AuthModal.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import MyApp from "./MyApp.jsx";

// function AppContent() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

//   return (
//     <div style={{ textAlign: "center", marginTop: "2em" }}>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<AuthModal />} />
//         <Route path="/admin-login" element={<AdminLogin />} />

//         {/* ADMIN Protected Route (uses localStorage, NOT Firebase) */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             isAdminLoggedIn ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/admin-login" />
//             )
//           }
//         />

//         {/* USER Protected Route (uses Firebase auth) */}
//         <Route
//           path="/myapp"
//           element={
//             user && !isAdminLoggedIn ? <MyApp /> : <Navigate to="/" />
//           }
//         />

//         {/* Catch-all redirection */}
//         <Route
//           path="*"
//           element={
//             isAdminLoggedIn ? (
//               <Navigate to="/admin-dashboard" />
//             ) : user ? (
//               <Navigate to="/myapp" />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }






// import React, { useState } from "react";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";

// const App = () => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   return (
//     <div>
//       <h1>My Jewelry Shop</h1>
//       <Cart cart={cart} />
//       <Shop addToCart={addToCart} />
//     </div>
//   );
// };

// export default App;













import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import AuthModal from "./Components/AuthModal.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import MyApp from "./MyApp.jsx";

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <p>Loading...</p>;

  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AuthModal />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin Protected Route */}
      <Route
        path="/admin-dashboard"
        element={
          isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />
        }
      />

      {/* User Protected Route */}
      <Route
        path="/myapp/*"
        element={user && !isAdminLoggedIn ? <MyApp /> : <Navigate to="/" />}
      />

      {/* Catch-all */}
      <Route
        path="*"
        element={
          isAdminLoggedIn ? (
            <Navigate to="/admin-dashboard" />
          ) : user ? (
            <Navigate to="/myapp" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}











