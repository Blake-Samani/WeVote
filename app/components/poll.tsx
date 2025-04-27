import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";

export default function Poll() {
 
 const [poll, setPoll] = useState({
    pollName: "Test Poll",
    yesCount: 0,
    noCount: 0,
 });

 function incrementYes () {
   setPoll( prevPoll => (
      {
         ...prevPoll, yesCount: prevPoll.yesCount + 1
      }
   ))
 }
 function incrementNo () {
   setPoll( prevPoll => (
      {
         ...prevPoll, noCount: prevPoll.noCount + 1
      }
   ))
 }

 return (
    <View style={{flex: 2, alignItems: 'center'}}>
      <Button title="Yes" onPress={incrementYes}></Button>
      <Button title="No" onPress={incrementNo}></Button>
        <Text>Name: {poll.pollName}</Text>
        <Text>Yes: {poll.yesCount}</Text>
        <Text>No: {poll.noCount}</Text>
    </View>
 )
}