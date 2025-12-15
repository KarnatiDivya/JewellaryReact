// src/Components/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "../firebase"; 

import "./AuthModal.css"; 

export default function AuthModal() {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Redirect based on email
        if (currentUser.email === "admin@gmail.com") {
          navigate("/admin-dashboard");
        } else {
          navigate("/myapp"); // <-- normal user goes to MyApp.jsx
        }
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleAuth = async () => {
    setError("");
    try {
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setUser(result.user);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser(result.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const goToAdminLogin = () => {
    navigate("/admin-login");
  };

  return (
    <div className="auth-modal">
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleAuth}>
            {isSignup ? "Create Account" : "Login"}
          </button>

          {error && <p className="error">{error}</p>}

          <p style={{ marginTop: "1em" }}>
            {isSignup ? "Already have an account?" : "Don’t have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              style={{ marginLeft: "0.5em" }}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>

          {/* Admin Login Button */}
          <button 
            onClick={goToAdminLogin} 
            style={{ marginTop: "1em", display: "block" }}
            className="admin-login-btn"
          >
            Admin Login
          </button>
        </>
      )}
    </div>
  );
}















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import {
//   auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "../firebase"; 

// import "./AuthModal.css"; 

// export default function AuthModal() {
//   const [isSignup, setIsSignup] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");

//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
        
//         navigate(currentUser.email === "admin@gmail.com" ? "/admin-dashboard" : "/user-dashboard");
//       }
//     });
//     return unsubscribe;
//   }, [navigate]);

//   const handleAuth = async () => {
//     setError("");
//     try {
//       if (isSignup) {
//         const result = await createUserWithEmailAndPassword(auth, email, password);
//         setUser(result.user);
//       } else {
//         const result = await signInWithEmailAndPassword(auth, email, password);
//         setUser(result.user);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <>
//     <div className="auth-modal">
//       <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

//       {user ? (
//         <div>
//           <p>Welcome, {user.email}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleAuth}>
//             {isSignup ? "Create Account" : "Login"}
//           </button>

//           {error && <p className="error">{error}</p>}

//           <p style={{ marginTop: "1em" }}>
//             {isSignup ? "Already have an account?" : "Don’t have an account?"}
//             <button
//               onClick={() => setIsSignup(!isSignup)}
//               style={{ marginLeft: "0.5em" }}
//             >
//               {isSignup ? "Sign In" : "Sign Up"}
//             </button>
//           </p>
//         </>
//       )}
//     </div>
//     </>
//   );
// }
