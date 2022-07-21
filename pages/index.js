import StudentDataServices from "../services/Student-Services";

import { useState } from "react";

import Home from "../Components/Home/Home";
const HomePage = ({ data }) => {
  const [studentData, setStudentData] = useState(data);

  return (
    <>
      <Home studentData={studentData} setStudentData={setStudentData} />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const res = await StudentDataServices.getAllStudents();

  const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return { props: { data } };
}

export default HomePage;
