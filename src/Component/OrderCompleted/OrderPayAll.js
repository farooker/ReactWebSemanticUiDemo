import React,{Component} from 'react';
import { Input, Label, Menu } from 'semantic-ui-react';
class OrderAll extends Component{
    state = { activeItem: 'inbox' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
      return (
        <>   
           <Menu vertical>
                <Menu.Item  name='inbox'
                            active={this.state.activeItem === 'inbox'}
                            onClick={this.handleItemClick} >
                            <Label color='teal'>2020-04-05</Label>
                            ORDER 201233
                </Menu.Item>
                <Menu.Item name='spam'
                           active={this.state.activeItem === 'spam'}
                           onClick={this.handleItemClick} >
                          <Label color='teal'>2020-04-05</Label>
                          ORDER 201233
                </Menu.Item>
            </Menu>
        </>
      );
    }
  
  }
  
  export default OrderAll;