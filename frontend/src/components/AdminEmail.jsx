import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../assets/css/AdminEmail.css";

export default function AdminEmail() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  const handleSendEmail = async () => {
    try {
      const req = await fetch(
        "http://localhost:3000/api/admin/send-bulk-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: subject,
            htmlContent: content, 
          }),
        }
      );

      const body = await req.json();
      if (body.status === "success") {
        setNotification("Emails sent successfully!");
      } else {
        setError(body.message);
      }
    } catch (err) {
      setError("An error occurred while sending emails.");
      console.error(err);
    }
  };

  return (
    <div className="admin-email-container">
      <h2>Send Bulk Email to All Users</h2>
      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Email Content:</label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </div>
      <button onClick={handleSendEmail} className="btn">
        Send Email
      </button>
      {notification && <p className="notification">{notification}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
