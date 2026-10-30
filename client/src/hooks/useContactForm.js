import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export function useContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // 1. Send email directly from the browser via Web3Forms (bypasses all cloud firewall / bot blocks)
      const web3FormsKey =
        import.meta.env.VITE_WEB3FORMS_KEY || "4bff130f-87fa-4223-8447-450e63db1bd6";

      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: form.name,
          email: form.email,
          subject: `[Portfolio Inquiry] ${form.subject} - from ${form.name}`,
          message: form.message,
          from_name: "Portfolio Contact"
        })
      });

      const emailResult = await emailResponse.json();

      if (!emailResponse.ok || !emailResult.success) {
        throw new Error(emailResult.message || "Failed to dispatch email.");
      }

      // 2. Also persist message to MongoDB Atlas via your backend (non-blocking)
      try {
        const apiEndpoint = import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/contact`
          : "http://localhost:5000/api/contact";

        fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }).catch((err) => console.warn("Backend save skipped:", err.message));
      } catch (dbErr) {
        console.warn("Backend request error:", dbErr.message);
      }

      setStatus({
        type: "success",
        message: "Thanks for reaching out! Your message has been sent successfully."
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Message saved locally. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, status, isSubmitting, updateField, submitForm };
}
