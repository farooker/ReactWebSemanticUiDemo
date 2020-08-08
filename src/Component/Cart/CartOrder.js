import React,{Component} from 'react';
import { Image, Item ,Divider,Grid, Menu, Segment,Input, Button, Card,Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CurrenDate from '../../Unit/Date';
import {baseurl} from '../../ServiceAPI/ServiceURL';
import AutoID from '../../Unit/AutoID';
import PayWithCreditCard from '../Payment/PaymentCreditCard';
import PayWithBanking from '../Payment/PaymentNetBanking';

import { Link } from 'react-router-dom';
import {Url } from '../../ComponentMain/AppContent';
import Notiflix from "notiflix";
class CartOrder extends Component{
    state={
            ItemShop : [],
               Total : 0,
                Date : '0000-00-00',
                 ID  : AutoID
         }
    componentWillMount=()=>  
    {
        let total = 0;
        this.props.cart.map(item => total += item.PRD_price*item.PRD_Amount);
        this.setState({ ItemShop : this.props.cart,Total : total ,Date : CurrenDate,ID:AutoID });   
    }
    componentWillReceiveProps=(nextprop)=>
    {
        let total = 0;
        nextprop.cart.map(item => total += item.PRD_price*item.PRD_Amount);
        this.setState({ItemShop : nextprop.cart,Total:total});  
      //  console.log(nextprop.cart.PRD_Amount);
    } 
    HandleClickDelete=(ID)=>(e)=>
    {
        e.preventDefault();
        this.props.dispatch({ type:'DELETE_CART', data :ID});  
    }
    HandleClickNextPay=(e)=>{
        e.preventDefault();
        this.props.StepPay({page :'2',ComPay:true })
    }
    HandleClickAmount=(item,Type)=>(e)=>
    {
        e.preventDefault();
        switch(Type)
        {
            case 'INCREMENT':
                    this.props.dispatch({ type:'INCREMENT_AMOUNT', data :item});  
            break;
            case 'SUBTRACT':
                    this.props.dispatch({ type:'SUBTRACT_AMOUNT', data :item});  
            break;
        }
       
    }
 
    render() {

     
      return (
        <>   
         <Grid>
             <Grid.Column width={12}>
                 <Item.Group  divided>
                     {
                        this.state.ItemShop===null ? null:
                         
                        this.state.ItemShop.map(row=>
                            <Item>
                                <Item.Image size='tiny' src={baseurl+row.PRD_img} />
                                <Item.Content>
                                    <Item.Header as='a'>{row.PRD_name}</Item.Header>
                                    <Item.Meta>ID  : <strong>{row.PRD_id}</strong></Item.Meta>
                                    <Item.Extra>Price :<strong>{row.PRD_price}฿</strong></Item.Extra>
                                    <Item.Extra>    
                                         <Button  circular icon='angle left' onClick={this.HandleClickAmount(row,'SUBTRACT')} />
                                         <strong> {row.PRD_Amount } </strong>
                                         <Button circular icon='angle right' onClick={this.HandleClickAmount(row,'INCREMENT')} />
                                    </Item.Extra>
    
                                    <Button  floating labeled   floated='right' onClick={this.HandleClickDelete(row.PRD_id)}>
                                    <Icon name='delete'/> <strong> Remove </strong>
                                </Button>
                                </Item.Content>
                            </Item>
                            )
                        
                     }
                 </Item.Group>
        </Grid.Column>
            <Grid.Column stretched width={4}>
                <Card>
                    <Card.Content>
                        <Card.Header>รายการสั่งซื้อสินค้า</Card.Header>
                        <Card.Meta>Order : {this.state.ID}</Card.Meta>
                        <Card.Meta>Date : {this.state.Date}</Card.Meta>
                          <Card.Description>
                               TotalSale <strong>{this.state.Total}฿</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                           <PayWithCreditCard  
                                 cart={this.state.ItemShop} 
                                 totalSale={this.state.Total} 
                                 date={this.state.Date}
                                 order={this.state.ID}
                                 StepPay={this.props.StepPay}
                               
                                 />
                             < PayWithBanking 

                                  cart={this.state.ItemShop} 
                                  totalSale={this.state.Total} 
                                  date={this.state.Date}
                                  order={this.state.ID}
                                  StepPay={this.props.StepPay}
                                 />
                        

                    </Card.Content>
                 </Card>
            </Grid.Column>
      </Grid>
         
        </>
      );
    }
  }
  const mapStateToProps = (state) => {
 
    return {
        cart: state
    }
  }
   
  export default connect(mapStateToProps)(CartOrder);