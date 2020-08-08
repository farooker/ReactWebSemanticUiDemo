import React,{Component} from 'react';
import DU_Brand from '../../DailogFrom/U_Brand';
import DC_Brand from '../../DailogFrom/C_Brand';
import { Icon, Label,Button,Image,Menu, Table,Item } from 'semantic-ui-react';
import * as API  from '../../ServiceAPI/ServiceModel';
import {URL_get,URL_delete} from '../../ServiceAPI/ServiceURL';
import Notiflix from "notiflix";

class AdminManageBrand extends Component{
    constructor(props){
        super(props);
        this.TYPE = props.TYPE;
        this.state = { 
             limitFrom: 0
            ,limitTo: 5
            ,data : []
            ,SDBAdd : false
            ,SDBUpdate :false
            ,ItemSlect : ''
         };
        this.handleItemMenu  = this.handleItemMenu.bind(this);
        this.onloadingsource = this.onloadingsource.bind(this);
        this.handleDialog =this.handleDialog.bind(this);
      
   }
   componentWillMount=()=>this.onloadingsource();
   onloadingsource = async()=>{
     Notiflix.Loading.Pulse('Processing...');
         let resB =  await API.APIGet(URL_get.BrandAll); 
        switch(resB.status)
        {
            case true: Notiflix.Notify.Failure(resB.result); break;
            default : this.setState({data : resB.result,SDBAdd : false,SDBUpdate :false});  break;
        }
     Notiflix.Loading.Remove(600);
   }
   handleDialog=(Dailog,item)=>async(e)=>{
        e.preventDefault();
        switch(Dailog)
        {
            case "DAdd"    : this.setState({SDBAdd : true ,SDBUpdate  : false,ItemSlect : ''}); break;
            case "DUpdate" : this.setState({SDBAdd : false ,SDBUpdate : true,ItemSlect  : item}); break;
            case "DDelete" :     
                let resBDelete =  await API.APIdelete(URL_delete.Brand,item.B_id); 
                switch(resBDelete.status)
                {
                    case false :  Notiflix.Notify.Success('Delete Brand Sucess','"Delete brand is sucess.."','Click');this.onloadingsource();   break;
                       default :  Notiflix.Notify.Failure(resBDelete.result); break;
                }
            break;
        }
   }
   handleItemMenu =(num)=>(e)=>{
       e.preventDefault();
       this.setState({ limitFrom: (5*(num-1)), limitTo: (5*(num))  });
   } 
    render() {
       let item =[];for (let index = 0; index < Math.ceil(this.state.data.length / 5); index++){ item.push(index+1);}       
      return (
          <>
            <DC_Brand  open ={this.state.SDBAdd}   SouceUpdate ={this.onloadingsource}  />
            <DU_Brand  open={this.state.SDBUpdate} SouceUpdate ={this.onloadingsource} Item={this.state.ItemSlect} />
            <Menu secondary>
                <Menu.Item>
                   <Menu.Header as='h2'>จัดการข้อมูลยี่ห้อสินค้า</Menu.Header>
                </Menu.Item>
                <Menu.Item position='right'>
                   <Button icon labelPosition='left' 
                           onClick={this.handleDialog("DAdd","")} >เพิ่มข้อมูล<Icon name='add'/></Button>
               </Menu.Item>
            </Menu>
           <Table celled>
                <Table.Header>
                  <Table.Row>
                        <Table.HeaderCell>รหัสยี่ห้อ</Table.HeaderCell>
                        <Table.HeaderCell>ชื่อยี่ห้อ</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {
  
                    this.state.data.slice(this.state.limitFrom,this.state.limitTo).map(item=>
                        <Table.Row>
                            <Table.Cell><Label ribbon>{item.B_id}</Label></Table.Cell>
                            <Table.Cell textAlign='right'>{item.B_Brand}</Table.Cell>
                            <Table.Cell textAlign='right'>
                            {
                                <div>
                                <Button icon labelPosition='left' onClick={this.handleDialog("DUpdate",item)}>
                                    <Icon name='edit' />
                                    แก้ไขข้อมูล
                                </Button>
                                <Button icon labelPosition='right' onClick={this.handleDialog("DDelete",item)}>
                                    ลบข้อมูล
                                    <Icon name='delete' />
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
                       <Menu floated='right' pagination>
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
  
  export default AdminManageBrand ;