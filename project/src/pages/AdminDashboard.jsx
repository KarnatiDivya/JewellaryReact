import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialProductsInCode } from "./JewelryData";
import './AdminDashboard.css';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState(["", "", "", 0, []]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [currentView, setCurrentView] = useState("add");

    // Load products from localStorage + initial products
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const mergedProducts = [...initialProductsInCode.map(p => p.data), ...storedProducts];
        setProducts(mergedProducts);
    }, []);

    // Save newly added/edited/deleted products to localStorage
    useEffect(() => {
        const productsToStore = products.slice(initialProductsInCode.length);
        localStorage.setItem("products", JSON.stringify(productsToStore));
    }, [products]);

    // Check admin login
    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
        if (!isAdminLoggedIn) navigate("/admin-login");
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        navigate("/admin-login");
    };

    const handleAddOrEditProduct = () => {
        if (!newProduct[0] || !newProduct[1] || !newProduct[2]) {
            alert("Please fill all fields and provide an image URL");
            return;
        }

        const updatedProducts = [...products];
        if (editingIndex !== null) {
            updatedProducts[editingIndex] = newProduct;
            setEditingIndex(null);
        } else {
            updatedProducts.push(newProduct);
        }

        setProducts(updatedProducts);
        setNewProduct(["", "", "", 0, []]);
        setCurrentView("view");
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewProduct(products[index]);
        setCurrentView("add");
    };

    const handleDelete = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    const handleLike = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index][3] += 1;
        setProducts(updatedProducts);
    };

    const handleRating = (index, rating) => {
        const updatedProducts = [...products];
        updatedProducts[index][4].push(rating);
        setProducts(updatedProducts);
    };

    const calculateAverage = (ratings) => {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((a, b) => a + b, 0);
        return (sum / ratings.length).toFixed(1);
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome, Admin 👑</h2>

            <div className="button-group">
                <button onClick={() => setCurrentView("add")}>Add Product</button>
                <button onClick={() => setCurrentView("view")}>View All Products</button>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {currentView === "add" && (
                <div className="form-container">
                    <h3>{editingIndex !== null ? "Edit Product" : "Add Product"}</h3>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProduct[0]}
                        onChange={(e) => setNewProduct([e.target.value, newProduct[1], newProduct[2], newProduct[3], newProduct[4]])}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct[1]}
                        onChange={(e) => setNewProduct([newProduct[0], e.target.value, newProduct[2], newProduct[3], newProduct[4]])}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct[2]}
                        onChange={(e) => setNewProduct([newProduct[0], newProduct[1], e.target.value, newProduct[3], newProduct[4]])}
                    />
                    <button onClick={handleAddOrEditProduct}>
                        {editingIndex !== null ? "Update Product" : "Add Product"}
                    </button>
                </div>
            )}

            {currentView === "view" && (
                <div className="cards-container">
                    {products.length === 0 ? <p>No products yet</p> : (
                        products.map((product, index) => (
                            <div className="product-card" key={index}>
                                <img src={product[2]} alt={product[0]} />
                                <h4>{product[0]}</h4>
                                <p>Price: ${product[1]}</p>
                                <p>Average Rating: {calculateAverage(product[4])} ⭐</p>
                                <div className="rate-buttons">
                                    <span>Rate: </span>
                                    {[1,2,3,4,5].map(r => (
                                        <button key={r} onClick={() => handleRating(index, r)}>{r}⭐</button>
                                    ))}
                                </div>
                                <p>
                                    Likes: {product[3]}{" "}
                                    <button className="like-btn" onClick={() => handleLike(index)}>❤️</button>
                                </p>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}







// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './AdminDashboard.css';

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   // Hardcoded initial products in code
//   const initialProductsInCode = [
//     ["Laptop", "1000", "https://example.com/laptop.jpg", 2, [5, 4, 5]],
//     ["Headphones", "150", "https://example.com/headphones.jpg", 3, [3, 4]]
//   ];

//   // State for products array (in-memory)
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState(["", "", "", 0, []]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [currentView, setCurrentView] = useState("add");

//   // Load products from localStorage + initial code products
//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
//     // Merge initial hardcoded products with stored products
//     const mergedProducts = [...initialProductsInCode, ...storedProducts];
//     setProducts(mergedProducts);
//   }, []);

//   // Save **newly added/edited/deleted products** to localStorage
//   useEffect(() => {
//     // Only store products added via admin (skip initial hardcoded ones if you want)
//     const productsToStore = products.slice(initialProductsInCode.length);
//     localStorage.setItem("products", JSON.stringify(productsToStore));
//   }, [products]);

//   // Check admin login
//   useEffect(() => {
//     const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
//     if (!isAdminLoggedIn) navigate("/admin-login");
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("isAdminLoggedIn");
//     navigate("/admin-login");
//   };

//   const handleAddOrEditProduct = () => {
//     if (!newProduct[0] || !newProduct[1] || !newProduct[2]) {
//       alert("Please fill all fields and provide an image URL");
//       return;
//     }

//     const updatedProducts = [...products];
//     if (editingIndex !== null) {
//       updatedProducts[editingIndex] = newProduct;
//       setEditingIndex(null);
//     } else {
//       updatedProducts.push(newProduct);
//     }

//     setProducts(updatedProducts);
//     setNewProduct(["", "", "", 0, []]);
//     setCurrentView("view");
//   };

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     setNewProduct(products[index]);
//     setCurrentView("add");
//   };

//   const handleDelete = (index) => {
//     setProducts(products.filter((_, i) => i !== index));
//   };

//   const handleLike = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][3] += 1;
//     setProducts(updatedProducts);
//   };

//   const handleRating = (index, rating) => {
//     const updatedProducts = [...products];
//     updatedProducts[index][4].push(rating);
//     setProducts(updatedProducts);
//   };

//   const calculateAverage = (ratings) => {
//     if (ratings.length === 0) return 0;
//     const sum = ratings.reduce((a, b) => a + b, 0);
//     return (sum / ratings.length).toFixed(1);
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, Admin 👑</h2>
//       <p>This is your Admin Dashboard.</p>

//       {/* Main Buttons */}
//       <div className="button-group">
//         <button onClick={() => setCurrentView("add")}>Add Product</button>
//         <button onClick={() => setCurrentView("view")}>View All Products</button>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       {/* Add/Edit Form */}
//       {currentView === "add" && (
//         <div className="form-container">
//           <h3>{editingIndex !== null ? "Edit Product" : "Add Product"}</h3>
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={newProduct[0]}
//             onChange={(e) =>
//               setNewProduct([e.target.value, newProduct[1], newProduct[2], newProduct[3], newProduct[4]])
//             }
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newProduct[1]}
//             onChange={(e) =>
//               setNewProduct([newProduct[0], e.target.value, newProduct[2], newProduct[3], newProduct[4]])
//             }
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={newProduct[2]}
//             onChange={(e) =>
//               setNewProduct([newProduct[0], newProduct[1], e.target.value, newProduct[3], newProduct[4]])
//             }
//           />
//           <button onClick={handleAddOrEditProduct}>
//             {editingIndex !== null ? "Update Product" : "Add Product"}
//           </button>
//         </div>
//       )}

//       {/* View Products */}
//       {currentView === "view" && (
//         <div className="cards-container">
//           {products.length === 0 ? (
//             <p>No products yet</p>
//           ) : (
//             products.map((product, index) => (
//               <div className="product-card" key={index}>
//                 <img src={product[2]} alt={product[0]} />
//                 <h4>{product[0]}</h4>
//                 <p>Price: ${product[1]}</p>
//                 <p>Average Rating: {calculateAverage(product[4])} ⭐</p>
//                 <div className="rate-buttons">
//                   <span>Rate: </span>
//                   {[1,2,3,4,5].map(r => (
//                     <button key={r} onClick={() => handleRating(index, r)}>{r}⭐</button>
//                   ))}
//                 </div>
//                 <p>
//                   Likes: {product[3]}{" "}
//                   <button className="like-btn" onClick={() => handleLike(index)}>❤️</button>
//                 </p>
//                 <div className="card-buttons">
//                   <button onClick={() => handleEdit(index)}>Edit</button>
//                   <button onClick={() => handleDelete(index)}>Delete</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './AdminDashboard.css';

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     image: "",
//     likes: 0,
//     ratings: [], // array of user ratings
//   });
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [currentView, setCurrentView] = useState("add"); // 'add' | 'view'

//   useEffect(() => {
//     const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
//     if (!isAdminLoggedIn) navigate("/admin-login");
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("isAdminLoggedIn");
//     navigate("/admin-login");
//   };

//   const handleAddOrEditProduct = () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.image) {
//       alert("Please fill all fields and provide an image URL");
//       return;
//     }

//     if (editingIndex !== null) {
//       const updatedProducts = [...products];
//       updatedProducts[editingIndex] = newProduct;
//       setProducts(updatedProducts);
//       setEditingIndex(null);
//     } else {
//       setProducts([...products, newProduct]);
//     }

//     setNewProduct({ name: "", price: "", image: "", likes: 0, ratings: [] });
//     setCurrentView("view");
//   };

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     setNewProduct(products[index]);
//     setCurrentView("add");
//   };

//   const handleDelete = (index) => {
//     setProducts(products.filter((_, i) => i !== index));
//   };

//   const handleLike = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts[index].likes += 1;
//     setProducts(updatedProducts);
//   };

//   const handleRating = (index, userRating) => {
//     const updatedProducts = [...products];
//     updatedProducts[index].ratings.push(userRating);
//     setProducts(updatedProducts);
//   };

//   const calculateAverage = (ratings) => {
//     if (ratings.length === 0) return 0;
//     const sum = ratings.reduce((a, b) => a + b, 0);
//     return (sum / ratings.length).toFixed(1);
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, Admin 👑</h2>
//       <p>This is your Admin Dashboard.</p>

//       {/* Main Buttons */}
//       <div className="button-group">
//         <button onClick={() => setCurrentView("add")}>Add Product</button>
//         <button onClick={() => setCurrentView("view")}>View All Products</button>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       {/* Add/Edit Form */}
//       {currentView === "add" && (
//         <div className="form-container">
//           <h3>{editingIndex !== null ? "Edit Product" : "Add Product"}</h3>
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={newProduct.name}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, name: e.target.value })
//             }
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, price: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={newProduct.image}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, image: e.target.value })
//             }
//           />
//           <button onClick={handleAddOrEditProduct}>
//             {editingIndex !== null ? "Update Product" : "Add Product"}
//           </button>
//         </div>
//       )}

//       {/* View Products */}
//       {currentView === "view" && (
//         <div className="cards-container">
//           {products.length === 0 ? (
//             <p>No products yet</p>
//           ) : (
//             products.map((product, index) => (
//               <div className="product-card" key={index}>
//                 <img src={product.image} alt={product.name} />
//                 <h4>{product.name}</h4>
//                 <p>Price: ${product.price}</p>
//                 <p>
//                   Average Rating: {calculateAverage(product.ratings)} ⭐
//                 </p>
//                 <div className="rate-buttons">
//                   <span>Rate: </span>
//                   {[1,2,3,4,5].map((r) => (
//                     <button key={r} onClick={() => handleRating(index, r)}>{r}⭐</button>
//                   ))}
//                 </div>
//                 <p>
//                   Likes: {product.likes}{" "}
//                   <button className="like-btn" onClick={() => handleLike(index)}>❤️</button>
//                 </p>
//                 <div className="card-buttons">
//                   <button onClick={() => handleEdit(index)}>Edit</button>
//                   <button onClick={() => handleDelete(index)}>Delete</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


