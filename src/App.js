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



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route exact path='/products'>
              <Products></Products>
            </Route>
            <PrivateRoute path="/placeOrder/:id">
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>

            <Route path='/login'>
              <LoginToggle></LoginToggle>
            </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard></Dashboard>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
