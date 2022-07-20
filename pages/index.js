import { MongoClient } from "mongodb";

import { useEffect } from "react";
import { useRouter } from "next/router";

import Home from "../Components/Home/Home";
const HomePage = ({students}) => {
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
      <Home data={students}  />
    </>
  );
};

export async function getStaticProps() {
  // fetch the data from api

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGO_URL
  );

  const db = client.db();

  const studentCollection = db.collection("students");

  const students = await studentCollection.find().toArray();

  client.close();
  return {
    props: {
      students,
    },
    revalidate: 1,
  };
}

export default HomePage;
