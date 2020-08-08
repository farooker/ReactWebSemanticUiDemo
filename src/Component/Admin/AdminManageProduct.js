import React,{Component} from 'react';
import { Icon, Label,Button,Image,Menu, Table } from 'semantic-ui-react';
import DU_Product from '../../DailogFrom/U_Product';
import DC_Product from '../../DailogFrom/C_Product';
import * as API  from '../../ServiceAPI/ServiceModel';
import {URL_get,URL_delete,baseurl} from '../../ServiceAPI/ServiceURL';
import Notiflix from "notiflix";

class AdminManage extends Component{
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
    let resPRD =  await API.APIGet(URL_get.ProductAll); 
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
           <DC_Product open ={this.state.SDPRDAdd}   SouceUpdate ={this.onloadingSouce}  />
           <DU_Product open ={this.state.SDPRDUpdate}  SouceUpdate ={this.onloadingSouce}  Item={this.state.ItemSlect}  />
           <Menu secondary>
                <Menu.Item>
                   <Menu.Header as='h2'>จัดการข้อมูลสินค้า</Menu.Header>
                </Menu.Item>
                <Menu.Item position='right'>
                
                   <Button animated='vertical' onClick={this.handleDialog("DAdd","")} >
                         <Button.Content hidden>Add</Button.Content>
                         <Button.Content visible> <Icon name='add' /> </Button.Content>
                     </Button>
               </Menu.Item>
            </Menu>
            <Table celled>
                <Table.Header>
                  <Table.Row>
                        <Table.HeaderCell>รหัสสินค้า</Table.HeaderCell>
                        <Table.HeaderCell>รูปสินค้า</Table.HeaderCell>
                        <Table.HeaderCell>ชื่อสินค้า</Table.HeaderCell>
                        <Table.HeaderCell>ราคาสินค้า</Table.HeaderCell>
                        <Table.HeaderCell>ยี่ห้อสินค้า</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                {
  
                    this.state.data.slice(this.state.limitFrom,this.state.limitTo).map(item=>
                        <Table.Row>
                            <Table.Cell> <Label ribbon>{item.PRD_id}</Label></Table.Cell>
                            <Table.Cell><Image src={baseurl+item.PRD_img} rounded size='tiny' /></Table.Cell>
                            <Table.Cell>{item.PRD_name}</Table.Cell>
                            <Table.Cell>{item.PRD_price}</Table.Cell>
                            <Table.Cell>{item.B_Brand}</Table.Cell>
                            <Table.Cell>
                            {
                                <div>
                                    <Button animated='vertical'  onClick={this.handleDialog("DUpdate",item)} >
                                        <Button.Content hidden>EDIT</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='edit' />
                                        </Button.Content>
                                    </Button>

                                    <Button animated='vertical'  onClick={this.handleDialog("DDelete",item)}>
                                        <Button.Content hidden>DELETE</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='delete' />
                                        </Button.Content>
                                    </Button>
                             
                                </div>
                            }
                            </Table.Cell>
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
  
  export default AdminManage;