import {
  collection,
  onSnapshot,
  query,
  doc,
  setDoc,
  deleteDoc,
  DocumentData,
  WithFieldValue,
  QueryConstraint,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";

type UseFirebaseProps = {
  collectionName: string;
  constraints?: QueryConstraint[];
};

export const useFirebase = <T extends DocumentData>({
  collectionName,
  constraints = [],
}: UseFirebaseProps): {
  data: Array<T>;
  add: (data: T) => Promise<void>;
  remove: (key: string) => Promise<void>;
} => {
  const [data, setData] = useState<Array<T>>([]);

  const add = async (item: WithFieldValue<T>) => {
    const ref = doc(collection(db, collectionName));
    await setDoc(ref, item);
  };

  const remove = async (key: string) => {
    await deleteDoc(doc(db, collectionName, key));
  };

  useEffect(() => {
    const ref = collection(db, collectionName);
    const q = query(ref, ...constraints);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: Array<T> = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data() as T);
      });
      setData(items);
    });

    return unsubscribe;
  }, [collectionName, JSON.stringify(constraints)]);

  return { data, add, remove };
};
