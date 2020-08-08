import React,{Component} from 'react';
import {Menu,Icon} from 'semantic-ui-react';
class AdminMenu extends Component{
    constructor(props){
        super(props);
        this.RefType = props.REFState;
        this.state = { activeItem: 'Dashbord' }
   }
   handleItemClick=(Page) => (e, { name }) =>{
    e.preventDefault();
     this.setState({ activeItem: name });
     this.RefType({page :Page})
    }
    render() {
      return (
          <>
              <Menu vertical>
               <Menu.Item     name='Dashbord'
                              active={this.state.activeItem === 'Dashbord'}
                              onClick={this.handleItemClick(1)} >
                         <Icon name='grid layout' />
                         Dashbord
                </Menu.Item>   
                <Menu.Item>
                    <Menu.Header>จัดการข้อมูลสินค้า</Menu.Header>
                    <Menu.Menu>
                      <Menu.Item
                        name='ข้อมูลสินค้า'
                        active={this.state.activeItem === 'ข้อมูลสินค้า'}
                        onClick={this.handleItemClick(2)}
                      />
                      <Menu.Item
                        name='ข้อมูลแบรนสินค้า'
                        active={this.state.activeItem === 'ข้อมูลแบรนสินค้า'}
                        onClick={this.handleItemClick(3)}
                      />
                    </Menu.Menu>
                  </Menu.Item>
                <Menu.Item>
                  <Menu.Header>รายการสั้งซื้อสินค้า</Menu.Header>
                    <Menu.Menu>
                      <Menu.Item
                        name='รายการสั้งซื้อ'
                        active={this.state.activeItem === 'รายการสั้งซื้อ'}
                        onClick={this.handleItemClick(4)}
                      />
                  
                    </Menu.Menu>
                </Menu.Item>

             
              </Menu>
          </>
      );
    }
  }
  
  export default AdminMenu;