let allIssues = []

const loginPage = document.getElementById("login-page");
const loginBtn = document.getElementById("login-btn");
const mainPage = document.getElementById("main-page");
const issueContainer = document.getElementById("issue-container");
const issueCount = document.getElementById("issue-count");
const toggleBtn = document.querySelectorAll(".toggle-btn");
const searchInput = document.getElementById("search-input");
const modalContent = document.getElementById("modal-content");
const showHideModal = document.getElementById("show-hide-modal")
const loadingSpinner = document.getElementById("loading-spinner")

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

// showing loading spinner
function showLoadingSpinner() {
    loadingSpinner.classList.remove("hidden")
}
// removing the loadingSpinner
function removeLoadingSpinner() {
    loadingSpinner.classList.add("hidden")
}

// fetching all issues
async function fetchIssues() {
    showLoadingSpinner()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    removeLoadingSpinner()
    allIssues = data.data;
    displayIssues(allIssues)
};

fetchIssues()

// Convert static card data to dynamic data
function displayIssues(issues) {

    issueContainer.innerHTML = ""

    issues.forEach(issue => {
        const borderColor = issue.status === 'open' ? 'border-sky-800' : 'border-fuchsia-900';

        const iconClass = issue.labels[0] === "bug"
            ? "fa-solid fa-bug"
            : "fa-regular fa-star";

        const card = document.createElement("div");
        card.classList = `card bg-base-100 p-4 shadow-2xl space-y-3 border-t-3 ${borderColor}`;
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
                        <div class="text-[12px] font-medium truncate bg-pink-100 badge badge-outline badge-error"><i class="${iconClass}"></i> ${issue.labels[0]}</div>
                        <div class="text-[12px] font-medium truncate bg-amber-100 badge badge-outline badge-warning"><i
                                class="fa-regular fa-life-ring"></i>${issue.labels[1]}</div>
                    </div>

                    <div class="text-[12px] text-gray-500 mt-5">
                        <p>${issue.createdAt}</p>
                        <p>${issue.updatedAt}</p>
                    </div>
        `;
        card.addEventListener("click", () => {
            showModal(issue.id)
        })

        issueContainer.appendChild(card)
    });
};

// geting the card from the api when clicked
function filterIssues(status, event) {
    toggleBtn.forEach((btn) => {
        btn.classList.remove("btn-primary");
    })
    event.target.classList.add("btn-primary")
    if (status === 'all') {
        displayIssues(allIssues);
        issueCount.innerText = `${allIssues.length} Issues`
    } else {
        const filterd = allIssues.filter(issue => issue.status === status);
        displayIssues(filterd);
        issueCount.innerText = `${filterd.length} Issues`
    }
};

// searching the issues
searchInput.addEventListener("input", async (value) => {
    const text = value.target.value;
    if (text.length > 0) {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
        const data = await res.json();
        displayIssues(data.data);
    } else if (text === '') {
        displayIssues(allIssues);
    }
});

// showing the modal
async function showModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const modal = await res.json();
    const issue = modal.data;
    const Assignee = issue.assignee === "" ? "MD. EASIN" : `${issue.assignee}`

    const iconClass = issue.labels[0] === "bug"
        ? "fa-solid fa-bug"
        : "fa-regular fa-star";

    modalContent.innerHTML = `
                    <h2 class="text-slate-800 text-2xl font-bold mb-2">${issue.title}</h2>

                    <div class="text-[12px] text-gray-600 flex items-center gap-2">
                        <button class="badge text-white bg-green-400">Primary</button>
                        <p>&#183; Opened by Fahim Ahmed</p>
                        <p>&#183; 22/02/2026</p>
                    </div>

                    <div class="flex gap-1">
                        <div class="text-[12px] font-medium truncate bg-pink-100 badge badge-outline badge-error"><i
                                class="${iconClass}"></i>${issue.labels[0]}</div>
                        <div class="text-[12px] font-medium truncate bg-amber-100 badge badge-outline badge-warning"><i
                                class="fa-regular fa-life-ring"></i>${issue.labels[1]}</div>
                    </div>

                    <p class="text-gray-600">${issue.description}</p>

                    <div class="grid grid-cols-2">
                        <div>
                            <h2 class="text-gray-600">Assignee:</h2>
                            <p id="assigne" class="text-slate-800">${Assignee}</p>
                        </div>
                        <div>
                            <h2 class="text-gray-600">Priority</h2>
                            <button class="badge text-white bg-[#EF4444]">${issue.priority.toUpperCase()}</button>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button onclick="closeModal()" class="btn bg-[#622069] text-white text-[16px]">Close</button>
                    </div>
    `;
    showHideModal.classList.remove("hidden");
};

function closeModal() {
    showHideModal.classList.add("hidden")
}
