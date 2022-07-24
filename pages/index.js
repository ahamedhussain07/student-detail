import StudentDataServices from "../services/Student-Services";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import Home from "../Components/Home/Home";
const HomePage = ({ data }) => {
  const router = useRouter();

  const [studentData, setStudentData] = useState(data);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token)  router.push("/signin");

    if (
      token &&
      (router.pathname === "/signin" || router.pathname === "/signup")
    ) {
      alert("already logined cannot login again");
      
    }
  }, [router.pathname]);

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
