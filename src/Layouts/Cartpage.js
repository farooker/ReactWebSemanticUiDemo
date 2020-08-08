import React,{Component} from 'react';
import {Container ,Step, } from 'semantic-ui-react';
import CartStep from '../Component/Cart/CartStep';
import CartOrder from '../Component/Cart/CartOrder';
import CartPayment from '../Component/Cart/CartPayment';
class CartPage extends Component{
  constructor(props)
  {
    super(props);
    this.state={ 
                ComPay: this.props.match.params.sucess==='sucessful' ?true : false,
                authorizeUri:'',
                Item : '' 
              };

            

    this.updateStatePay=this.updateStatePay.bind(this);
    this.getComponent= this.getComponent.bind(this);
  }

 updateStatePay(next)
 {
    this.setState({
                    ComPay : next.IsPay,
                    authorizeUri:next.authorizeUri,
                    Item : next.data
                  })
 }
 getComponent=(Selected)=>{
    switch(Selected){
      case  false: 
        return  <CartOrder StepPay={this.updateStatePay}/>;
      case true: 
        return <CartPayment PaymentItem={this.state.Item} authorizeUri={this.state.authorizeUri} />; 
    }
  }
    render() {
        const styleContainer = {
                marginTop: "20px",
                marginBottom: "25px"
                }
      return (
        <>   
             <Container style={styleContainer}>
               <CartStep  sure={this.state.ComPay}/>
              {
                this.getComponent(this.state.ComPay)
              }
             </Container>
        </>
      );
    }
  
  }
  
  export default CartPage ;