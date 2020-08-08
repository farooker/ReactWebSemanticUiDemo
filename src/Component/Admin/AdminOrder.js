import React,{Component} from 'react';
import { Icon, Label,Button,Image,Menu, Table } from 'semantic-ui-react';
import DU_Product from '../../DailogFrom/U_Product';
import DC_Product from '../../DailogFrom/C_Product';
import * as API  from '../../ServiceAPI/ServiceModel';
import {URL_get,URL_delete,baseurl} from '../../ServiceAPI/ServiceURL';
import Notiflix from "notiflix";

class AdminOrder extends Component{
    constructor(props){
        super(props);
        this.TYPE = props.TYPE;
        this.state = { limitFrom: 0
                      ,limitTo: 5
                      ,data : []
                      ,SDPRDAdd : false
                      ,SDPRDUpdate : false
                      ,ItemSlect : ''
                    };
        this.handleItemMenu =this.handleItemMenu.bind(this);
        this.onloadingSouce=this.onloadingSouce.bind(this);
        this.handleDialog =this.handleDialog.bind(this);
   }
   componentWillMount=()=> this.onloadingSouce();
   onloadingSouce= async()=>{
    Notiflix.Loading.Pulse('Processing...');
    let resPRD =  await API.APIGet(URL_get.OrderPay); 
    switch(resPRD.status)
    {
        case true: Notiflix.Notify.Failure(resPRD.result); break;
        default : this.setState({data : resPRD.result ,SDPRDAdd : false,SDPRDUpdate : false});  break;
    }
    Notiflix.Loading.Remove(600);
   }
   handleDialog=(Dailog,item)=>async(e)=>{
    e.preventDefault();
    switch(Dailog)
    {
        case "DAdd"    : this.setState({SDPRDAdd : true ,SDPRDUpdate  : false,ItemSlect : ''}); break;
        case "DUpdate" : this.setState({SDPRDAdd : false ,SDPRDUpdate : true,ItemSlect  : item}); break;
        case "DDelete" :     
        
            let resBDelete =  await API.APIdelete(URL_delete.Product,item.PRD_id); 
            switch(resBDelete.status)
            {
                case false :   Notiflix.Notify.Success('Delete Product Sucess','"Delete producr is sucess.."','Click');this.onloadingSouce();   break;
                   default :  Notiflix.Notify.Failure(resBDelete.result); break;
            }
            
        break;
    }
}
   handleItemMenu =(num)=>(e)=>{
       e.preventDefault();
       this.setState({ limitFrom: (5*(num-1)), limitTo: (5*(num)) ,SDPRDAdd : false,SDPRDUpdate : false });
   } 
    render() {
       let item =[];for (let index = 0; index < Math.ceil(this.state.data.length / 5); index++){ item.push(index+1);}       
      return (
          <>

           <Menu secondary>
                <Menu.Item>
                   <Menu.Header as='h2'>รายการสั่งซื้อสินค้า</Menu.Header>
                </Menu.Item>
            
            </Menu>
            <Table celled>
                <Table.Header>
                  <Table.Row>
                        <Table.HeaderCell>รหัสรายการ</Table.HeaderCell>
                        <Table.HeaderCell>วันที่สั่งซื้อ</Table.HeaderCell>
                        <Table.HeaderCell>คนสั่ง</Table.HeaderCell>
                        <Table.HeaderCell>ราคารวม</Table.HeaderCell>
                        <Table.HeaderCell>สถานะ</Table.HeaderCell>
                        <Table.HeaderCell>รหัสชำระเงิน</Table.HeaderCell>
        
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                {
  
                    this.state.data.slice(this.state.limitFrom,this.state.limitTo).map(item=>
                        <Table.Row>
                            <Table.Cell> <Label ribbon>{item.orderID}</Label></Table.Cell>
                            <Table.Cell>{item.orderDate.substring(0,10)}</Table.Cell>
                            <Table.Cell>{item.userNickName}</Table.Cell>
                            <Table.Cell>{item.orderTotal}</Table.Cell>
                            <Table.Cell>{item.status}</Table.Cell>
                            <Table.Cell>{item.transaction}</Table.Cell>
                    </Table.Row>
                    )
                }     
              
                </Table.Body>
                <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan={

                            ((Object.keys(this.state.data).length)+1) < 6 ? 6 :
                            (Object.keys(this.state.data).length)+1
                    }>
                       <Menu floated='right' pagination  position='right'>
                        {
                            item.map(number=><Menu.Item as='a' onClick={this.handleItemMenu(number)}>{number}</Menu.Item>)
                        } 
                       </Menu>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>
          </>
      );
    }
  }
  
  export default AdminOrder;