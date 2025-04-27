import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";
import  Poll from "../components/poll"
import { Link, Tabs } from 'expo-router';

const Settings = () => {
    

    return ( <View>
        <Link href="/" asChild>
            <Button 
            title="settings pages/ back to home"
            ></Button>
        </Link>
        <Poll></Poll>
        
    </View> );
}
 
export default Settings;