import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <>
      <div className="container">
        <div className="user-list">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : users.length > 0 ? (
            <div className="user-items">
              {users.map((user) => (
                <div key={user.id} className="user-item">
                  <Card className="my-3" style={{ width: "18rem" }}>
                    <ListGroup variant="flush">
                      <img src={user.avatar} alt="No data to show" />
                      <ListGroup.Item>{user.profile.username}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p>No data to show</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
