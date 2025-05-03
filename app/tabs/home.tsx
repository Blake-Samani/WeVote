import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";
import { Link, Tabs } from 'expo-router';
import Poll from "../components/poll"
import SignOut from "../components/signout";

const Home = () => {
    

    return ( <View style={styles.container}>
        <View style={{flex: 1}}>
        <Link href="/" asChild>
            <Button 
            title="home pages /back to home"
            ></Button>
        </Link>
        </View>
        <View style={{flex: 3}}>
        <Poll></Poll>
        </View>
        <SignOut></SignOut>
    </View>
    
    );
}
 
export default Home;

const styles= StyleSheet.create({

  container: {
    backgroundColor: "#fffaf0",
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
