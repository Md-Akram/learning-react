import { useEffect, useState } from 'react'

import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { app } from '../../firebase';

import './App.css'

// const products = [
//   {
//     name: "Product 1",
//     price: 10.99,
//     description: "This is product 1"
//   },
//   {
//     name: "Product 2",
//     price: 24.99,
//     description: "This is product 2"
//   },
//   {
//     name: "Product 3",
//     price: 7.50,
//     description: "This is product 3"
//   }
// ];

// const Counter = ({ initialValue }) => {
//   const [value, setValue] = useState(initialValue)

//   const handleIncrement = () => {
//     setValue(value + 1)
//   }

//   const handleDecrement = () => {
//     if (value > 0) {
//       setValue(value - 1)
//     }
//   }

//   return (
//     <>
//       <button onClick={handleIncrement}>+</button>
//       <h1>{value}</h1>
//       <button onClick={handleDecrement} disabled={value === 0}>-</button>
//     </>
//   )
// }

// const Product = ({ product, handleNumberOfProducts }) => {

//   const [isAddedToCart, setIsAddedToCart] = useState(false)

//   const handleAddToCart = () => {
//     setIsAddedToCart(true)
//     handleNumberOfProducts()
//   }
//   return (
//     <>
//       <h1>{product.name}</h1>
//       <h2>{product.price}</h2>
//       <h3>{product.description}</h3>
//       <button onClick={handleAddToCart} disabled={isAddedToCart}>
//         {isAddedToCart ? 'Added to Cart' : "Add to Cart"}
//       </button>
//     </>
//   )
// }

// const ProductList = ({ products }) => {
//   const [numberOfProducts, setNumberOfProducts] = useState(0)
//   const handleNumberOfProducts = () => {
//     setNumberOfProducts(numberOfProducts + 1)
//   }
//   return (
//     <>
//       {products.map((product) => <Product product={product} handleNumberOfProducts={handleNumberOfProducts} />)}
//       {numberOfProducts > 0 && <h1>{numberOfProducts} products added to the cart</h1>}
//     </>
//   )
// }

function App() {

  const [info, setInfo] = useState()

  const [userData, setUserData] = useState({ newName: "", newMessage: "" })

  useEffect(readData, [])

  const writeMessageData = (arg) => {
    const db = getDatabase(app);
    const msgListRef = ref(db, '/messages')
    const newMsgRef = push(msgListRef)
    set(newMsgRef, arg);
  }



  function readData() {
    const db = getDatabase(app);
    const usersRef = ref(db, '/messages');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.keys(data).map(key => data[key]);
      setInfo(dataArray)

    });
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userData.newMessage === '' && userData.newName === '') return
    writeMessageData(userData)
    setUserData({ newName: "", newMessage: "" })
  }




  return (
    // <Counter initialValue={Number(prompt('provide initial value'))} />
    // <ProductList products={products} />
    // <div>{data && data.map(user => <h1>{user.name}</h1>)}</div>
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">write your name</label>
        <input
          type="text"
          name="newName"
          id="name"
          value={userData.newName}
          onChange={handleChange} />
        <br />
        <label htmlFor="message">Your message</label>
        <input
          type="text"
          name="newMessage"
          id="message"
          value={userData.newMessage}
          onChange={handleChange} />
        <button type="submit">send</button>
      </form>

      {info && info.map((obj) => <p>{obj.newName}:{obj.newMessage}</p>)}
    </>
  )
}

export default App
