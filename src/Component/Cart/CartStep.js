import React,{Component} from 'react';
import {Step,Icon } from 'semantic-ui-react'
class CartStep extends Component{
    constructor(props)
    {
        super(props);
        this.state={ IsPayment : props.sure }
    }
    componentWillReceiveProps(next)
    {
       if(next.sure)
       {
           this.setState({IsPayment:true})
       } 
    }
   
    render() {
      return (
        <>   
             <Step.Group ordered>
                <Step completed>
                    <Step.Content>
                        <Step.Title>Order <Icon name='cart arrow down'/></Step.Title>
                    </Step.Content>
                </Step>
                <Step completed={this.state.IsPayment} >
                    <Step.Content>
                        <Step.Title>Payment <Icon name='payment'/></Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        </>
      );
    }
  
  }
  
  export default CartStep  ;