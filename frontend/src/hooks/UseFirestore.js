import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Config';

export const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, collectionName), orderBy('index', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        
        setDocs(documents);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { docs, loading, error };
};