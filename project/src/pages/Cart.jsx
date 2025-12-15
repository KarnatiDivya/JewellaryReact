// import React from "react";

// const Cart = ({ cart }) => {
//   return (
//     <div style={{ border: "1px solid #000", padding: "10px", marginBottom: "20px" }}>
//       <h2>Cart ({cart.length})</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cart.map((item, index) => (
//             <li key={index}>
//               {item.name} - ${item.price.toFixed(2)}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Cart;















import React from "react";

function Cart({ cart, setCart }) {
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
              }}
            >
              <span>{item.name} - ${item.price.toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(index)}
                style={{
                  border: "none",
                  background: "red",
                  color: "white",
                  padding: "2px 6px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
