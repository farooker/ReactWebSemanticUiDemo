import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Url } from '../ComponentMain/AppContent';
import {connect} from 'react-redux';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Image,
  Label,
  Header,
  Icon,
  Dropdown,
  Segment,
  Visibility,
} from 'semantic-ui-react'

const Avatar=(props)=>
{
    const logout =(e)=>{
      e.preventDefault();
      sessionStorage.removeItem('data_set');
      window.location.href="/";
    }
 //console.log(props.isFix);

   return  <Header as='h4'>
            <Icon name='user'  style={{color:  props.isFix ===true ? '#FFFFFF' : '#000000'}}/>
            <Header.Content>
              <Dropdown text={<strong style={{color:  props.isFix ===true ?'#FFFFFF' :'#000000'}}>Bob Smith</strong>} color='green'  floating >
                  <Dropdown.Menu>
                    {
                        JSON.parse(sessionStorage.getItem('data_set')).Admin === true ?
                      <>
                        <Dropdown.Item as={Link} to={Url.Cart}>ตะกร้าสินค้า<Label color='teal'>{props.TotalItem}</Label></Dropdown.Item>
                        <Dropdown.Item as={Link} to={Url.Admin}>จัดการข้อมูลสินค้า</Dropdown.Item>
                        <Dropdown.Item text='ออกจากระบบ' onClick={logout} />
                      </> 
                      :
                       <>
                         <Dropdown.Item  as={Link} to={Url.Cart}>ตะกร้าสินค้า<Label color='teal'>{props.TotalItem}</Label></Dropdown.Item>
                         <Dropdown.Item text='ออกจากระบบ' onClick={logout} />
                       </>
                    }

                  </Dropdown.Menu>
                </Dropdown>
            </Header.Content>
          </Header>;
}
const NotAvatar=()=>
{
  return  <>
            <Link to ={Url.Login}>
              <Button as='a' inverted=''>Log in</Button>
            </Link>
            <Link to ={Url.Login}>
                <Button as='a' inverted='' primary='' style={{ marginLeft: '0.5em' }}> Sign Up</Button>
            </Link>
        </>
}

const getWidth = () => {
     const isSSR = typeof window === 'undefined'
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }
class DesktopContainer extends Component {
    state = {}
    componentWillMount=()=> this.setState({ CartCount:0});
    componentWillReceiveProps=(nextProp)=>this.setState({ CartCount: nextProp.cart.length,CartItem: nextProp.cart })
    

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
      const {  CartCount } = this.state
      const {  CartItem } = this.state
  
      return (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                    <Menu.Item as='a' active > <Link to ={Url.Home}>Home</Link> </Menu.Item>
                    <Menu.Item as='a'> <Link to ={Url.Product}>Shopping</Link></Menu.Item>
                    <Menu.Item position='right'>
                      {
                        
                        JSON.parse(sessionStorage.getItem('data_set')) ===null ? 
                        <NotAvatar/> : <Avatar  TotalItem={CartCount}   ItemCart={CartItem}  isFix ={!fixed} />
                        
                       // console.log(JSON.parse(sessionStorage.getItem('data_set')))
                       /*
                        <div>
                          <Link to ={Url.Login}>
                            <Button as='a' inverted={!fixed}>Log in</Button>
                          </Link>
                          <Link to ={Url.Login}>
                              <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}> Sign Up</Button>
                          </Link>
                        </div>
                        */
                       }
                  </Menu.Item>
                </Container>
              </Menu>
            </Segment>
          </Visibility>
  
          {children}
        </Responsive>
      )
    }
  }
  const mapStateToProps = (state) => {
 
    return {
        cart: state
    }
};

  export default  connect(mapStateToProps)(DesktopContainer);