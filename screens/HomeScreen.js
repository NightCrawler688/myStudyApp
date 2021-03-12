import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class BookDonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      scheduleList : []
    }
  this.scheduleRef= null
  }

  getScheduleList =()=>{
    this.scheduleRef = db.collection("schedules")
    .onSnapshot((snapshot)=>{
      var scheduleList = snapshot.docs.map(document => document.data());
      this.setState({
        scheduleList :scheduleList
      });
    //   console.log(scheduleList.endDate)
    })
  }

  componentDidMount(){
    this.getScheduleList()
  }

  componentWillUnmount(){
    this.scheduleRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem key = {i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
                {item.taskName}
            </ListItem.Title>
            <ListItem.Subtitle>
                {item.endDate}
            </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="My Schedules" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.scheduleList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Schedules</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.scheduleList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
