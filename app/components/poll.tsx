import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function Poll() {
 
 const [poll, setPoll] = useState({
    pollName: "Test Poll",
    yesCount: 0,
    noCount: 0,
    yesPercent: 0,
    noPercent: 0,
    total: 0,
    winner: '',
 });

 const pieData = [
   {
     value: poll.noCount,
     color: '#93FCF8',
   },
   {
      value: poll.yesCount, 
      color:'#009FFF', 
      },
 ];

 const renderDot = (color) => {
   return (
     <View
       style={{
         height: 10,
         width: 10,
         borderRadius: 5,
         backgroundColor: color,
         marginRight: 10,
       }}
     />
   );
 };

 const renderLegendComponent = () => {
   return (
     <>
       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'center',
           marginBottom: 10,
         }}>
         <View
           style={{
             flexDirection: 'row',
             alignItems: 'center',
             width: 120,
             marginRight: 20,
           }}>
           {renderDot('#006DFF')}
           <Text style={{color: 'white'}}>Yes {poll.yesPercent} %</Text>
         </View>
         <View
           style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
           {renderDot('#3BE9DE')}
           <Text style={{color: 'white'}}>No {poll.noPercent} %</Text>
         </View>
       </View>

     </>
   );
 };
 

 function incrementYes () {
   setPoll( prevPoll => (
      {
         ...prevPoll, 
         yesCount: prevPoll.yesCount + 1, 
         total: prevPoll.total + 1,
         yesPercent: Math.round((prevPoll.yesCount/prevPoll.total) * 100), 
         noPercent: Math.round((prevPoll.noCount/prevPoll.total) * 100),
         winner: prevPoll.yesPercent > prevPoll.noPercent ? 'Yes' : 'No',
      }
   ))
 }

 /**todo:
   create logic that gives 50/50
   currently 50/50 defaults to one side having 1 percentage more
   possible fix is math.round at time of render vs in function
   repeated code in increment functions, figure out how to consolidate
    */
 function incrementNo () {
   setPoll( prevPoll => (
      {
         ...prevPoll, 
         noCount: prevPoll.noCount + 1, 
         total: prevPoll.total + 1,
         yesPercent: Math.round((prevPoll.yesCount/prevPoll.total) * 100), 
         noPercent: Math.round((prevPoll.noCount/prevPoll.total) * 100),
         winner: prevPoll.yesPercent > prevPoll.noPercent ? 'Yes' : 'No',
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
         <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
         Results
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  {poll.winner}
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>
                  {poll.winner == 'Yes' ? poll.yesPercent : poll.noPercent} %
                  </Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
    </View>
 )
}