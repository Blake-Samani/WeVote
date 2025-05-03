import { getAuth } from 'firebase/auth';
import { createCustomPoll } from '../services/createPoll';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function adminSettings() {
    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();
    const [pollName, setPollName] = useState('');
    const [pollQuestion, setPollQuestion] = useState('');

    useEffect(() => {
        if (!user) {
          Alert.alert('User is not authenticated');
    
          // Automatically redirect after 3 seconds
          setTimeout(() => {
            router.push('/'); // Navigates to index.tsx
          }, 3000);
        }
      }, []); // Empty array means this only runs once when the component mounts
    
    const handleCreatePoll = async (pollName: string, pollQuestion: string) => {

          // Runtime validation to ensure strings are not empty or invalid
        if (typeof pollName !== 'string' || pollName.trim() === '') {
            console.error('Invalid poll name: must be a non-empty string');
            return;
        }

        if (typeof pollQuestion !== 'string' || pollQuestion.trim() === '') {
            console.error('Invalid poll question: must be a non-empty string');
            return;
        }
        const result = await createCustomPoll(pollName, pollQuestion);
      

        if (result.success) {
            Alert.alert('Success', `Poll created with ID: ${result.pollId}`);
          } else {
            Alert.alert('Error', `Poll creation failed: ${result.error}`);
          }
      }

      const onSubmit = async () => {
        await handleCreatePoll(pollName, pollQuestion);
      };

      return(
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Poll Name"
          value={pollName}
          onChangeText={setPollName}
        />
        <TextInput
          style={styles.input}
          placeholder="Poll Question"
          value={pollQuestion}
          onChangeText={setPollQuestion}
          multiline
        />
        <Button title="Create Poll" onPress={onSubmit} />
      </View>
      )



}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: 16,
      borderRadius: 6,
    },
  });