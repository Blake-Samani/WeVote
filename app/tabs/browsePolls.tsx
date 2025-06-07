import {  View, StyleSheet } from 'react-native';
import PollList from "../components/pollList"

export default function BrowsePolls() {


  return (
    <View style={styles.container}>
      <PollList></PollList> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // full height
    backgroundColor: '#fff',
    padding: 16,
  },

});