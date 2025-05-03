
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../FirebaseConfig';

//union type, union of objects type
type PollCreationResult =
  | { success: true; pollId: string }
  | { success: false; error: string };

export const createCustomPoll = async (pollName: string, pollQuestion: string): Promise<PollCreationResult> => {
  if (typeof pollName !== 'string' || pollName.trim() === '') {
    return { success: false, error: 'Poll name must be a non-empty string' };
  }

  if (typeof pollQuestion !== 'string' || pollQuestion.trim() === '') {
    return { success: false, error: 'Poll question must be a non-empty string' };
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return { success: false, error: 'User is not authenticated' };
  }

  const newPoll = {
    pollName: pollName,
    pollQuestion: pollQuestion,
    yesCount: 0,
    noCount: 0,
    yesPercent: 0,
    noPercent: 0,
    total: 0,
    winner: '',
  };

  //returns a promise of pollcreateresult type, union type
  try {
    const docRef = await addDoc(collection(db, 'polls'), newPoll);
    return { success: true, pollId: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create poll' };
  }
};

export default createCustomPoll;