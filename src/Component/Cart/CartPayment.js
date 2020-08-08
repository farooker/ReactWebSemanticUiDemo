import React,{Component} from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
 
class CrderPayment extends Component{
  constructor(props){
     super(props);
        
       }
       HandleClick=e=>
       {
           e.preventDefault();
           window.location.href='/'
       }

    render() {
      const styleContainer = { marginTop: "20px", marginBottom: "25px" }
      const iframeStyle = {
        width: '100%',
        height: '100%',
        border: '0',
        position: 'absolute',
      }
      return (
        <>   
        <Segment placeholder>
          <Header icon>
            <Icon name='money bill alternate outline' />
             Payment Sucess
          </Header>
          <Button onClick={this.HandleClick} primary>Home</Button>
      </Segment>
        </>
      );
    }
  
  }
  
  export default CrderPayment;