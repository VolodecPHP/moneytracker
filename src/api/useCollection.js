import { projectFirestore } from "./firebaseconfig";

export const useCollection = collection => {
  const addDoc = async (data, name) => {
    try {
      await projectFirestore
        .collection(collection)
        .doc(name)
        .set(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addDocWithRandomName = async data => {
    try {
      await projectFirestore.collection(collection).add(data);
    } catch (err) {
      console.log(err.message);
    }
  };

	const getDoc = async name => {
		const docRef = projectFirestore.collection(collection).doc(name);
		const res = await docRef.get()

		if(res.exists) {
			return res.data()
		} 

		return false
	}

	const getAllDocuments = async () => {
		const collectionRef = projectFirestore.collection(collection)

		const res = await collectionRef.get()

		if(!res.empty) {
			return res.docs
		} 

		return false
	}

  return { addDoc, addDocWithRandomName, getDoc, getAllDocuments};
};
