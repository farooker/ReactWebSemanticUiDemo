import React, { Component } from 'react'
import { Button,Header,Input, Modal } from 'semantic-ui-react'
import * as API  from '../ServiceAPI/ServiceModel';
import {URL_post} from '../ServiceAPI/ServiceURL';
import Notiflix from "notiflix";
class  ModalCreateBrand extends Component {
  state = { open: false ,BInput : '' }
  componentWillReceiveProps=(nextstate)=>this.setState({ open: nextstate.open });
  onChangeState = e => {
    const { name, value } = e.target
    this.setState({ [name]: value ==='' ? 'none' : value });
  }
  close = () => this.setState({ open: false });
  save = async ()=>{
     let BArr = { Bname :this.state.BInput };
     let data = await API.APIPost(URL_post.Brand,BArr);
     switch(data.status)
     {
       case true :
       Notiflix.Report.Failure('Add Brand Failure',data.result,'Click');
       break;
       default :
       Notiflix.Report.Success('Add Brand Sucess','"Add new brand is sucess.."','Click');
       this.props.SouceUpdate();
       this.close();


       break;
     }
    

  };

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Modal dimmer={dimmer} open={open} onClose={this.close} size='mini'>
          <Header icon='add' content='ADD BRAND' />
          <Modal.Content image>
            <Modal.Description>
               <Input icon='tag' name='BInput' onChange={this.onChangeState} iconPosition='left' placeholder='Brand...' />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button positive
                    icon='checkmark'
                    labelPosition='right'
                    content="OK"
                    onClick={this.save} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalCreateBrand;