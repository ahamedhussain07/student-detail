import { useState } from "react";

import { HiDownload } from "react-icons/hi";

import SelectOption from "../../UI/Select";
import StudentTable from "../../UI/Table";

import classes from "./StudentDetail.module.css";

const StudentDetail = ({ data, setData }) => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    school: "",
    class: "",
    division: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setStudent((prev) => ({ ...prev, [name]: value }));
  };


  const { name, school, age, division } = student;

  const searchHandler = (e) => {
    e.preventDefault();

    const filteredData =
      data &&
      data.filter(
        (item) =>
          item.name === name &&
          item.school === school &&
          item.division === division &&
          item.age === age &&
          item.class &&
          student.class
      );

        setData(filteredData)
        setStudent({})
    
  };

  return (
    <>
      <div className={classes.studentDetail}>
        <h3 style={{ color: "#ea2727" }}>View Student</h3>
        <form className={classes.studentInput} onSubmit={searchHandler}>
          <input
            type="text"
            value={name}
            name="name"
            placeholder="Name"
            onChange={inputHandler}
          />
          <input
            type="text"
            placeholder="Age"
            onChange={inputHandler}
            value={age}
            name="age"
          />
          <SelectOption
            onChange={inputHandler}
            name="school"
            placeholder="School"
            values={["model school", "child school"]}
          />
          <SelectOption
            name="class"
            placeholder="Class"
            values={[3, 4, 5]}
            onChange={inputHandler}
          />
          <SelectOption
            name="division"
            placeholder="Division"
            values={["A", "B"]}
            onChange={inputHandler}
          />
          <button>Search</button>
        </form>
      </div>
      <div className={classes.studentTable}>
        <StudentTable data={data} />
      </div>
      <button className={classes.downloadBtn}>
        Download Excel <HiDownload />
      </button>
    </>
  );
};

export default StudentDetail;
