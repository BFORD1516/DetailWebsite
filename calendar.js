document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar");
  const formContainer = document.getElementById("form-container");
  const dateInput = document.getElementById("date");
  const serviceForm = document.getElementById("serviceForm");
  const calendarTitle = document.getElementById("calendarTitle");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");
  const logoutButton = document.getElementById("logoutButton");

  let isAdmin =
    localStorage.getItem("adminUsername") &&
    localStorage.getItem("adminPassword");

  let currentYear = 2024;
  let currentMonth = 7; // August is month 7 (0-indexed)

  // Load appointments from localStorage or initialize an empty object
  const appointments = JSON.parse(localStorage.getItem("appointments")) || {};

  function saveAppointments() {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }

  function createCalendar(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    calendarContainer.innerHTML = "";
    calendarTitle.innerText = `${new Date(year, month).toLocaleString(
      "default",
      { month: "long" }
    )} ${year}`;

    // Add day headers
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daysOfWeek.forEach((day) => {
      const dayHeader = document.createElement("div");
      dayHeader.innerText = day;
      calendarContainer.appendChild(dayHeader);
    });

    // Add empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement("div");
      calendarContainer.appendChild(emptyCell);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("day");
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        i
      ).padStart(2, "0")}`;
      dayCell.innerText = i;

      if (appointments[dateStr]) {
        if (isAdmin) {
          dayCell.classList.add("appointment");
          dayCell.innerText = `${i}\n📅`; // Display icon or some indicator
          dayCell.addEventListener("click", function () {
            const appointment = appointments[dateStr];
            alert(
              `Appointment on ${dateStr}\nYear: ${appointment.year}\nMake: ${appointment.make}\nModel: ${appointment.model}\nService: ${appointment.service}`
            );
          });
        } else {
          dayCell.classList.add("grayed-out");
          // Non-admin users get a message to select a different date
          dayCell.addEventListener("click", function () {
            alert("Please select a different date.");
          });
        }
      } else {
        dayCell.addEventListener("click", function () {
          const selectedDate = new Date(year, month, i);
          dateInput.value = selectedDate.toISOString().split("T")[0];
          formContainer.style.display = "block";
          // Clear the form fields for a new appointment
          serviceForm.reset();
          dateInput.value = selectedDate.toISOString().split("T")[0];
        });
      }
      calendarContainer.appendChild(dayCell);
    }
  }

  prevMonthButton.addEventListener("click", function () {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    createCalendar(currentYear, currentMonth);
  });

  nextMonthButton.addEventListener("click", function () {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    createCalendar(currentYear, currentMonth);
  });

  // Refresh the calendar after login or on page load
  createCalendar(currentYear, currentMonth);

  serviceForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedDate = dateInput.value;
    const year = document.getElementById("year").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const service = document.getElementById("service").value;

    // Store the appointment
    appointments[selectedDate] = {
      year: year,
      make: make,
      model: model,
      service: service,
    };

    // Save appointments to localStorage
    saveAppointments();

    // Update calendar to show the appointment
    createCalendar(currentYear, currentMonth);

    alert(
      "Appointment booked successfully!\nWe have received your submission and will be in contact."
    );
    formContainer.style.display = "none";
    serviceForm.reset();
  });

  // Handle logout button click
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      // Clear admin credentials from localStorage
      localStorage.removeItem("adminUsername");
      localStorage.removeItem("adminPassword");

      // Update the isAdmin flag
      isAdmin = false;

      // Refresh the calendar to update the view
      createCalendar(currentYear, currentMonth);
    });
  }
});
