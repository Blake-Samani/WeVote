import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";
import { Link } from 'expo-router';

const Home = () => {
    return ( <View>
        <Link href="/" asChild>
            <Button 
            title="back to home"
            ></Button>
        </Link>
        
        
        
    </View> );
}
 
export default Home;