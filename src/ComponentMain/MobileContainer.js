import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Url } from '../ComponentMain/AppContent'
import {connect} from 'react-redux';
import {
  Button,
  Container,
  Icon,
  Menu,
  Dropdown,
  Responsive,
  Segment,
  Label,
  Header,
  Sidebar,
} from 'semantic-ui-react'

const Avatar=(props)=>
{
    const logout =(e)=>{
      e.preventDefault();
      sessionStorage.removeItem('data_set');
      window.location.href="/";
    }


   return  <Header as='h4'>
            <Icon name='user circle outline'  color='teal' />
            <Header.Content>
              <Dropdown text={<strong style={{color: 'teal'}}>Bob Smith</strong>} color='green'  floating >
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
class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    const {  CartCount } = this.state
    const {  CartItem } = this.state
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Shopping</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  {
                     JSON.parse(sessionStorage.getItem('data_set')) ===null ? 
                     <NotAvatar/> : <Avatar  TotalItem={CartCount}  ItemCart={CartItem} />
                    /*
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                  */
                  }
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
  
}
const mapStateToProps = (state) => {
 
  return {
      cart: state
  }
};
export default connect(mapStateToProps)(MobileContainer);