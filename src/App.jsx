import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

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
          <div className="col-md-6">
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : users.length > 0 ? (
              <div className="list-group">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="list-group-item "
                    onClick={() => handleUser(user)}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        style={{
                          width: "240px",
                          height: "130px",
                          borderRadius: "50%",
                        }}
                        src={user.avatar}
                        alt="No data to show"
                      />
                    </div>
                    <p>{user.profile.username}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="col-md-6">
            {selectedUsers && (
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {selectedUsers.profile.firstName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {selectedUsers.profile.lastName}
                  </ListGroup.Item>
                  <ListGroup.Item>{selectedUsers.profile.email}</ListGroup.Item>
                  {/* <ListGroup.Item>{selectedUsers.Bio}</ListGroup.Item> */}
                  <ListGroup.Item>{selectedUsers.jobTitle}</ListGroup.Item>
                </ListGroup>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
