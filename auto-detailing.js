document.addEventListener("DOMContentLoaded", () => {
  const callButton = document.getElementById("callToday");

  callButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default action of the link
    alert(
      "Thank you for your interest! Please call TRENT at +1-253-394-4745 to speak with a specialist. If you reach our voicemail, we will respond within 24 hours."
    );
  });
});
