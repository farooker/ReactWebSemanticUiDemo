import React,{Component} from 'react';
import {Menu} from 'semantic-ui-react';
class BrandMenu extends Component{
    constructor(props){
        super(props);
        this.refSetState = props.refState;
        this.state = { activeItem: '',Item : []};
        this.handleItemClick =this.handleItemClick.bind(this);
   }
   componentWillReceiveProps(Nextprops)
   {
     this.setState({Item :Nextprops.ItemMenu})
   }

   handleItemClick(e, { name }){
       e.preventDefault();
       //this.refSetState({BID:id});
    //   console.log(name);
       this.refSetState({BID:name});
       this.setState({ activeItem: name });
  
   }
    render() {
      return (
          <>
          <Menu  text vertical>
            {
              this.state.Item.map(item=>
                <Menu.Item name={item.B_Brand}
                           active={this.state.activeItem === item.B_Brand}
                           onClick={this.handleItemClick} />
                )
            }
               
           </Menu>
          </>
      );
    }
  }
  
  export default BrandMenu;