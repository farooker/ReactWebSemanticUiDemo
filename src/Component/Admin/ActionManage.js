import React, { Component } from 'react'
import { Dropdown} from 'semantic-ui-react'
import DU_Brand from '../../DailogFrom/U_Brand';
import DU_Product from '../../DailogFrom/U_Product';
import * as API  from '../../ServiceAPI/ServiceModel';
import {URL_delete} from '../../ServiceAPI/ServiceURL';
import Notiflix from "notiflix";


class DropdowAction extends Component{
  constructor(props)
  {
    super(props);
    this.state={Only :this.props.mode,Item : this.props.Item ,showUB :false,showUPRD :false };
    this.handleItem =this.handleItem.bind(this);
    this.HandleDelete = this.HandleDelete.bind(this);
  }
  
  handleItem =(mode)=>async(e)=>{
    e.preventDefault();

    switch(mode)
    {
      case "Update" :
             this.state.Only==="Product" ?
             this.setState({showUPRD : true}): this.setState({showUB : true});
        break
        case "Delete":
             let  ThisUrl =   this.state.Only==="Product" ? URL_delete.Product : URL_delete.Brand;
             let  ThisParams = this.state.Only==="Product" ? this.state.Item.PRD_id: this.state.Item.B_id;
             let data = await API.APIdelete(ThisUrl,ThisParams);
              switch(data.status)
              {
                case true :
                Notiflix.Report.Failure("Delete "+this.state.Only+" Failure",data.result,'Click');
                break;
                default :
                Notiflix.Report.Success("Delete "+this.state.Only+" Sucess","Delete "+this.state.mode+" is sucess..",'Click',
                function (){ window.location.reload(false);});
                break;
              }
              
        break;
    }
  
  //  console.log(this.state.Only);
    //console.log(this.state.Item);
    //console.log('--------------------------------------');
} 
 HandleDelete =async()=>{


  /*
  switch(data.status)
  {
    case true :
    Notiflix.Report.Failure('Update Brand Failure',data.result,'Click');
    break;
    default :
    Notiflix.Report.Success('Update Brand Sucess','"Edit new brand is sucess.."','Click');
    this.close();

    break;
  }
 */
}


  render() {
      return (
              <>
               <Dropdown text='Action' icon='sign-in alternate' floating labeled  button className='icon'>
                      <Dropdown.Menu>
                        <Dropdown.Menu scrolling>
                            <Dropdown.Item  icon='sign-in alternate' onClick={this.handleItem('Update')}  text='Update' />
                            <Dropdown.Item  icon='sign-in alternate' onClick={this.handleItem('Delete')}  text='Delete' />
                        </Dropdown.Menu>
                      </Dropdown.Menu>
                   </Dropdown>
                  <DU_Brand open={this.state.showUB}  Item={this.state.Item}  />
                  <DU_Product open={this.state.showUPRD} />
              </>
            );
    }
  }
export default DropdowAction;