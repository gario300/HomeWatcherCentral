import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore'
class QueriyingClass {
  /*
  addDataWithId = (collectionName = '', obj = {}, id) => {
    return new Promise (async (resolve, reject) => {
      try {
        const db = getFirestore()
        await addDoc(collection(db, collectionName), obj)
        resolve('Su cuenta ha sido registrada con exito, ahora puede acceder con su email y contraseña')
      } catch (e) {
        reject({ message: e.message, type: false })
      }
    })
  }
  */
  addData = (collectionName = '', obj = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = getFirestore()
        await addDoc(collection(db, collectionName), obj)
        resolve('Su cuenta ha sido registrada con exito, ahora puede acceder con su email y contraseña')
      } catch (e) {
        reject(e.message)
      }
    })
  }

  editData = (collectionName = '', obj = {}, id = '') => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = getFirestore()
        await updateDoc(doc(db, collectionName, id), obj)
        resolve(obj)
      } catch (e) {
        reject(e.message)
      }
    })
  }

  deleteData = (collectionName = '', collectionId = '') => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = getFirestore()
        await deleteDoc(doc(db, collectionName, collectionId))
        resolve('deleted')
      } catch (e) {
        reject(e.message)
      }
    })
  }

  findByDoc = (collectionName = '', docId = '') => {
    return new Promise(async (resolve) => {
      const db = getFirestore()
      const q = doc(db, collectionName, docId)
      const querySnapshot = await getDoc(q)
      if (!querySnapshot.exists()) {
        resolve([])
        return
      }
      resolve([{
        ...querySnapshot.data(),
        id: querySnapshot.id
      }])
    })
  }

  findByOne = (collectionName = '', clauseObj) => {
    return new Promise(async (resolve) => {
      const db = getFirestore()
      const q = query(collection(db, collectionName), where(clauseObj.where, clauseObj.operator, clauseObj.clause))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        resolve([])
        return
      }
      resolve(querySnapshot.docs)
    })
  }

  findByTwo = (collectionName = '', clauseArr) => {
    return new Promise(async (resolve) => {
      const db = getFirestore()
      const q = query(collection(db, collectionName),
        where(clauseArr[0].where, clauseArr[0].operator, clauseArr[0].clause),
        where(clauseArr[1].where, clauseArr[1].operator, clauseArr[1].clause)
      )
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        resolve([])
        return
      }
      const finalData = []
      querySnapshot.forEach((doc) => {
        let newObj = {}
        newObj = {
          ...doc.data(),
          id: doc.id
        }
        finalData.push(newObj)
      })
      resolve(finalData)
    })
  }
}
export default new QueriyingClass()
