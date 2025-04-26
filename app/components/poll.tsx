import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";

export default function Poll() {
 
 const [poll, setPoll] = useState({
    pollName: "Test Poll",
    yesCount: 0,
    noCount: 0,
 });

 return (
    <View>
        <Text>Name: {poll.pollName}</Text>
        <Text>Yes: {poll.yesCount}</Text>
        <Text>No: {poll.noCount}</Text>
    </View>
 )
}