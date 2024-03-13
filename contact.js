document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Prepare the form data
    const formData = new FormData(form);
    const action = form.getAttribute("action"); // URL from the 'action' attribute of the form

    try {
      // Send the form data to Formspree or your endpoint
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Formspree should redirect to the thank you page or handle accordingly
        console.log("Form submitted successfully");

        // Clear the form fields only if submission is successful
        form.reset();

        // Optionally, redirect to a thank-you page or display a success message
        // window.location.href = 'https://formspree.io/thanks?language=en';
        alert("Thank you for your submission.");
      } else {
        // Handle server errors or invalid responses
        alert("There was a problem with your submission. Please try again.");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error during form submission:", error);
      alert(
        "Submission failed. Please check your internet connection and try again."
      );
    }
  });
});
