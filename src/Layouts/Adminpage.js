import React,{Component} from 'react';
import MenuAdmin from '../Component/Admin/MenuAdmin';
import ManageAdminProduct from '../Component/Admin/AdminManageProduct';
import ManageAdminBrand from '../Component/Admin/AdminManageBrand';
import ManageAdminOrder from '../Component/Admin/AdminOrder';
import { Grid,Container,Dropdown,Menu, Item } from 'semantic-ui-react';
import DC_Brand from '../DailogFrom/C_Brand';
import DC_Product from '../DailogFrom/C_Product';

class AdminPage extends Component{
  constructor(props){
    super(props);
    this.OnUpdateState =this.OnUpdateState.bind(this);
    this.SwitchPage = this.SwitchPage.bind(this);
    this.state ={layoutPage : 1};
  }

    OnUpdateState=(nextState)=>this.setState({layoutPage:nextState.page});
    SwitchPage=(page)=>
    {
        switch(page)
        {
           case 1 :  break;
           case 2 :  return <ManageAdminProduct/>; break;
           case 3 : return <ManageAdminBrand/>;break;
           case 4 : return <ManageAdminOrder/>;  break;

        }
    }
    render() {
      const styleContainer = {
                 marginTop: "20px",
                 marginBottom: "25px"
              }
             // console.log(this.state.layoutPage)
      return (
        <>   
           <Container style={styleContainer}> 
            <Grid>
                <Grid.Column width={4}  style={{ marginTop: "30px"}}>
                    <MenuAdmin REFState={this.OnUpdateState} />
                </Grid.Column>
                <Grid.Column stretched width={12}>
                  {
                    this.SwitchPage(this.state.layoutPage)
                  }
                  
                </Grid.Column>
            </Grid>
        </Container>
        <DC_Brand  open ={this.state.ShowB}/>
        <DC_Product open ={this.state.showPRD}/>
        </>
      );
    }
  
  }
  
  export default AdminPage ;