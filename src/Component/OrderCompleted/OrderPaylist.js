import React,{Component} from 'react';
import { Button,Icon , Item  } from 'semantic-ui-react';
class Orderlist extends Component{
    render() {
      return (
        <>   
                 <Item.Group  divided>
                    <Item>
                        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        <Item.Content>
                            <Item.Header as='a'>NameProduct</Item.Header>
                            <Item.Meta>ID  : <strong>8812455312451</strong></Item.Meta>
                            <Item.Extra>Price :<strong>700.00฿</strong></Item.Extra>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        <Item.Content>
                            <Item.Header as='a'>NameProduct</Item.Header>
                            <Item.Meta>ID  : <strong>8812455312451</strong></Item.Meta>
                            <Item.Extra>Price :<strong>700.00฿</strong></Item.Extra>
                        </Item.Content>
                    </Item>
                 </Item.Group>

        </>
      );
    }
  
  }
  
  export default Orderlist ;