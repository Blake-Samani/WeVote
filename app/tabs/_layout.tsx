import { Stack, Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function HomeLayout() {
    return (
        
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
          <Tabs.Screen
          name="browsePolls"
          options={{
            title: 'Browse Polls',
            tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="poll" color={color} />,
          }}
        />
      </Tabs>
    )
}
