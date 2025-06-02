// Fake AI API with keyword-based responses
const fakeApiCall = (userMessage) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const msg = userMessage.toLowerCase();

      if (msg.includes("hello") || msg.includes("hi")) {
        resolve("Hello! How can I help you today?");
      } else if (msg.includes("how are you")) {
        resolve("I'm doing great, thanks! What about you?");
      } else if (msg.includes("your name")) {
        resolve("I'm Yuvraj's AI assistant.");
      } else if (msg.includes("bye") || msg.includes("goodbye")) {
        resolve("Goodbye! Have a wonderful day!");
      } else if (msg.match(/what is (\d+) \+ (\d+)/)) {
        const numbers = msg.match(/what is (\d+) \+ (\d+)/);
        const sum = Number(numbers[1]) + Number(numbers[2]);
        resolve(`The sum of ${numbers[1]} and ${numbers[2]} is ${sum}.`);
      } else {
        resolve("Sorry, I don't understand that. Can you try asking differently?");
      }
    }, 1000); // simulate network delay
  });
};

// DOM Elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const fileUpload = document.getElementById("file-upload");
const fileContent = document.getElementById("file-content");

// Add message to chat box
function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);

  const textSpan = document.createElement("span");
  textSpan.classList.add("text");
  textSpan.textContent = text;

  msgDiv.appendChild(textSpan);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // auto scroll
}

// Handle sending user message
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  const response = await fakeApiCall(message);
  addMessage(response, "bot");
}

// Handle file upload and show content
fileUpload.addEventListener("change", () => {
  const file = fileUpload.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("⚠️ File too large! Upload under 2MB please.");
    return;
  }

  if (!file.type.startsWith("text/")) {
    alert("⚠️ Please upload a text (.txt) file only.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    fileContent.value = reader.result;
  };
  reader.readAsText(file);
});

// Send button click event
sendBtn.addEventListener("click", sendMessage);

// Enter key triggers send message
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
