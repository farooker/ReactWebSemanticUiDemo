import React, { Component } from 'react'
import { Button,Header,Input,Image, Modal,Form, Dropdown , Segment, Item } from 'semantic-ui-react';
import NoneImage from '../Asset/noneImage.jpg';
import * as API  from '../ServiceAPI/ServiceModel';
import {URL_get,URL_post} from '../ServiceAPI/ServiceURL';
import Notiflix from "notiflix";

class  ModalCreateProduct extends Component {
  state = { open: false
           ,PRDname : ''
           ,PRDprice :''
           ,Bid :''
           ,setFile: {}
           ,imagePreviewUrl : NoneImage
           ,BSouce :[] 
          } 
  componentWillReceiveProps=(nextstate)=>
  {  
                  this.setState({ open: nextstate.open });
                  this.onloadSouce(); 
  };
                
  onloadSouce=async()=>
  {
        let resB =  await API.APIGet(URL_get.BrandAll); 
        switch(resB.status)
        {
            case true: Notiflix.Notify.Failure(resB.result); break;
            default : this.setState({BSouce : resB.result});  break;
        }
  }

  save =async()=>{
      var formData = new FormData();
      formData.append("Itemname", this.state.PRDname);
      formData.append("Itemprice",this.state.PRDprice);
      formData.append("Itembid", this.state.Bid);
      formData.append("file", this.state.setFile);
      let data =  await API.APIPost(URL_post.Product,formData);
      switch(data.status)
     {
       case true :
          Notiflix.Notify.Failure('Add Product Failure',data.result,'Click');
       break;
       default :
          Notiflix.Notify.Success('Add Product Sucess','"Add new product is sucess.."','Click');
          this.props.SouceUpdate();
          this.close();
       break;
     }
  }
  onChangeState = e =>
  {
    const { name, value } = e.target
    this.setState({ [name]: value ==='' ? 'none' : value });
  }
  close = () => this.setState({ open: false });
  onChangeOption = (e, data)=> this.setState({ Bid :data.value});

  _handleImageChange=(e)=>
   {
    e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
          reader.onloadend = () => 
          {
                this.setState({
                  setFile: file,
                  imagePreviewUrl: reader.result
                });
          }; reader.readAsDataURL(file)
  }

  render() {
    const { open, dimmer } = this.state
    const options = [];
    this.state.BSouce.map(Item=> options.push({ key: Item.B_id, text: Item.B_Brand, value: Item.B_id }));
    return (
      <div>
        <Modal dimmer={dimmer} open={open} onClose={this.close} >
          <Header icon='add' content='เพิ่มข้อมูลสินค้า' />
            <Modal.Content image>
               <div style={{margin: "10px"}} >
                  <Image wrapped size="medium"  src={this.state.imagePreviewUrl} />
                  <Input  type="file" 
                          onChange={(e)=>this._handleImageChange(e)} 
                          attached='bottom' 
                          fluid icon="hand point up" 
                          placeholder='เลือกภาพ' />
                </div>
                    <Modal.Description>
                     <Header style={{width:"500px"}}>ข้อมูลสินค้า</Header>
                        <div>
                        <Form>
                                <Form.Group widths='equal'>
      
                                    <Form.Input
                                        fluid
                                        name='PRDname'
                                        label='ชื่อสินค้า'
                                        placeholder='ชื่อสินค้า'
                                        onChange={this.onChangeState}
                                    />
                                      <Form.Input
                                        fluid
                                        name='PRDprice'
                                        label='ราคาสินค้า'
                                        placeholder='ราคาสินค้า'
                                        onChange={this.onChangeState}
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                <Form.Select onChange={this.onChangeOption}
                                             fluid
                                             options={options}
                                             name='Bid'
                                             label='ยี่ห้อสินค้า'
                                             placeholder='เลือก ยี่ห้อสินค้า'
                                        />
                                </Form.Group>
                            </Form>
                        </div> 
                </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button icon='checkmark'
                    labelPosition='right'
                    content="OK"
                    onClick={this.save}
                    />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalCreateProduct;