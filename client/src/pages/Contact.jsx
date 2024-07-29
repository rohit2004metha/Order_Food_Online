import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com"; // Import EmailJS library

// Styled-components for the form layout
const ContactContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.div`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 20px;
  color: ${(props) => (props.error ? "red" : "green")};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // EmailJS parameters
    const serviceId = 'service_hijquhc';
    const templateId = 'template_sagvbk8';
    const userId = 'l84BpoYHPPxNr0WoR';

    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setLoading(false);
        setResponseMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setLoading(false);
        setResponseMessage("An error occurred. Please try again.");
      });
  };

  return (
    <ContactContainer>
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextArea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </SubmitButton>
        {responseMessage && <Message error={loading}>{responseMessage}</Message>}
      </Form>
    </ContactContainer>
  );
};

export default Contact;
