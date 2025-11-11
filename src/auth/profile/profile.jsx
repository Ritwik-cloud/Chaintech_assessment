import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";
import Loader from "../../component/loader";

const ProfilePage = () => {
  /// storing user data in state
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comLoading, setComLoading] = useState(false);

  const navigate = useNavigate();

  //// onpage mount fetching the user data from supabase
  useEffect(() => {
    const fetchUser = async () => {
      setComLoading(true);
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error || !user) {
          navigate("/auth/login");
          return;
        }

        //   setting the data from supabase to all the states
        setUser(user);
        setFullName(user.user_metadata?.full_name || "");
        setEmail(user.email);
        setPhone(user.user_metadata?.number || "");
      } catch (error) {
        console.log(error);
      } finally {
        setComLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  //// logout function
  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      toast.success("logOut successfully!");
      navigate("/auth/login");
    }
  };

  /// edit function
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError("");
    setSuccess("");
  };

  //// update function
  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    /// calling supabase to update name and number
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, number: phone },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    }
    setLoading(false);
  };

  // if user is not found return null
  if (!user) return null;

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 p-3 bg-light">
      {comLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Card style={{ maxWidth: "400px", width: "100%" }}>
            <Card.Body>
              <h2 className="mb-4 text-center">Profile</h2>

              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>

                {isEditing ? (
                  <Button
                    variant="success"
                    className="w-100 mb-3"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="w-100 mb-3"
                    onClick={handleEditToggle}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  variant="danger"
                  className="w-100"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? "Logging Out..." : "Logout"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
