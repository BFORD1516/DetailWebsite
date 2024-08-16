document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("adminLoginForm");
  const createAdminForm = document.getElementById("createAdminForm");
  const errorMessage = document.getElementById("errorMessage");
  const creationMessage = document.getElementById("creationMessage");
  const resetMessage = document.getElementById("resetMessage");
  const resetPasswordButton = document.getElementById("resetPasswordButton");
  const createAdminSection = createAdminForm
    ? createAdminForm.parentElement
    : null;

  // Set default admin credentials if they do not exist
  if (!localStorage.getItem("adminUsername")) {
    localStorage.setItem("adminUsername", "carnut");
  }
  if (!localStorage.getItem("adminPassword")) {
    localStorage.setItem("adminPassword", "brandon");
  }

  // Function to update stored credentials
  function updateStoredCredentials() {
    storedUsername = localStorage.getItem("adminUsername");
    storedPassword = localStorage.getItem("adminPassword");
  }

  // Check if admin credentials exist in localStorage
  let storedUsername = localStorage.getItem("adminUsername");
  let storedPassword = localStorage.getItem("adminPassword");

  if (storedUsername && storedPassword && createAdminSection) {
    // Hide the create admin section if credentials already exist
    createAdminSection.style.display = "none";
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Reload stored credentials before checking
      updateStoredCredentials();

      // Check if credentials match
      if (username === storedUsername && password === storedPassword) {
        // Redirect to the calendar page immediately after successful login
        window.location.href = "calendar.html";
      } else {
        errorMessage.textContent = "Invalid username or password";
      }
    });
  }

  // Handle create admin account form submission
  if (createAdminForm) {
    createAdminForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const newUsername = document.getElementById("newUsername").value;
      const newPassword = document.getElementById("newPassword").value;

      // Store the new credentials in localStorage
      localStorage.setItem("adminUsername", newUsername);
      localStorage.setItem("adminPassword", newPassword);

      // Update the stored credentials
      updateStoredCredentials();

      creationMessage.textContent = "Admin account created successfully!";

      // Hide the create admin section after account creation
      if (createAdminSection) {
        createAdminSection.style.display = "none";
      }
    });
  }

  // Handle reset password
  if (resetPasswordButton) {
    resetPasswordButton.addEventListener("click", function () {
      const newPassword = prompt("Enter your new password:");
      if (newPassword) {
        localStorage.setItem("adminPassword", newPassword);

        // Update the stored password variable
        updateStoredCredentials();

        resetMessage.textContent = "Password has been reset successfully!";
        resetMessage.style.color = "green";
      } else {
        resetMessage.textContent = "Password reset was canceled.";
        resetMessage.style.color = "red";
      }
    });
  }
});
