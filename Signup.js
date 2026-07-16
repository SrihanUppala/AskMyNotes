document.addEventListener("DOMContentLoaded", function () {

  const form        = document.getElementById("signup-form");
  const nameEl      = document.getElementById("name");
  const emailEl     = document.getElementById("email");
  const passwordEl  = document.getElementById("password");
  const nameErr     = document.getElementById("name-error");
  const emailErr    = document.getElementById("email-error");
  const passwordErr = document.getElementById("password-error");
  const statusEl    = document.getElementById("status");
  const signupBtn   = document.getElementById("signup-btn");
  const signinLink  = document.getElementById("signin-link");

  // Any non-empty values are accepted — this is a placeholder auth flow.
  // Swap the setTimeout below for a real fetch() to your signup endpoint.

  function clearErrors() {
    [nameErr, emailErr, passwordErr].forEach(function (el) { el.textContent = ""; });
    [nameEl, emailEl, passwordEl].forEach(function (el) { el.classList.remove("invalid"); });
    statusEl.textContent = "";
    statusEl.className = "";
  }

  function markInvalid(el, errEl, message) {
    el.classList.add("invalid");
    errEl.textContent = message;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const name     = nameEl.value.trim();
    const email    = emailEl.value.trim();
    const password = passwordEl.value;

    let hasError = false;

    if (!name) {
      markInvalid(nameEl, nameErr, "Enter any name to continue.");
      hasError = true;
    }
    if (!email) {
      markInvalid(emailEl, emailErr, "Enter any email to continue.");
      hasError = true;
    }
    if (!password || password.length < 6) {
      markInvalid(passwordEl, passwordErr, "Use at least 6 characters (anything works).");
      hasError = true;
    }

    if (hasError) {
      statusEl.textContent = "Please fill in the fields above.";
      statusEl.className = "error";
      return;
    }

    // Simulated account creation
    statusEl.textContent = "Creating your account...";
    statusEl.className = "thinking";
    signupBtn.disabled = true;

    setTimeout(function () {
      statusEl.textContent = "Account created. Redirecting...";
      statusEl.className = "success";

      setTimeout(function () {
        window.location.href = "index.html";
      }, 500);
    }, 1200);
  });

  // "Sign in" link — for now, any credentials go straight to the app.
  signinLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "index.html";
  });

});