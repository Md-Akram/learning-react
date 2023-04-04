import { useState } from 'react'
import './App.css'

const products = [
  {
    name: "Product 1",
    price: 10.99,
    description: "This is product 1"
  },
  {
    name: "Product 2",
    price: 24.99,
    description: "This is product 2"
  },
  {
    name: "Product 3",
    price: 7.50,
    description: "This is product 3"
  }
];

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

const Product = ({ product, handleNumberOfProducts }) => {

  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    handleNumberOfProducts()
  }
  return (
    <>
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <h3>{product.description}</h3>
      <button onClick={handleAddToCart} disabled={isAddedToCart}>
        {isAddedToCart ? 'Added to Cart' : "Add to Cart"}
      </button>
    </>
  )
}

const ProductList = ({ products }) => {
  const [numberOfProducts, setNumberOfProducts] = useState(0)
  const handleNumberOfProducts = () => {
    setNumberOfProducts(numberOfProducts + 1)
  }
  return (
    <>
      {products.map((product) => <Product product={product} handleNumberOfProducts={handleNumberOfProducts} />)}
      {numberOfProducts > 0 && <h1>{numberOfProducts} products added to the cart</h1>}
    </>
  )
}

function App() {
  return (
    // <Counter initialValue={Number(prompt('provide initial value'))} />
    <ProductList products={products} />
  )
}

export default App
