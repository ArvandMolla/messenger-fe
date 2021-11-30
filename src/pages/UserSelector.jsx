import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ApiUrl = process.env.REACT_APP_API_URL;

function UserSelector() {
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers) {
      setSelectedUser(allUsers[0].userName);
    }
  }, [allUsers]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/user/all/all-users`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAllUsers(data);
      } else {
        console.log("failed");
        throw new Error("fetching all users failed!");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="getid-container">
      <Form.Group>
        <Form.Label>Select User</Form.Label>
        <Form.Control
          as="select"
          className="user-selector"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {allUsers &&
            allUsers.map((elem) => {
              return (
                <option className="select-option" key={elem._id}>
                  {elem.userName}
                </option>
              );
            })}
        </Form.Control>

        <Button variant="primary" className="user-select-button">
          Submit
        </Button>
      </Form.Group>
    </div>
  );
}

export default UserSelector;
