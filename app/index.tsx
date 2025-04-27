import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions, TextInput} from "react-native";
import { useFonts } from '@expo-google-fonts/bangers/useFonts';
import { Bangers_400Regular } from '@expo-google-fonts/bangers/400Regular';
import * as React from 'react';
import {useState} from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const width = Dimensions.get('window').width;

const App = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) router.replace('./tabs/home');
    } catch (error: any) {
      console.log(error)
      alert(('Sign in failed: ') + error.message);
    }
  };

  const signUp = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth, email, password)
      if (user) router.replace('./tabs/home');
    } catch (error: any) {
      console.log(error)
      alert(('Sign in failed: ') + error.message);
    }
  };
 
  

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
        <TextInput placeholder="email" value={email} onChangeText={setEmail}></TextInput>
        <TextInput placeholder="password" value={password} onChangeText={setPassword}></TextInput>
          <Text>
            <Text style={styles.we}>We </Text>
            <Text style={styles.vote}>Vote </Text>
          </Text>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
        <Image style={styles.icon} source={require('../assets/images/willpower.png')} />
        </View>
        <View style={styles.bottomView}>
         
        <TouchableOpacity style={styles.loginButton}
           onPress={
            signIn
          }>
          <Text style={styles.loginText}>LOGINNN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}
        onPress={signUp
        }
        >
          <Text style={styles.loginText}>Create Account</Text>
        </TouchableOpacity>
        </View>
      </View>
  
    );
  }

}

export default App;

const styles= StyleSheet.create({
  icon:{
    justifyContent:'center', 
    width: 100, 
    height: 100
  },
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
