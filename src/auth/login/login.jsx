import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

/// form validation schema for all the fields

const schema = yup.object().shape({
  email: yup.string().email("Must be a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
    /// to navigate user to another page
  const navigate = useNavigate();

    /// react hook form hook for handling form data
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /// form submit function to send data to supabase

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        // login successfull message
        toast.success("Login successful!");
        //navigating user to another page after successfully login
        navigate("/auth/profile"); 
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
      console.error(err);
    }
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center p-3 bg-light">
      <Card style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h2 className="mb-4 text-center">Login</h2>

          {/* form data for login  */}

          
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                isInvalid={!!errors.email}
                {...register("email")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                isInvalid={!!errors.password}
                {...register("password")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
