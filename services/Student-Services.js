import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";



const studentCollection = collection(db,"students")

class StudentDataService {
     addStudent = (newStudent) => {
        return addDoc(studentCollection,newStudent)
    }

    updateStudent = (id,updateData)=>{
        const stuDoc = doc(db ,"students",id)
        return updateDoc(stuDoc,updateData)
    }

    deleteStudent = (id) => {
        const stuDoc = doc(db ,"students" ,id)
        return deleteDoc(stuDoc)
    }

    getAllStudents = ()=>{
        return getDocs(studentCollection)
    }
    
    getStudent = (id) =>{
        const stuDoc = doc(db ,"students" ,id)
        return getDoc(stuDoc)

    }

}

export default new StudentDataService