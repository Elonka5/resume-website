// import { loadTranslations } from "./lang.js";

// document.getElementById('contact-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const data = {
//       name: form.name.value,
//       email: form.email.value,
//       message: form.message.value
//     };
  
//     const lang = localStorage.getItem('lang') || 'uk';
//     const translations = await loadTranslations(lang);
  
//     try {
//       const res = await fetch('https://script.google.com/macros/s/AKfycbyMe6QHF7dPJsveIka4uo4KFPF4inZPpMwmxvJp68Xz7o5DC_yNLM_9_eGbCK1gcP_M/exec', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: { 'Content-Type': 'application/json' }
//       });
  
//       if (res.ok) alert(translations.contact.success);
//       else alert(translations.contact.error);
//     } catch (err) {
//       alert(translations.contact.network);
//     }
  
//     form.reset();
//   });

export function initForm(translations) {
    const form = document.getElementById("contact-form");
    const clearButton = document.getElementById("clear-form");
  
    if (!form) {
      console.error("Form or clear button not found");
      return;
    }
  

    form.addEventListener("submit", (e) => handleSubmit(e, translations));
    clearButton.addEventListener("click", () => clearForm(translations));
  }
  
  function validateForm(data, translations) {
    const errors = {};

    if (!data.name) {
      errors.name = translations.form.errors.name.required;
    } else if (data.name.length < 2) {
      errors.name = translations.form.errors.name.minLength;
    }
  

    if (!data.email) {
      errors.email = translations.form.errors.email.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = translations.form.errors.email.invalid;
    }
  

    if (!data.message) {
      errors.message = translations.form.errors.message.required;
    } else if (data.message.length < 10) {
      errors.message = translations.form.errors.message.minLength;
    }
  
    return errors;
  }
  

  async function handleSubmit(event, translations) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
  

    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
    document.getElementById("success-message").textContent = "";
  

    const errors = validateForm(data, translations);
  
    if (Object.keys(errors).length > 0) {
      if (errors.name) document.getElementById("name-error").textContent = errors.name;
      if (errors.email) document.getElementById("email-error").textContent = errors.email;
      if (errors.message) document.getElementById("message-error").textContent = errors.message;
    } else {

      try {
        const response = await fetch("https://formspree.io/f/mdkgenrv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
  
        document.getElementById("success-message").textContent = translations.form.success;
        form.reset(); 
      } catch (error) {
        console.error("Submission error:", error);
        document.getElementById("success-message").textContent =
          translations.form.errors.submit || "Failed to submit form";
      }
    }
  }
  
  function clearForm(translations) {
    const form = document.getElementById("contact-form");
    form.reset();
    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
    document.getElementById("success-message").textContent = "";
  }