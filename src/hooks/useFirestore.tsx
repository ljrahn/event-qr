import { useContext } from "react";
import { FirestoreContext } from "@context/FirestoreProvider";

const useFirestore = () => useContext(FirestoreContext);

export default useFirestore;
