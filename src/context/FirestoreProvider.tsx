import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import _ from "lodash";

interface HackerInterface {
  id: string;
  breakfastSat: boolean;
  breakfastSun: boolean;
  dinnerFri: boolean;
  dinnerSat: boolean;
  lunchSat: boolean;
  lunchSun: boolean;
  midnightFri: boolean;
  midnightSat: boolean;
  name: string;
  workshopRaffle: number;
}

interface FirestoreInterface {
  hacker: HackerInterface;
  setHacker: Dispatch<SetStateAction<HackerInterface>>;
  getHacker: (id: string) => void;
  updateHacker: (hacker: HackerInterface) => void;
  isLoading: boolean;
  error: string;
  setError: (error: string) => void;
}

const defaultHacker = {
  id: "",
  breakfastSat: false,
  breakfastSun: false,
  dinnerFri: false,
  dinnerSat: false,
  lunchSat: false,
  lunchSun: false,
  midnightFri: false,
  midnightSat: false,
  name: "",
  workshopRaffle: 0,
};

const defaultFirestore: FirestoreInterface = {
  hacker: defaultHacker,
  setHacker: () => null,
  getHacker: () => null,
  updateHacker: () => null,
  isLoading: false,
  error: "",
  setError: () => null,
};

interface FirestoreProviderProps {
  children: React.ReactNode;
}

export const FirestoreContext =
  createContext<FirestoreInterface>(defaultFirestore);

const FirestoreProvider: React.FC<FirestoreProviderProps> = ({ children }) => {
  const [hacker, setHacker] = useState<HackerInterface>(defaultHacker);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getHacker = async (id: string) => {
    setIsLoading(true);
    setError("");
    try {
      const docRef = doc(db, "user", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setHacker({ ...(docSnap.data() as HackerInterface), id });
      } else {
        setError("Hacker does not exist!");
      }
    } catch (err) {
      setError("Unknown error loading hacker");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHacker = async (hacker: HackerInterface) => {
    setIsLoading(true);
    setError("");
    try {
      const docRef = doc(db, "user", hacker.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const newHackerObj: any = _.cloneDeep(hacker);
        delete newHackerObj.id;
        await setDoc(doc(db, "user", hacker.id), newHackerObj);
        setHacker(hacker);
      } else {
        setError("Hacker does not exist!");
      }
    } catch (err) {
      setError("Unknown error updating hacker");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FirestoreContext.Provider
      value={{
        hacker,
        setHacker,
        isLoading,
        getHacker,
        updateHacker,
        error,
        setError,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
