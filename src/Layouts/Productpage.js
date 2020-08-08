import React,{Component} from 'react';
import MenuBrand from '../Component/Product/Menubrand';
import CardProduct from '../Component/Product/ProductSale';
import { Grid,Container,Card} from 'semantic-ui-react';
import * as API  from '../ServiceAPI/ServiceModel';
import {URL_get} from '../ServiceAPI/ServiceURL';
import Notiflix from "notiflix";
 
class ProductPage extends Component{
  constructor(props){
     super(props);
    
     this.OnUpdateState=this.OnUpdateState.bind(this);
     this.state={
         BID : 'none',
         BOB :[],
         PRD :[],
      PRDSHOW:[]
     }
  }
async componentWillMount(){
    Notiflix.Loading.Hourglass('Loading...');
    let resBOB = await API.APIGet(URL_get.BrandAll);
    let resPRD = await API.APIGet(URL_get.ProductAll);   
    switch(resBOB.status && resPRD.status)
    {
      case false :
           this.setState({ BOB :resBOB.result, PRD :resPRD.result, PRDSHOW:resPRD.result});
           Notiflix.Loading.Remove(200);
        break;
        default : 
        Notiflix.Loading.Remove(200);
        Notiflix.Report.Failure('Loading Failure',"Is Loading Failure",'Click');
        break;
    }
  }

  OnUpdateState(nextState)
  {

      this.setState({ PRDSHOW:this.state.PRD.filter(B=>B.B_Brand===nextState.BID)});
     console.log('===>'+nextState.BID);
  }
    render() {
      const styleContainer = { marginTop: "20px", marginBottom: "25px" }
         
      return (
        <>   
        <Container style={styleContainer}>

            <Grid>
                <Grid.Column width={4}>
                    <MenuBrand ItemMenu={this.state.BOB}  refState={this.OnUpdateState} />
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <Card.Group  itemsPerRow={4}>
                      {
                        this.state.PRDSHOW.map(item=> <CardProduct ItemPRD={item} />)
                      }
                    
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Container>
        </>
      );
    }
  
  }
  
  export default ProductPage;