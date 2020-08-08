import React,{Component} from 'react';
import { Button,Container,Grid, Header,Icon,Image, Segment } from 'semantic-ui-react';
import imgEx from '../Asset/456.jpg'

const Heading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='NICE SHOP'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='SHOPPING ONLINE'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
        SHOPPING
      <Icon name='right arrow' />
    </Button>
  </Container>
)
class HomePage extends Component{
    render() {
      return (
        <>   
        
        <Segment inverted
                 textAlign='center'
                 style={{ minHeight: 700, padding: '1.5em 0em' ,marginTop:'0' ,borderRadius: '0'}}
                 vertica >
           <Heading/>
        </Segment>
  
        <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Help Companies and Companions
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We can give your company superpowers to do things that they never thought possible.
                Let us delight your customers and empower your needs... through pure data analytics.
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Make Bananas That Can Dance
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                bioengineered.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src={imgEx}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
       
    </>
      );
    }
  
  }
  
  export default HomePage ;