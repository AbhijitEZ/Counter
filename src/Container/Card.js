import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, Input, Grid, Segment, Placeholder} from 'semantic-ui-react';
import * as actionType from '../store/actions'
let style = {
  backgroundColor : '#a3a3a3',
  textAlign : 'center'
};
let inpValue = '';

class Card extends Component {
  state = {
    counter: 0,
    data: [],
    load: true
  }
  inputValues(e){
    inpValue = e.target.value;
}
  fetchData(id){
    if(Math.sign(id) !== 1) {this.setState({load: true}); console.log('wrong');}
    fetch('https://jsonplaceholder.typicode.com/comments?id='+id)
    .then(res => res.json())
    .then(result => {this.setState({data : result}); })
    .catch(err => console.log('err'))
    this.setState({load : true});
    setTimeout(() => {
      this.setState({load : false});
    }, 500)
  }
 
  render(){
    let {data} = this.state;
    let  {load} = this.state;
  return (
    <div>
      <Segment>
        <Grid centered columns = {2}>
        <Grid.Row>
      <h1>In-Component state = {this.state.counter}</h1>
      </Grid.Row>
      <Grid.Row>
      <h1 style = {style}>Redux-Component state = {this.props.ctr}</h1>
      </Grid.Row>
      </Grid>
      </Segment>
      <Button onClick = {this.props.Increment}>Increment</Button>
      <Button onClick = {this.props.Decrement}>Decrement</Button>
      <Input onChange = {this.inputValues} type = 'number'/> 
       <Button onClick = {this.props.Add}>Add</Button>
      <Button onClick = {this.props.Reset}>Reset</Button>
      <Button color = 'blue' onClick = {() => this.fetchData(this.props.ctr)}>Data</Button>
      <hr />
      <Button color = 'green' onClick = {() => this.props.onStoreResult(this.props.ctr)} >StoreResult</Button>
      <Grid columns = {2} divided>
      <Grid.Row>
        <Grid.Column>
      <ul>
        {this.props.storedResults.map((strResult,index )=> (
          <li style = {{cursor : 'pointer'}} key = {index} onClick = {() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
          ))}
      </ul>
      </Grid.Column>
      <Grid.Column>
      <ul>
        {data.map(ele => (<li key ={ele.id}>
         
        {!load ? <div>
          <h2 style ={{display:'inline-block'}}>Name: </h2> {ele.name}
          <h2>Email: </h2> {ele.email}
        </div>
        : <Placeholder> 
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder> }
        
        </li>))}
      </ul>
      </Grid.Column>
      </Grid.Row>
      </Grid>
    </div>
)

}
}

const mapStateToProps = (state) => {
  return {
    ctr : state.ctrMain.counter,
    storedResults : state.resultMain.result,
    
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Increment : () => dispatch({type: actionType.INCREMENT}),
    Reset : () => dispatch({type: actionType.RESET}),
    Decrement : () => dispatch({type: actionType.DECREMENT}),
    Add : () => dispatch({type: actionType.ADD, payload:{value : +inpValue}}),
    onStoreResult : (result) => dispatch({type: actionType.STORE_RESULT, payload: {currentCounter : result}}),
    onDeleteResult : (id) => dispatch({type: actionType.DELETE_RESULT, payload:{inputElId : id}}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);