import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { db } from "./firebase";
import { newsData, NewsItem } from "../data/news";

// Helper to convert title to slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "")    // Remove special characters
    .trim()
    .replace(/\s+/g, "-");           // Replace spaces with dashes
}

export interface FirestoreNewsItem {
  id: string;
  title: string;
  category: 'Eventos' | 'Atualização' | 'Comunidade' | 'Anúncio' | 'Competitivo';
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
  createdAt: number; // For sorting chronologically
}

const COLLECTION_NAME = "news";

// Get all news sorted by date (newest first)
export async function getNews(): Promise<FirestoreNewsItem[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const news: FirestoreNewsItem[] = [];
    querySnapshot.forEach((doc) => {
      news.push({
        id: doc.id,
        ...doc.data()
      } as FirestoreNewsItem);
    });
    return news;
  } catch (error) {
    console.error("Error fetching news from Firestore: ", error);
    // Fallback to static mock data if Firestore fails or is not yet configured
    return newsData.map((item, idx) => ({
      ...item,
      createdAt: Date.now() - idx * 86400000 // Fake chronological timestamps
    }));
  }
}

// Get single news item by id/slug
export async function getNewsItem(id: string): Promise<FirestoreNewsItem | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as FirestoreNewsItem;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching news item ${id}: `, error);
    const fallback = newsData.find(item => item.id === id);
    if (fallback) {
      return {
        ...fallback,
        createdAt: Date.now()
      };
    }
    return null;
  }
}

// Add a new news item
export async function addNewsItem(item: Omit<FirestoreNewsItem, 'id' | 'createdAt'> & { id?: string }): Promise<string> {
  const id = item.id || generateSlug(item.title);
  const docRef = doc(db, COLLECTION_NAME, id);
  
  // Format current date in PT-BR style
  const dateStr = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const newItem: Omit<FirestoreNewsItem, 'id'> = {
    title: item.title,
    category: item.category,
    date: item.date || dateStr,
    summary: item.summary,
    content: item.content,
    imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    createdAt: Date.now()
  };

  await setDoc(docRef, newItem);
  return id;
}

// Update existing news item
export async function updateNewsItem(id: string, item: Partial<Omit<FirestoreNewsItem, 'id' | 'createdAt'>>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, item);
}

// Delete a news item
export async function deleteNewsItem(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

// Populate Firestore with default news if collection is empty
export async function importDefaultNews(): Promise<number> {
  try {
    const existing = await getNews();
    
    // Check if we are using fallback or if the actual Firestore returned anything
    // We try to verify by attempting to get docs from Firestore directly
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (!snapshot.empty) {
      return 0; // Already has data
    }

    let count = 0;
    for (const [idx, item] of newsData.entries()) {
      const docRef = doc(db, COLLECTION_NAME, item.id);
      const newItem: Omit<FirestoreNewsItem, 'id'> = {
        title: item.title,
        category: item.category,
        date: item.date,
        summary: item.summary,
        content: item.content,
        imageUrl: item.imageUrl,
        createdAt: Date.now() - idx * 60000 // Stagger by 1 minute
      };
      await setDoc(docRef, newItem);
      count++;
    }
    return count;
  } catch (error) {
    console.error("Error importing default news: ", error);
    throw error;
  }
}
