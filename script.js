// Get all OTP input fields
const inputs = document.querySelectorAll(".code");

// Add event listeners to each input field
inputs.forEach((input, index) => {
  // Handle input event
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    // Move focus to next input if a valid digit is entered
    if (value && index < inputs.length - 1) {
      setTimeout(() => {
        inputs[index + 1].focus(); // Add slight delay to ensure DOM update
      }, 50); // Increased delay for smoother DOM updates
    }
  });

  // Handle backspace for moving focus to previous input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      setTimeout(() => {
        inputs[index - 1].focus(); // Move focus back on backspace
      }, 50);
    }
  });

  // Handle pasting OTP into the inputs
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().slice(0, inputs.length);

    // Fill fields automatically when pasting
    pasteData.split("").forEach((char, i) => {
      if (!isNaN(char) && i < inputs.length) {
        inputs[i].value = char;
      }
    });

    // Move focus to the next empty field after pasting
    const nextEmptyIndex = pasteData.length < inputs.length ? pasteData.length : inputs.length - 1;
    setTimeout(() => {
      inputs[nextEmptyIndex].focus(); // Delay focus for Cypress compatibility
    }, 50);
  });

  // Handle focus when navigating through fields
  input.addEventListener("focus", (e) => {
    // Ensure the value remains a single character
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }
  });
});
