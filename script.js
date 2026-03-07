const loginPage = document.getElementById("login-page");
const loginBtn = document.getElementById("login-btn");
const mainPage = document.getElementById("main-page");
const issueContainer = document.getElementById("issue-container");


// login to issues page
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

// fetching all issues
async function fetchIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues)
};


function displayIssues(issues) {

    issues.forEach(issue => {
        const borderColor = issue.status === 'open' ? 'border-sky-800' : 'border-fuchsia-900';

        const card = document.createElement("div");
        card.classList = `card bg-base-100 p-4 shadow-2xl space-y-3 border-t-2 ${borderColor}`;
        card.innerHTML = `
                    <div class="flex justify-between">
                        <img src="assets/Open-Status.png" alt="">
                        <div class="badge badge-soft badge-error">${issue.priority.toUpperCase()}</div>
                    </div>
                    <div>
                        <h2 class="text-sm font-semibold text-slate-800">${issue.title}</h2>
                        <p class="text-[12px] text-gray-500 line-clamp-2">${issue.description}</p>
                    </div>

                    <div class="flex gap-1">
                        <div class="text-[12px] font-medium truncate bg-pink-100 badge badge-outline badge-error"><i
                                class="fa-solid fa-bug"></i>${issue.labels[0]}</div>
                        <div class="text-[12px] font-medium truncate bg-amber-100 badge badge-outline badge-warning"><i
                                class="fa-regular fa-life-ring"></i>${issue.labels[1]}</div>
                    </div>

                    <div class="text-[12px] text-gray-500 mt-5">
                        <p>${issue.createdAt}</p>
                        <p>${issue.updatedAt}</p>
                    </div>
        `
        issueContainer.appendChild(card)
    });
}

fetchIssues()