
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

/// form validation schema for all the fields
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Must be a valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  number: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Phone number is required"),
});

const RegisterPage = () => {

    /// react hook form hook for handling form data
    
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /// form submit function to send data to supabase
  const onSubmit = async (data) => {
    try {
      const { name, email, password, number } = data;
      const { data: result, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, number },
        },
      });

    //   handling error
      if (error) {
        console.error("Sign up error:", error);
        toast.error(error.message);
      } else {
        toast.success("Signup successful! Please check your email to confirm.");
        reset();
       
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 p-3 bg-light">
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Register</Card.Title>
          {/* /// register form  */}
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                isInvalid={!!errors.name}
                {...register("name")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

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
                placeholder="Enter password"
                isInvalid={!!errors.password}
                {...register("password")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="number" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter 10-digit phone number"
                isInvalid={!!errors.number}
                {...register("number")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.number?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
