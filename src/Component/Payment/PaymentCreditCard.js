import React,{Component} from 'react';
import Script from "react-load-script";
import {publicKey} from '../Payment/omiseKey';
import * as API  from '../../ServiceAPI/ServiceModel';
import {URL_post} from '../../ServiceAPI/ServiceURL';
import { connect } from 'react-redux';
import { Image, Item ,Divider,Grid, Menu, Segment,Input, Button, Card,Icon } from 'semantic-ui-react';
import CurrenDate from '../../Unit/Date';
import {baseurl} from '../../ServiceAPI/ServiceURL';
import { Link } from 'react-router-dom';
import {Url } from '../../ComponentMain/AppContent';
import Notiflix from "notiflix";

let OmiseCard;
class PaymentCreditCard extends Component{
    
    constructor(props)
    {
        super(props);
        this.refState =  props.StepPay;
    }
  
    handleScriptLoad = () => {
        OmiseCard = window.OmiseCard;
        OmiseCard.configure({
          publicKey,
          frameLabel: "Farook Shop",
          submitLabel: "Payment now",
          currency: "thb"
        });
      };

      creditCardConfigure = () => {
        OmiseCard.configure({
          defaultPaymentMethod: "credit_card",
          otherPaymentMethods: []
        });
        OmiseCard.configureButton("#credit-card");
        OmiseCard.attach();
      };
    
      omiseCardHandler = () => {
        const { cart,totalSale,date,order } = this.props;
        OmiseCard.open({
          frameDescription: "Invoice #3847",
          amount:  (totalSale*100),
          onCreateTokenSuccess: async token => {
            const data = {
                            email   :  JSON.parse(sessionStorage.getItem('data_set')).Email, 
                            name    :  JSON.parse(sessionStorage.getItem('data_set')).Name, 
                            id      :  JSON.parse(sessionStorage.getItem('data_set')).ID, 
                            token   :  token,
                            cart    :  cart,
                            current :  date,
                            order   :  order,  
                            amount  :  (totalSale*100), 
                         }
            let Pay = await API.APIPost(URL_post.CreditCard,data);
            switch(Pay.status)
            {
                case false :
                    cart.map(item=> this.props.dispatch({ type:'DELETE_CART', data :item.PRD_id}))
                    this.refState({IsPay : true});  
                break;
            }
            
            console.log(Pay);
          },
          onFormClosed: () => {}
        });
    
      };

      handleClick = e => {
        e.preventDefault();
        this.creditCardConfigure();
        this.omiseCardHandler();
      };
   
    render() {

     
      return (
        <>   
        <div className="own-form">
            <Script
            url="https://cdn.omise.co/omise.js"
            onLoad={this.handleScriptLoad}
            />

            <form>
            <Button  fluid
                id="credit-card"
                className="btn"
                type="button"
                disabled={this.props.totalSale===0}
                onClick={this.handleClick}
            >Credit Card
            </Button>
            </form>
      </div>
        </>
      );
    }
  }
 
   
  export default connect()(PaymentCreditCard);