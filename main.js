const promptInput = document.getElementById("promptInput");
const resultDiv = document.getElementById("result");
const generateButton = document.getElementById("generateButton");

generateButton.addEventListener("click", async () => {
  const prompt = `Act as a counsellor and answer the query "${promptInput.value}"`;

  if (prompt) {
    try {
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      resultDiv.innerText = data.response; // Display result in the div
    } catch (error) {
      console.error("Error generating content:", error);
      resultDiv.innerText = "An error occurred. Please try again."; // Display error message
    }
  } else {
    resultDiv.innerText = "Please enter a prompt."; // Alert if no prompt is entered
  }
});
