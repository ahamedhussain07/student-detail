import StudentDataServices from "../services/Student-Services";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Home from "../Components/Home/Home";
const HomePage = ({ data }) => {
  // setStudentData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  const [studentData, setStudentData] = useState(data);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");

    if (!token) {
      return router.push("/signin");
    }
  }, []);

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
