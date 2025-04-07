import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export interface ImageData {
  id?: string;
  url: string;
  name: string;
  timestamp: number;
}

export const addImageUrl = async (
  imageData: Omit<ImageData, "id" | "timestamp">
) => {
  try {
    const docRef = await addDoc(collection(db, "images"), {
      ...imageData,
      timestamp: Date.now(),
    });
    return { ...imageData, id: docRef.id, timestamp: Date.now() };
  } catch (error) {
    console.error("Error adding image URL:", error);
    throw error;
  }
};

export const getImageUrls = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "images"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ImageData[];
  } catch (error) {
    console.error("Error getting image URLs:", error);
    throw error;
  }
};

export const getImageUrlByName = async (name: string) => {
  try {
    const q = query(collection(db, "images"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    } as ImageData;
  } catch (error) {
    console.error("Error getting image URL by name:", error);
    throw error;
  }
};
