import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ApiUrl = process.env.REACT_APP_API_URL;

function UserSelector({ setSenderId }) {
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

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

  const setUserId = () => {
    allUsers.forEach((elem) => {
      if (elem.userName == selectedUser) {
        setSenderId(elem._id);
      }
    });
  };
  return (
    <>
      {isSelected ? (
        <div className="getid-container">
          <Form.Group>
            <Form.Label>
              Now open a new tab and choose a different user to chat with this
              user
            </Form.Label>

            <Button
              variant="primary"
              className="user-select-button"
              onClick={() => setUserId()}
            >
              I got it
            </Button>
          </Form.Group>
        </div>
      ) : (
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

            <Button
              variant="primary"
              className="user-select-button"
              onClick={() => setIsSelected(true)}
            >
              Submit
            </Button>
          </Form.Group>
        </div>
      )}
    </>
  );
}

export default UserSelector;
