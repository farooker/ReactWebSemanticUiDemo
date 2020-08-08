import React, { Component } from 'react'
import { Button,Header,Input, Modal } from 'semantic-ui-react'
import * as API  from '../ServiceAPI/ServiceModel';
import {URL_put} from '../ServiceAPI/ServiceURL';
import Notiflix from "notiflix";

class  ModalUpdateBrand extends Component {
  constructor(props)
  {
    super(props);
    this.state = { open   : false 
                  ,Item   : props.Item 
                  ,BInput : props.Item.B_Brand
                 };
  }
  onChangeState = e => {
    const { name, value } = e.target
    this.setState({ [name]: value ==='' ? 'none' : value });
  }

  componentWillReceiveProps=(nextstate)=>this.setState({ open: nextstate.open ,Item :nextstate.Item});
  close = () => this.setState({ open: false });
  save = async ()=>{
           let BArr = {  B_ID :   this.state.Item.B_id, B_NAME : this.state.BInput  };
           let data = await API.APIPut(URL_put.Brand,BArr);
    
          switch(data.status)
          {
            case true :
                Notiflix.Notify.Failure('Update Brand Failure',data.result,'Click');
            break;
            default :
                Notiflix.Notify.Success('Update Brand Sucess','"Edit new brand is sucess.."','Click');
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
          <Header icon='edit' content='UPDATE BRAND' />
          <Modal.Content image>
            <Modal.Description>
               <Input icon='tag' 
                      name ="BInput"
                      defaultValue={this.state.Item.B_Brand} 
                      iconPosition='left' 
                      onChange={this.onChangeState}
                      placeholder='Brand...'  />
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

export default ModalUpdateBrand;