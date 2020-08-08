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
class PaymentBangking extends Component{
    constructor(props) {
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
    
      internetBankingConfigure = () => {
        OmiseCard.configure({
          defaultPaymentMethod: "internet_banking",
          otherPaymentMethods: [
            "bill_payment_tesco_lotus",
            "alipay",
            "pay_easy",
            "net_banking",
            "convenience_store"
          ]
        });
        OmiseCard.configureButton("#internet-banking");
        OmiseCard.attach();
      };
    
      omiseCardHandler = () => {
        const { cart,totalSale,date,order } = this.props;
        OmiseCard.open({
          frameDescription: "Invoice #3847",
          amount: (totalSale*100),
          onCreateTokenSuccess:async token => {

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
                        let Pay = await API.APIPost(URL_post.InternetBanking,data);//'pending'
                        switch(Pay.status)
                        {
                            case 'pending':
                              const { authorizeUri } = Pay;
                             if (authorizeUri) {
                                   window.location.href = authorizeUri;
                                 // window.open(authorizeUri, '_blank');
                               }
                            /*    
                                    this.refState({
                                        IsPay : true,
                                        authorizeUri : Pay.authorizeUri,
                                        data : data
                                    });
                            */
                             break;
                        }

                        /*
                        const { authorizeUri } = Pay;
                        if (authorizeUri) {
                          window.location.href = authorizeUri;
                        }
                        */
                        
                    
          },
          onFormClosed: () => {}
        });
      };
    
      handleClick = e => {
        e.preventDefault();
        this.internetBankingConfigure();
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
                        style={{marginTop : '10px'}}
                        id="internet-banking"
                        className="btn"
                        type="button"
                        disabled={this.props.totalSale===0}
                        onClick={this.handleClick}>
                            InternetBanking
                    </Button>
                    </form>
            </div>
        </>
      );
    }
  }
 
   
  export default connect()(PaymentBangking);