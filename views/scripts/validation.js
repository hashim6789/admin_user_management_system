document.addEventListener("DOMContentLoaded", function () {
  // Edit User Form Validation
  const editForm = document.getElementById("editUserForm");
  const editUsernameInput = document.getElementById("editUsername");
  const editEmailInput = document.getElementById("editEmail");

  function validateEditEmail() {
    const email = editEmailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailPattern.test(email)) {
      editEmailInput.classList.remove("is-invalid");
      editEmailInput.classList.add("is-valid");
    } else {
      editEmailInput.classList.remove("is-valid");
      editEmailInput.classList.add("is-invalid");
    }
  }

  function validateEditUsername() {
    const username = editUsernameInput.value.trim();
    const usernamePattern = /^[a-zA-Z][a-zA-Z.]{4,}$/;

    if (usernamePattern.test(username)) {
      editUsernameInput.classList.remove("is-invalid");
      editUsernameInput.classList.add("is-valid");
    } else {
      editUsernameInput.classList.remove("is-valid");
      editUsernameInput.classList.add("is-invalid");
    }
  }

  editUsernameInput.addEventListener("input", validateEditUsername);
  editEmailInput.addEventListener("input", validateEditEmail);

  editForm.addEventListener("submit", function (event) {
    validateEditUsername();
    validateEditEmail();

    if (
      !editUsernameInput.classList.contains("is-valid") ||
      !editEmailInput.classList.contains("is-valid")
    ) {
      event.preventDefault();
      event.stopPropagation();
    }

    editForm.classList.add("was-validated");
  });

  // Create User Form Validation
  const createForm = document.getElementById("createUserForm");
  const createUsernameInput = document.getElementById("newUsername");
  const createEmailInput = document.getElementById("newEmail");
  const createPasswordInput = document.getElementById("newPassword");

  function validateCreateEmail() {
    const email = createEmailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailPattern.test(email)) {
      createEmailInput.classList.remove("is-invalid");
      createEmailInput.classList.add("is-valid");
    } else {
      createEmailInput.classList.remove("is-valid");
      createEmailInput.classList.add("is-invalid");
    }
  }

  function validateCreateUsername() {
    const username = createUsernameInput.value.trim();
    const usernamePattern = /^[a-zA-Z][a-zA-Z.]{4,}$/;

    if (usernamePattern.test(username)) {
      createUsernameInput.classList.remove("is-invalid");
      createUsernameInput.classList.add("is-valid");
    } else {
      createUsernameInput.classList.remove("is-valid");
      createUsernameInput.classList.add("is-invalid");
    }
  }

  function validateCreatePassword() {
    const password = createPasswordInput.value;
    if (password.length >= 6) {
      createPasswordInput.classList.remove("is-invalid");
      createPasswordInput.classList.add("is-valid");
    } else {
      createPasswordInput.classList.remove("is-valid");
      createPasswordInput.classList.add("is-invalid");
    }
  }

  createUsernameInput.addEventListener("input", validateCreateUsername);
  createEmailInput.addEventListener("input", validateCreateEmail);
  createPasswordInput.addEventListener("input", validateCreatePassword);

  createForm.addEventListener("submit", function (event) {
    validateCreateUsername();
    validateCreateEmail();
    validateCreatePassword();

    if (
      !createUsernameInput.classList.contains("is-valid") ||
      !createEmailInput.classList.contains("is-valid") ||
      !createPasswordInput.classList.contains("is-valid")
    ) {
      event.preventDefault();
      event.stopPropagation();
    }

    createForm.classList.add("was-validated");
  });
});
