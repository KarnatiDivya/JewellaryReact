

// import React from "react";
// import { initialProductsInCode } from "./JewelryData";

// const Shop = ({ addToCart }) => {
//   // Group products by category
//   const productsByCategory = initialProductsInCode.reduce((acc, product) => {
//     const [name, price, image, rating] = product.data;
//     if (!acc[product.category]) acc[product.category] = [];
//     acc[product.category].push({ name, price, image, rating });
//     return acc;
//   }, {});

//   return (
//     <div style={{ padding: "20px" }}>
//       {Object.keys(productsByCategory).map((category) => (
//         <div key={category} style={{ marginBottom: "40px" }}>
//           <h2 style={{ textTransform: "capitalize" }}>{category}</h2>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//             {productsByCategory[category].map((product, index) => (
//               <div
//                 key={index}
//                 style={{
//                   border: "1px solid #ccc",
//                   borderRadius: "8px",
//                   padding: "10px",
//                   width: "200px",
//                   textAlign: "center",
//                 }}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   style={{ width: "100%", height: "150px", objectFit: "cover" }}
//                 />
//                 <h3>{product.name}</h3>
//                 <p>${product.price.toFixed(2)}</p>
//                 <p>Rating: {product.rating} ⭐</p>
//                 <button
//                   style={{
//                     padding: "5px 10px",
//                     border: "none",
//                     backgroundColor: "#007bff",
//                     color: "#fff",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => addToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Shop;


























import React from "react";
import { initialProductsInCode } from "./JewelryData"; // your products

function Shop({ cart, setCart }) {
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Group products by category
  const productsByCategory = initialProductsInCode.reduce((acc, product) => {
    const [name, price, image, rating] = product.data;
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push({ name, price, image, rating });
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px" }}>
      {Object.keys(productsByCategory).map((category) => (
        <div key={category} style={{ marginBottom: "40px" }}>
          <h2 style={{ textTransform: "capitalize" }}>{category}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {productsByCategory[category].map((product, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "200px",
                  textAlign: "center",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <p>Rating: {product.rating} ⭐</p>
                <button
                  style={{
                    padding: "5px 10px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shop;
