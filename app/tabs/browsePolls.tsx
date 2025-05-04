import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { Link } from 'expo-router';

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

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'polls'), (snap) => {
      const data = snap.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as Poll))
        .filter((poll) => poll.pollName); // basic validation
      setPolls(data);
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={polls}
        //doc id acts as flatlist key for each item rather than index
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Link href={`/poll/${String(item.id)}`} asChild>
            <TouchableOpacity style={styles.pollCard}>
              <Text style={styles.pollTitle}>{item.pollName}</Text>
              <Text>Yes: {item.yesCount} ({item.yesPercent}%)</Text>
              <Text>No: {item.noCount} ({item.noPercent}%)</Text>
              <Text>Total: {item.total}</Text>
              <Text>Winner: {item.winner}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // full height
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
    width: '100%',           // Full width
    alignSelf: 'stretch',    // Ensures child stretches
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});
