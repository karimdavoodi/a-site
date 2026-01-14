"use client";

import React, { useState } from "react";

export const ContactUs = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function sendMail(): React.MouseEventHandler<HTMLButtonElement> {
    return async (e) => {
      e.preventDefault();
      const safeName = name.replace(/[\n\r]/g, " ").substring(0, 100);
      const safeEmail = email.replace(/[\n\r]/g, " ").substring(0, 100);
      const safeSubject = subject.replace(/[\n\r]/g, " ").substring(0, 100);
      const safeMessage = message.substring(0, 2048);
      await fetch("/api/send_mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: safeName,
          email: safeEmail,
          subject: safeSubject,
          message: safeMessage,
        }),
      });
      alert("Thank you for contacting us! Your message has been received.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setShowForm(false);
    };
  }

  const disabledSend = !(name && subject && message && email);

  return (
    <div style={styles.container}>
      <div style={styles.topLabel} onClick={() => setShowForm(true)}>
        Contact Us
      </div>
      {showForm && (
        <div style={styles.form}>
          <label style={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              required
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              required
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label style={styles.label}>
            Subject:
            <input
              type="text"
              name="subject"
              required
              style={styles.input}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <label style={styles.label}>
            Message:
            <textarea
              name="message"
              required
              style={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
          <button
            type="submit"
            style={{
              ...styles.submitButton,
              backgroundColor: disabledSend ? "#ccc" : "var(--gold)",
              color: disabledSend ? "#666" : "var(--backgroud-color)",
              cursor: disabledSend ? "not-allowed" : "pointer",
            }}
            onClick={sendMail()}
            disabled={disabledSend}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "140%",
    marginBottom: "1rem",
  },
  topLabel: {
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  label: {
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.25rem",
    borderRadius: "5px",
    border: "1px solid var(--input-border-color)",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "0.5rem",
    marginTop: "0.25rem",
    borderRadius: "5px",
    border: "1px solid var(--input-border-color)",
  },
  submitButton: {
    padding: "3px 15px",
    backgroundColor: "var(--gold)",
    color: "var(--backgroud-color)",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    alignSelf: "end",
  },
};
