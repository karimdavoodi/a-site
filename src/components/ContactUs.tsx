"use client";

import React from "react";

export const ContactUs = () => {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div style={styles.container}>
      <div
        style={styles.topLabel}
        // TODO: we have to set Database to store users message before enabling this. Alos a simple admin page to see users message
        // onClick={() => setShowForm(true)}
      >
        Contact Us
      </div>
      {showForm && (
        <form
          style={styles.form}
          action="https://formspree.io/f/your-form-id"
          method="POST"
        >
          <label style={styles.label}>
            Name:
            <input type="text" name="name" required style={styles.input} />
          </label>
          <label style={styles.label}>
            Email:
            <input type="email" name="email" required style={styles.input} />
          </label>
          <label style={styles.label}>
            Message:
            <textarea
              name="message"
              required
              style={styles.textarea}
            ></textarea>
          </label>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "150%",
    marginBottom: "1rem",
  },
  topLabel: {
    cursor: "pointer",
    fontWeight: "bold",
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
