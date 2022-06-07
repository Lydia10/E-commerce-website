import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Success from './pages/Success';
import Search from './pages/Search';
import Subscribe from './pages/Subscribe';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/products/:category"  element={ <ProductList /> }></Route>
        <Route path="/product/:id"  element={ <Product /> }></Route>
        <Route path="/cart"  element={ <Cart /> }></Route>
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/register" element={ <Register /> }></Route>
        <Route path="/success"  element={ <Success />}></Route>
        <Route path="/search/:term"  element={ <Search /> }></Route>
        <Route path="/subscribe" element={ <Subscribe/> }></Route>
        <Route path="/"  element={ <Home /> }></Route>
      </Routes>          
    </Router>
  );
}

export default App;
