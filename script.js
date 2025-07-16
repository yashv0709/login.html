const form = document.getElementById("registrationForm");
const shareBtn = document.getElementById("shareBtn");
const counter = document.getElementById("counter");
const message = document.getElementById("message");

let shareCount = 0;

shareBtn.addEventListener("click", () => {
  if (shareCount < 5) {
    const whatsappMsg = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const url = `https://wa.me/?text=${whatsappMsg}`;
    window.open(url, "_blank");

    shareCount++;
    counter.innerText = `Click count: ${shareCount}/5`;

    if (shareCount === 5) {
      counter.innerText = "Sharing complete. Please continue.";
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    message.innerText = "Please complete WhatsApp sharing before submitting.";
    message.style.color = "red";
    return;
  }

  const formData = new FormData(form);
  const file = document.getElementById("screenshot").files[0];
  if (file) {
    formData.append("file", file.name);
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzhH81szXGs8lMMsx8lKxgwCxgvoD7WjP56OsviZ9uspyAaXo8sA1NtWmQUzmEv5cHYag/exec", {
      method: "POST",
      body: formData,
    });

    const result = await response.text();
    if (result.includes("Success")) {
      message.innerText = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls";
      message.style.color = "green";
      form.reset();
      form.querySelectorAll("input, button, select").forEach(el => el.disabled = true);
      localStorage.setItem("submitted", "true");
    } else {
      message.innerText = "Submission failed. Try again.";
      message.style.color = "red";
    }
  } catch (error) {
    message.innerText = "Error submitting form.";
    message.style.color = "red";
    console.error(error);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("submitted") === "true") {
    form.querySelectorAll("input, button, select").forEach(el => el.disabled = true);
    message.innerText = "🎉 Your submission has already been recorded.";
  }
});
