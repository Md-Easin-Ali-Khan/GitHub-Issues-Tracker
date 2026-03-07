const loginPage = document.getElementById("login-page");
const loginBtn = document.getElementById("login-btn");
const mainPage = document.getElementById("main-page")

loginBtn.addEventListener("click", () => {
    const userName = document.getElementById("user-name");
    const password = document.getElementById("password");

    if (userName.value === "admin" && password.value === "admin123") {
        loginPage.classList.add("hidden")
        mainPage.classList.remove("hidden")

    } else {
        alert("Invalid user")
    }

})