import React,{Component} from 'react';
import { Card, Image,Icon,Button  } from 'semantic-ui-react';
import {connect } from 'react-redux';
import Notiflix from "notiflix";
import {baseurl} from '../../ServiceAPI/ServiceURL';
class  ProductSale extends Component{

HandleClickAdd=(e)=>
{
    e.preventDefault();
   
     switch(JSON.parse(sessionStorage.getItem('data_set')))
     {
         case null :  Notiflix.Report.Warning('Warning','Please login .','Click');  break;
          default  :  
                    let  data = {
                                  PRD_id     : this.props.ItemPRD.PRD_id,
                                  PRD_name   : this.props.ItemPRD.PRD_name,
                                  PRD_price  : this.props.ItemPRD.PRD_price,
                                  PRD_img    : this.props.ItemPRD.PRD_img,
                                  PRD_Amount : 1  
                                }

                      this.props.dispatch({ type:'ADD_CART', data :data});  
                      Notiflix.Notify.Success('Add Sucess');
          break;
     }
}
HandleClickDelete    
    render() {
        const styleHeader = {
            whiteSpace: 'nowrap', 
            width: '165px', 
            overflow: 'hidden',
            textOverflow: 'ellipsis', 
          }
          
      return (
  
          <>
            <Card>
                <Image src={baseurl+this.props.ItemPRD.PRD_img} wrapped ui={false} />
                <Card.Content>
                    <Card.Header style={styleHeader} >{this.props.ItemPRD.PRD_name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{this.props.ItemPRD.B_Brand}</span>
                    </Card.Meta>
                </Card.Content>
                <Button animated='fade' onClick={this.HandleClickAdd}>
                       <Button.Content visible>{this.props.ItemPRD.PRD_price} BAHT</Button.Content>
                       <Button.Content hidden><Icon name='shop' />Add</Button.Content>
                </Button>
             </Card>
          </>
      );
    }
  
  }
  
  export default  connect()(ProductSale);