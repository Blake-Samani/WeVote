import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";
import { Link, Tabs } from 'expo-router';
import  Poll from "../components/poll"

const Home = () => {
    

    return ( <View>
        <Link href="/" asChild>
            <Button 
            title="home pages /back to home"
            ></Button>
        </Link>
        <Poll></Poll>
        
    </View> );
}
 
export default Home;