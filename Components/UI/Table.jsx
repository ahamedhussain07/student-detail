import StudentDataServices from "../../services/Student-Services";
import { useRouter } from "next/router";
const headers = [
  "ID'V",
  "Name",
  "Age",
  "School",
  "Class",
  "Division",
  "Status",
  "",
  "",
];
const StudentTable = ({
  data,
  toggle,
  setData,
  setEditId,
  goBack,
  setGoBack,
}) => {
  const router = useRouter();
  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((head, ind) => (
              <th key={ind}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr style={{ backgroundColor: "#ddd" }}>
              <td>no student found</td>
              <td>
                <a
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => router.reload()}
                >
                  Go Back
                </a>
              </td>
            </tr>
          ) : (
            data.map((data, ind) => (
              <tr key={ind + 1}>
                <td>{ind + 1} </td>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.school}</td>
                <td>{data.class}</td>
                <td>{data.division}</td>
                <td>{data.status}</td>
                <td>
                  <a
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      setEditId(data.id);
                      toggle(true);
                    }}
                  >
                    edit
                  </a>
                </td>
                <td>
                  <a
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      StudentDataServices.deleteStudent(data.id);
                      setData((prev) =>
                        prev.filter((item) => item.id !== data.id)
                      );
                    }}
                  >
                    delete
                  </a>
                </td>
              </tr>
            ))
          )}
          {goBack && (
            <td>
              <a
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  router.reload();
                  setGoBack(false);
                }}
              >
                Go Back
              </a>
            </td>
          )}
        </tbody>
      </table>
    </>
  );
};

export default StudentTable;
