import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState(null);

  useEffect(() => {
    const usersData = () => {
      axios
        .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        });
    };

    usersData();
  }, []);

  const handleUser = (user) => {
    setSelectedUsers(user);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-3 text-center">User Details</h5>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : users.length > 0 ? (
              <div>
                {users.map((user) => (
                  <div
                    style={{ cursor: "pointer" }}
                    className="my-3 d-flex justify-content-between"
                    key={user.id}
                  >
                    <Card 
                      onClick={() => handleUser(user)}
                      style={{ width: "100%", maxWidth: "18rem", backgroundColor: "#f5f3ff" }}
                    >
                      <Card.Img
                        variant="top"
                        style={{ borderRadius: "50%", padding: "60px" }}
                        className="w-100 h-auto"
                        src={user.avatar}
                        alt="No data to show"
                      />
                      <Card.Body>
                        <Card.Title className="text-center">
                          {user.profile.username}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                    {selectedUsers && selectedUsers.profile.username === user.profile.username && (
                      <Card 
                        style={{ width: "100%", maxWidth: "18rem", backgroundColor: "#f5f3ff" }}
                      >
                        <Card.Body className="text-center">
                          <Card.Title>
                          Name: {user.profile.firstName} {user.profile.lastName}
                          </Card.Title>
                          <p><span className="fw-semibold">Email: </span>{selectedUsers.profile.email}</p>
                          <p><span className="fw-semibold">Bio: </span>{selectedUsers.Bio}</p>
                          <p><span className="fw-semibold">Title: </span>{selectedUsers.jobTitle}</p>
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

         
        </div>
      </div>
    </>
  );
}

export default App;
