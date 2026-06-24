
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from 'react-router-dom'

import { EcommProvider } from './contexts/ContextProvider';
import { AddressProvider } from "./contexts/AddressContext";

import BookDetails from './pages/BookDetails';
import UserDetails from './pages/UserDetails';
import Address from "./pages/Address";
import AddAddress from './pages/AddAddress';
import UpdateAddress from './pages/UpdateAddress';
import Cart from "./pages/Cart";
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import ProductListing from './pages/ProductListing';
import Home from './pages/Home';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import './App.css'

const Layout = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/productListing",
        element: <ProductListing />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/book/:bookId",
        element: <BookDetails />
      },
      {
        path: "/userDetails",
        element: <UserDetails />
      },
      {
        path: "/address",
        element: <Address />
      },
      {
        path: "/addAddress",
        element: <AddAddress />
      },
      {
        path: "/updateAddress",
        element: <UpdateAddress />
      },
      {
        path: "/checkout",
        element: <Checkout />
      }
    ]
  }
])

function App() {
  return (
    <EcommProvider>
      <AddressProvider>
        <RouterProvider router={router} />
      </AddressProvider>
    </EcommProvider>
  )
}

export default App
