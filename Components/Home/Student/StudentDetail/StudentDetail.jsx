import { useState } from "react";

import * as XLSX from "xlsx";

import { HiDownload } from "react-icons/hi";

import SelectOption from "../../../UI/Select";
import StudentTable from "../../../UI/Table";

import ReactPaginate from "react-paginate";

import classes from "./StudentDetail.module.css";

const StudentDetail = ({ data, setData, toggle, setEditId }) => {
  const [goBack, setGoBack] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    age: "",
    school: "",
    class: "",
    division: "",
  });

  const [pageNumber, setPageNumber] = useState(0);
  const studentPerPage = 8;
  const pageVisited = pageNumber * studentPerPage;

  const displayeStudent = data.slice(pageVisited, pageVisited + studentPerPage);

  const pageCount = Math.ceil(data.length / studentPerPage);

  const pageChangehandler = ({ selected }) => {
    setPageNumber(selected);
  };

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
          item.name === name ||
          item.school === school ||
          item.division === division ||
          item.age === age ||
          item.class === student.class
      );

    setData(filteredData);
    setGoBack(true);
    setStudent({});
  };

  const downloadHandler = () => {
    const result = data.map(({ id, ...rest }) => ({ ...rest }));

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(result);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "StudentData.xlsx");
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
            values={["model school", "AL school", "child school"]}
          />
          <SelectOption
            name="class"
            placeholder="Class"
            values={[1, 2, 3, 4, 5, 6, 7]}
            onChange={inputHandler}
          />
          <SelectOption
            name="division"
            placeholder="Division"
            values={["A", "B", "C"]}
            onChange={inputHandler}
          />
          <button>Search</button>
        </form>
      </div>
      <div className={classes.studentTable}>
        <StudentTable
          goBack={goBack}
          setGoBack={setGoBack}
          data={displayeStudent}
          toggle={toggle}
          setData={setData}
          setEditId={setEditId}
        />
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={pageChangehandler}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      <button
        className={classes.downloadBtn}
        onClick={downloadHandler}
        style={{ cursor: "pointer" }}
      >
        Download Excel <HiDownload />
      </button>
    </>
  );
};

export default StudentDetail;
