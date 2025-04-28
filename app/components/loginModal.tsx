import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const LoginModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

   const router = useRouter();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const signIn = async () => {
      try{
        const user = await signInWithEmailAndPassword(auth, email, password)
        if (user) router.replace('./tabs/home');
      } catch (error: any) {
        console.log(error)
        alert(('Sign in failed: ') + error.message);
      }
    };
  
    const signUp = async () => {
      try{
        const user = await createUserWithEmailAndPassword(auth, email, password)
        if (user) router.replace('./tabs/home');
      } catch (error: any) {
        console.log(error)
        alert(('Sign in failed: ') + error.message);
      }
    };
   
    const handleSubmit = () => {
        signIn();
        closeModal();
      };
    



  return (
    <View style={styles.container}>
      {/* Button to open modal */}
      <TouchableOpacity style={styles.openButton} onPress={openModal}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <BlurView intensity={50} style={StyleSheet.absoluteFill} />

          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Details</Text>

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
              <Button title="Cancel" onPress={closeModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  openButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
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