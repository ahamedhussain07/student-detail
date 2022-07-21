import { useState, useEffect } from "react";

import StudentDataService from "../../../services/Student-Services";

import SelectOption from "../../UI/Select";

import classes from "./StudentForm.module.css";

const StudentForm = ({ data, setData, toggle, setEditId, editId }) => {
  const [updateBtn, setUpdateBtn] = useState(false);

  const [student, setStudent] = useState({
    id:"",
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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      name.length < 3 ||
      school.length === 0 ||
      division.length === 0 ||
      student.class.length === 0
    )
      return alert("fill the form");

    if (updateBtn) {
      await StudentDataService.updateStudent(editId, student);

      const IndexOf = data.findIndex((item) => item.id === editId);

      let editStudent = data[IndexOf];

      editStudent.age = age;
      editStudent.name = name;
      editStudent.school = school;
      editStudent.division = division;
      editStudent.class = student.class;
      editStudent.status = status;

      setEditId("");

      setData((prev) => {
        const updatedData = [...prev];

        updatedData[IndexOf] = editStudent;

        return updatedData;
      });
    } else {
      const getAge = (ages) =>
        Math.floor((new Date() - new Date(ages).getTime()) / 3.15576e10);

      const studentAge = getAge(student.age);

      student.age = studentAge;

      try {
        const datas = await StudentDataService.addStudent(student);
        student.id = datas._key.path.segments[1]

       
        setData((prev) => [...prev, student]);
      } catch (error) {
        alert(error.message);
      }
    }

    setStudent({});
    toggle(false);
  };

  const editHandler = async () => {
    try {
      const docSnap = await StudentDataService.getStudent(editId);
      setStudent({
        name: docSnap.data().name,
        school: docSnap.data().school,
        age: docSnap.data().age,
        division: docSnap.data().division,
        status: docSnap.data().status,
        class: docSnap.data().class,
      });

      age;
    } catch (error) {
      alert("error at fetching");
    }
  };

  useEffect(() => {
    if (editId !== undefined && editId !== "") {
      editHandler();
      setUpdateBtn(true);
    }
  }, []);

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
            type={updateBtn ? "number" : "date"}
            name="age"
            value={age}
            max="2022-12-22"
            onChange={inputHandler}
          />
        </div>
        <div className={classes.formInput}>
          <label>School</label>
          <SelectOption
            onChange={inputHandler}
            placeholder={school ? school : "select"}
            name="school"
            values={["model school", "AL school", "child school"]}
          />
        </div>
        <div className={classes.formInput}>
          <label>Class</label>
          <SelectOption
            onChange={inputHandler}
            placeholder={student.class ? student.class : "select"}
            name="class"
            values={[1, 2, 3, 4, 5, 6, 7]}
          />
        </div>
        <div className={classes.formInput}>
          <label>Division</label>
          <SelectOption
            onChange={inputHandler}
            placeholder={division ? division : "select"}
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
              onClick={inputHandler}
              checked={status === "active"}
            />
          </>
          <>
            <label>Invoice</label>
            <input
              type="radio"
              id="status"
              name="status"
              value={"invoice"}
              onClick={inputHandler}
              checked={status === "invoice"}
            />
          </>
        </div>
        <button>{updateBtn ? "Update" : "Save"}</button>
      </form>
    </>
  );
};

export default StudentForm;
