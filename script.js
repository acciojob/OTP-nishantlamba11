//your JS code here. If required.
// Get all OTP input fields
const inputs = document.querySelectorAll(".code");

// Add event listeners to each input field
inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    // Move to next field if a digit is entered
    if (value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    // Handle backspace key
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputs[index - 1].focus();
    }
  });

  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().slice(0, inputs.length);

    // Fill fields automatically when pasting
    pasteData.split("").forEach((char, i) => {
      if (!isNaN(char)) {
        inputs[i].value = char;
      }
    });

    // Move focus to next empty field after paste
    const nextEmptyIndex = pasteData.length < inputs.length ? pasteData.length : inputs.length - 1;
    inputs[nextEmptyIndex].focus();
  });
});
