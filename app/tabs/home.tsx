import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";
import { Link, Tabs } from 'expo-router';
import Poll from "../components/poll"
import SignOut from "../components/signout";

const Home = () => {
    

    return ( 
      <View style={styles.container}>
      {/* Optional top link */}
      <View style={styles.topBar}>
        <Link href="/" asChild>
          <Button title="Home / Back to Home" />
        </Link>
      </View>

      {/* Poll list fills most of screen */}
      <View style={styles.listContainer}>
        <Poll />
      </View>

      <SignOut />
    </View>
    
    );
}
 
export default Home;

const styles= StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
  },
  topBar: {
    padding: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

})
