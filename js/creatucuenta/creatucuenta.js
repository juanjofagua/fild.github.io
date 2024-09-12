const $submit = document.getElementById("submit"),
    $password = document.getElementById("password"),
    $username = document.getElementById("username"),
    $fullname = document.getElementById("fullname"),
    $confirm_password = document.getElementById("confirm_password"),
    $email = document.getElementById("email");

document.addEventListener("click", (e) => {
    if (e.target === $submit) {
        if ($password.value !== "" && $username.value !== "" && $fullname.value !== "" && $confirm_password.value !== "" && $email.value !== "") {
            e.preventDefault();
            window.location.href = "../index.html";
        }
    }
})