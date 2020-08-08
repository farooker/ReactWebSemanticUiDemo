import React,{Component} from 'react';
import { Button, Divider, Form, Grid, Segment,Container , Icon,Header } from 'semantic-ui-react';
import * as API  from '../ServiceAPI/ServiceModel';
import {URL_post} from '../ServiceAPI/ServiceURL';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Notiflix from "notiflix";
class LoginPage extends Component{
  constructor(props)
    {
        super(props);
        this.name = React.createRef();
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleSubmitLogin    = this.handleSubmitLogin.bind(this);
        this.handleSubmitFacebook = this.handleSubmitFacebook.bind(this);
        this.handleSubmitGoogle   = this.handleSubmitGoogle.bind(this);
        this.state ={
               LUser  : 'none',
               LPass  : 'none',
               RName  : 'none',
               RUser  : 'none', 
               RPass  : 'none'
        }
    }
    
    onChangeState = e => 
    {
      const { name, value } = e.target
      this.setState({ [name]: value ==='' ? 'none' : value });
    }

    handleSubmitLogin=async (e)=>
    {
      e.preventDefault();
      let data = { user : this.state.LUser,pass : this.state.LPass };
      let resLogin = await API.APIPost(URL_post.Login,data);
      
      switch(resLogin[0].status)
      {
         case false :
              let result = 
              {
                     ID : resLogin[0].result[0].userID,
                   Name : resLogin[0].result[0].userNickName,
                   Email: resLogin[0].result[0].userEmail,
                  Admin : resLogin[0].result[0].userAdmin === 0 ? false : true,
                  Token : resLogin[0].token,
              }
          sessionStorage.setItem('data_set',JSON.stringify(result));
          window.location.href="/";

         break;
         default :

         break;


      }
    

     }
     handleSubmitRegister= async (e)=>{
        e.preventDefault();
        let data = {
          nickname : this.state.RName,
             email : this.state.RUser,
          password : this.state.RPass
        }
        let resRegister = await API.APIPost(URL_post.Register,data);

        console.log(resRegister);

     }
     handleSubmitFacebook= async(response)=> (e)=>{
      //e.preventDefault();
       
     
        console.log(response);
      
     }
     handleSubmitGoogle= async(response)=> (e)=>{
      //e.preventDefault();
       
     
        console.log(response);
      
     }

    render() {
      const StyleBTN = {
        width: "40%",
        marginTop: "2px",
        marginBottom: "2px"

      }
      const styleContainer = {
        marginTop: "20px",
        marginBottom: "25px"
        }

     
      return (
        <>   
            <Container style={styleContainer}>
              <Segment placeholder>
                  <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                     <Header as='h2'>Sign</Header>
                        <Form onSubmit={this.handleSubmitLogin}>
                            <Form.Input icon='user'
                                        iconPosition='left'
                                        label='Username'
                                        name="LUser"
                                        onChange={this.onChangeState}
                                        placeholder='Username' />
                            <Form.Input icon='lock'
                                        iconPosition='left'
                                        label='Password'
                                        name="LPass"
                                        onChange={this.onChangeState}
                                        placeholder='Password'
                                        type='password' /> 
                         {  
                           /*
                              <>
                              <FacebookLogin
                                      appId="1196601870705929"
                                      autoLoad={true}
                                      fields="name,email,picture"
                                      callback={this.handleSubmitFacebook}
                                    />
                                <GoogleLogin
                                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.handleSubmitGoogle}
                                    onFailure={this.handleSubmitGoogle}
                                    cookiePolicy={'single_host_origin'}
                                  />
                                  </>
                             */
                           /*
                          <Button color='facebook' style ={StyleBTN}><Icon name='facebook'/> Facebook</Button>
                          <Button color='google plus' style ={StyleBTN}><Icon name='google plus' /> Google Plus</Button>

                           */
                          }
                          <Button type='submit'  style ={StyleBTN} content='Login' primary />
                      </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                    <Header as='h2'>Register</Header>
                            <Form onSubmit={this.handleSubmitRegister}>
                                <Form.Input icon='user'
                                            name="RName"
                                            iconPosition='left'
                                            label='Name'
                                            onChange={this.onChangeState}
                                            placeholder='Name' />
                                <Form.Input icon='at'
                                            name="RUser"
                                            iconPosition='left'
                                            label='Email'
                                            onChange={this.onChangeState}
                                            placeholder='Email' />
                                <Form.Input icon='lock'
                                            name="RPass"
                                            iconPosition='left'
                                            label='Password'
                                            onChange={this.onChangeState}
                                            placeholder='Password'
                                            type='password' />
                              <Button type='submit' style ={StyleBTN} content='Regiser' primary />
                            </Form>
                    </Grid.Column>
                  </Grid>
                  <Divider vertical>Or</Divider>
                </Segment>
            </Container>
        </>
      );
    }
  }
  
  export default LoginPage ;