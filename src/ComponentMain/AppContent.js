import React,{Component} from 'react';
import { Route, Switch } from 'react-router-dom';

// layouts
import HomePage  from '../Layouts/Homepage';
import ProductPage from '../Layouts/Productpage';
import CartPage from '../Layouts/Cartpage';
import AdminPage from '../Layouts/Adminpage';
import LoginPage from '../Layouts/Loginpage';
import OrderPage from '../Layouts/Orderpage';
import PayBanking from '../Layouts/PayBanking';



export const Url = {
  Home: '/',
  Login : '/sign',
  Product: '/product',
  Cart: '/cart/:sucess',
  Order :'/order',
  Admin: '/management',
  Payment :'/paymentbanking',



};
class RouteContent extends Component{
    render() {
      return (
          <Switch>
             <Route  exact path={ Url.Home} component={HomePage} />
             <Route  path={ Url.Product}    component={ProductPage} />
             <Route  path={ Url.Cart}       component={CartPage} />
             <Route  path={ Url.Login}      component={LoginPage} />
             <Route  path={ Url.Admin}      component={AdminPage} />
             <Route  path={ Url.Order}      component={OrderPage} />
             <Route  path={ Url.Payment}    component={PayBanking} />
          </Switch>
      );
    }
  
  }
  
  export default RouteContent;