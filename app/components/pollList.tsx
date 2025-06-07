import { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import Poll from '../components/poll'; // Reusable Poll component
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

type Poll = {
  id: string;
  pollName: string;
  yesCount: number;
  noCount: number;
  yesPercent: number;
  noPercent: number;
  total: number;
  winner: string;
};

export default function PollList() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  //listening to db
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'polls'), (snap) => {
      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as Poll))
        .filter((poll) => poll.pollName); // basic validation
      setPolls(data);
    });
    return () => unsub();
  }, []);

  //argument: type
  const openPoll = (poll: Poll) => {
    setSelectedPoll(poll);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPoll(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={polls}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.pollCard} onPress={() => openPoll(item)}>
            {/* Poll summary in card */}
            <Text style={styles.pollTitle}>{item.pollName}</Text>
            <Text>Yes: {item.yesCount} ({item.yesPercent}%)</Text>
            <Text>No: {item.noCount} ({item.noPercent}%)</Text>
            <Text>Total: {item.total}</Text>
            <Text>Winner: {item.winner}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Poll Details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            {/*short-circuit conditional rendering pattern, 
            Only render this block if selectedPoll is not null or undefined, 
            same as
            if (selectedPoll) {
              return everything inside ();
            } else {
                return null;
            } */}
            {selectedPoll && (
              <>
                {/* Full Poll view rendered in modal */}
                <Poll initialPoll={selectedPoll} />

                <Pressable style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  pollCard: {
    backgroundColor: '#eee',
    padding: 20,
    marginBottom: 16,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'stretch',
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
