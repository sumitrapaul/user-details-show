import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Card, Modal, Spinner } from "react-bootstrap";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : users.length > 0 ? (
              <div>
                {users.map((user) => (
                  <div
                    style={{ cursor: "pointer" }}
                    className="my-3"
                    key={user.id}
                    onClick={handleShow}
                  >
                    <Card
                      onClick={() => handleUser(user)}
                      style={{ width: "18rem", backgroundColor: "#f3e8ff" }}
                    >
                      <Card.Img
                        variant="top"
                        style={{ borderRadius: "50%" }}
                        className="w-100 h-100"
                        src={user.avatar}
                        alt="No data to show"
                      />
                      <Card.Body>
                        <Card.Title className="text-center">
                          {user.profile.username}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="col-md-6">
            {selectedUsers && (
              <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                  <Modal.Title>
                    {" "}
                    {selectedUsers.profile.firstName}{" "}
                    {selectedUsers.profile.lastName}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>{selectedUsers.profile.email}</p>
                  <p>{selectedUsers.Bio}</p>
                  <p>{selectedUsers.jobTitle}</p>
                </Modal.Body>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
