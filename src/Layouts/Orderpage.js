import React,{Component} from 'react';
import {Container } from 'semantic-ui-react';
import OrderAll from '../Component/OrderCompleted/OrderPayAll';
import Orderlist from '../Component/OrderCompleted/OrderPaylist';
import PayConfirm from '../Layouts/PayBanking';
import { Grid, Menu, Segment } from 'semantic-ui-react';
class OrderPage extends Component{
  constructor(props)
  {
    super(props);
    this.state={IsPay : true};
  }
  OnUpdateState=(nextState)=>{
    console.log(nextState)

  };
  
    render() {
        const styleContainer = {
                marginTop: "20px",
                marginBottom: "25px"
                }
      return (
        <>   
             <Container style={styleContainer}>
                <Grid>
                    <Grid.Column stretched width={4}>
                    <OrderAll/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                      {
                        this.state.IsPay === false ?  
                        <Orderlist/> :
                        <PayConfirm/>

                      }
                     
               
                     
                     
                    </Grid.Column>
                </Grid>
             </Container>
        </>
      );
    }
  
  }
  
  export default OrderPage ;