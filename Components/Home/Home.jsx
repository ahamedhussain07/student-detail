import { useState } from "react";

import { FaUserFriends, FaUserGraduate } from "react-icons/fa";
import classes from "./Home.module.css";

import StudentDetail from "./Student/StudentDetail";
import StudentForm from "./Student/StudentForm";

const dummyData = [
  {
    id: 1,
    name: "ahamed",
    age: "4",
    school: "model school",
    class: "3",
    division: "A",
    status: "Active",
  },
  {
    id: 2,
    name: "ahamed",
    age: "5",
    school: "al school",
    class: "6",
    division: "A",
    status: "Active",
  },
];

const Home = ({data}) => {
  const [studentToggle, setStudentToggle] = useState(false);

  const [studentData, setStudentData] = useState(data);

  const toggleHandler = () => {
    setStudentToggle(!studentToggle);
  };

  return (
    <div className={classes.homePage}>
      <div className={classes.sidebarContent}>
        <div className={classes.sidebar}>
          <h2>Student</h2>
          <div
            style={{ paddingBottom: "10px" }}
            className={studentToggle ? "" : classes.textColor}
            onClick={toggleHandler}
          >
            <FaUserFriends />{" "}
            <span style={{ paddingLeft: "10px", cursor: "pointer" }}>
              View Student
            </span>
          </div>
          <div
            className={studentToggle ? classes.textColor : ""}
            onClick={toggleHandler}
          >
            <FaUserGraduate />{" "}
            <span style={{ paddingLeft: "10px", cursor: "pointer" }}>
              Add Student
            </span>
          </div>
        </div>
      </div>
      <div className={classes.mainContent}>
        {" "}
        {studentToggle ? (
          <StudentForm
            toggle={setStudentToggle}
            data={studentData}
            setData={setStudentData}
          />
        ) : (
          <StudentDetail data={studentData} setData={setStudentData} />
        )}
      </div>
    </div>
  );
};

export default Home;
