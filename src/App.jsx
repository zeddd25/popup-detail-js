import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function App() {
  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [modaldata, setModaldata] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  //get data for all user
  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((resposne) => resposne.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
  }, []);

  //get data user by id
  const showDetail = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((resposne) => resposne.json())
      .then((res) => {
        setModaldata(res);
        Swal.fire({
          width: 420,
          title: res.name,
          html: `
            <div class="poupop">
            <h4>Row No : ${res.id}</h4>
            <p><hr>ID: ${res.id}</p>
            <p><hr>Name: ${res.name}</p>
            <p><hr>Username: ${res.username}</p>
            <p><hr>Email: ${res.email}</p>
            <p><hr>Phone: ${res.phone}</p>
            <p><hr>Website: ${res.website}</p>
            <hr />
            </div>
          `,
          onClose: () => setShow(true)
        });
      });
  };

  return (
    <div className="flex justify-center text-center items-center mt-16">
      {/* displays all employee data */}
      <div className="w-2/3">
        <h2 className="text-3xl font-bold mb-8">
          Check More Records of Employees
        </h2>
        <table className="w-full table-fixed text-center">
          <thead className="bg-[#7066E0]">
            <tr>
              <th className="w-1/6 py-2">No</th>
              <th className="w-2/6 py-2">Name</th>
              <th className="w-2/6 py-2">Username</th>
              <th className="w-1/6 py-2">Show Details</th>
            </tr>
          </thead>
          <tbody>
            {record.map((names, index) => (
              <tr key={index}>
                <td className="border py-2">{names.id}</td>
                <td className="border py-2">{names.name}</td>
                <td className="border py-2">{names.username}</td>
                <td className="border py-2">
                  <button
                    onClick={() => {
                      showDetail(names.id)}}
                    className="w-[200px] bg-[#7066E0] hover:bg-[#887ff0] text-gray-800 font-semibold py-2 px-4 border-none rounded shadow"
                  >
                    Get Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default App;
