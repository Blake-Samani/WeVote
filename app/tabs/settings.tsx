import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Button} from "react-native";
import  Poll from "../components/poll"
import AdminSettings from "../components/adminSettings";
import { Link, Tabs } from 'expo-router';
import SignOut from "../components/signout";


const Settings = () => {


    return ( <View style={{paddingVertical: 100, flex: 1}}>
        <Link href="/" asChild>
            <Button 
            title="settings pages/ back to home"
            ></Button>
        </Link>
        <SignOut></SignOut>
        <AdminSettings></AdminSettings>
        
        
        
    </View> );
}
 
export default Settings;