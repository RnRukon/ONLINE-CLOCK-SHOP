import 'bootstrap/dist/css/bootstrap.min.css';
import "tailwindcss/tailwind.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home';
import AuthProvider from './Context/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard';
// import PrivateRoute from './Login/PrivateRoute/PrivateRoute';
import LoginToggle from './Login/LoginToggle/LoginToggle';
import PlaceOrder from './Pages/Home/HomeProducts/HomeProduct/PlaceOrder/PlaceOrder';
import Products from './Pages/Home/Products/Products';
import PrivateRoute from './Login/LoginToggle/PrivateRoute/PrivateRoute';
import NoteFound from './Pages/NoteFound/NoteFound';
import Success from './Pages/Home/HomeProducts/HomeProduct/PlaceOrder/Success';




function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/home'>
              <Home></Home>
            </Route>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route exact path='/products'>
              <Products></Products>
            </Route>
            <Route exact path='/success/:id'>
              <Success></Success>
            </Route>

            <PrivateRoute path="/placeOrder/:id">
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>

            <Route exact path='/login'>
              <LoginToggle></LoginToggle>
            </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route exact path='*'>
              <NoteFound></NoteFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
