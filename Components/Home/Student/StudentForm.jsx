import { useState } from "react";

import SelectOption from "../../UI/Select";

import classes from "./StudentForm.module.css";

const StudentForm = ({ data, setData, toggle }) => {
  const [student, setStudent] = useState({
    name: "",
    school: "",
    age: "",
    class: "",
    division: "",
    status: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const { name, school, age, division, status } = student;

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      name.length < 3 ||
      school.length === 0 ||
      division.length === 0 ||
      status.length === 0 ||
      student.class.length === 0
    )
      return alert("fill the form");

    const getAge = (ages) =>
      Math.floor((new Date() - new Date(ages).getTime()) / 3.15576e10);

    const studentAge = getAge(student.age);

    student.age = studentAge;

    const addStudentHandler = async (newStudent) => {
      const responce = await fetch("/api/new-student", {
        method: "POST",
        body: JSON.stringify(newStudent),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await responce.json();

    };

    addStudentHandler(student);

    setData((prev) => [...prev, student]);

    setStudent({});

    toggle(false);
  };

  return (
    <>
      <form className={classes.StudentForm} onSubmit={submitHandler}>
        <h3>Add Student</h3>
        <div className={classes.formInput}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={inputHandler}
            value={student.name}
          />
        </div>
        <div className={classes.formInput}>
          <label>Date Of Birth</label>
          <input
            type="date"
            name="age"
            value={age}
            min="2010-01-01"
            max="2022-12-22"
            onChange={inputHandler}
          />
        </div>
        <div className={classes.formInput}>
          <label>School</label>
          <SelectOption
            onChange={inputHandler}
            placeholder={"select"}
            name="school"
            values={["model school", "AL school"]}
          />
        </div>
        <div className={classes.formInput}>
          <label>Class</label>
          <SelectOption
            onChange={inputHandler}
            placeholder={"select"}
            name="class"
            values={[5, 6, 7]}
          />
        </div>
        <div className={classes.formInput}>
          <label>Division</label>
          <SelectOption
            onChange={inputHandler}
            placeholder={"select"}
            name="division"
            values={["A", "B", "C"]}
          />
        </div>
        <div className={classes.formInput}>
          <label>Status</label>
          <>
            <label>Active</label>
            <input
              type="radio"
              id="status"
              name="status"
              value={"active"}
              onChange={inputHandler}
            />
          </>
          <>
            <label>Invoice</label>
            <input
              type="radio"
              id="status"
              name="status"
              value={"invoice"}
              onChange={inputHandler}
            />
          </>
        </div>
        <button>Save</button>
      </form>
    </>
  );
};

export default StudentForm;
