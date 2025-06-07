import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { auth, db } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const LoginModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //union type, can only be sign in or sign up, default is sign in
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');
  const router = useRouter();

  // Functions for signing in and signing up
  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace('./tabs/home');
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    }
  };

  const signUp = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

          // Add user to Firestore users collection with uid as doc ID
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: serverTimestamp(),
        });

      if (user) router.replace('./tabs/home');
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    }
  };

  const handleSubmit = () => {
    authMode === 'signIn' ? signIn() : signUp();
    setIsModalVisible(false); // Close the modal after submit
  };

  const handleModalSignPress = () => {
    setAuthMode('signIn');
    setIsModalVisible(true);
  };

  const handleModalSignUpPress = () => {
    setAuthMode('signUp');
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Button Container for Sign In and Create Account */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          accessibilityLabel="Sign In Button"
          style={styles.modalButton}
          onPress={handleModalSignPress}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityLabel="Create Account Button"
          style={styles.modalButton}
          onPress={handleModalSignUpPress}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal transparent visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <BlurView intensity={100} style={StyleSheet.absoluteFill} />

          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{authMode === 'signIn' ? 'Sign In' : 'Create Account'}</Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <View style={styles.buttonRow}>
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start', // Align children to the top of the container
      alignItems: 'center',
      paddingTop: 50, // Optional: Add some padding at the top to give space
      gap: 10,
    },
    buttonContainer: {
      flexDirection: 'row', // This makes the buttons align side by side
      justifyContent: 'space-between',
      width: '80%', // Optional: Adjust width for spacing
      gap: 10, // Optional: Control spacing between the buttons
      marginTop: 50, // Adds some space above the buttons, move them upwards
    },
    modalButton: {
      backgroundColor: '#3498db',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 25,
      elevation: 4,
      alignItems: 'center', // Ensures text is centered
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
      textAlign: 'center',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      width: '80%',
      borderRadius: 10,
      zIndex: 2,
      elevation: 5,
      paddingBottom: 10, // Optional: Adjust bottom padding if needed
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 10,
      marginBottom: 12,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      marginTop: 10,
    },
  });

export default LoginModal;
