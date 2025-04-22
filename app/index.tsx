import { Text, View, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { useFonts } from '@expo-google-fonts/bangers/useFonts';
import { Bangers_400Regular } from '@expo-google-fonts/bangers/400Regular';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Link } from 'expo-router';


const width = Dimensions.get('window').width;

const App = () => {

  let [fontsLoaded] = useFonts({
    Bangers_400Regular
  });

  if(!fontsLoaded){
    return null;
  } else{
    return (
      <View
      style={styles.container}
      >
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>
            <Text style={styles.we}>We </Text>
            <Text style={styles.vote}>Vote </Text>
          </Text>
        </View>
        <View style={styles.bottomView}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Create Account</Text>
        </TouchableOpacity>
        </View>
      </View>
  
      
      
    );
  }

}

export default App;

const styles= StyleSheet.create({
  container: {
    backgroundColor: "#fffaf0",
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  we: {
    fontFamily: "Bangers_400Regular",
    color: "#00008b",
    fontSize: 50,
  },
  vote: {
    color: "#8b0000",
    fontSize: 50,
    fontFamily: "Bangers_400Regular",
  },
  loginButton: {
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: width*0.9,
    alignItems: 'center',
  },
  bottomView:{
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
  },
  loginText:{
    alignItems: 'center',
    justifyContent: 'center',
  }
})
