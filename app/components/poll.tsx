import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";

export default function Poll() {
 
 const [poll, setPoll] = useState({
    pollName: "Test Poll",
    yesCount: 0,
    noCount: 0,
    yesPercent: 0,
    noPercent: 0,
    total: 0,
 });

 function incrementYes () {
   setPoll( prevPoll => (
      {
         ...prevPoll, 
         yesCount: prevPoll.yesCount + 1, 
         total: prevPoll.total + 1,
         yesPercent: Math.round((prevPoll.yesCount/prevPoll.total) * 100), 
         noPercent: Math.round((prevPoll.noCount/prevPoll.total) * 100),
      }
   ))
 }
 function incrementNo () {
   setPoll( prevPoll => (
      {
         ...prevPoll, 
         noCount: prevPoll.noCount + 1, 
         total: prevPoll.total + 1,
         yesPercent: Math.round((prevPoll.yesCount/prevPoll.total) * 100), 
         noPercent: Math.round((prevPoll.noCount/prevPoll.total) * 100),
      }
   ))
 }
 
 return (
    <View>
      <Button title="Yes" onPress={incrementYes}></Button>
      <Button title="No" onPress={incrementNo}></Button>
         <Text>Name: {poll.pollName}</Text>
         <Text>Yes: {poll.yesCount}</Text>
         <Text>No: {poll.noCount}</Text>
         <Text>Percent Yes: {poll.yesPercent} %</Text>
         <Text>Percent No: {poll.noPercent} %</Text>
         <Text>Total: {poll.total}</Text>
    </View>
 )
}