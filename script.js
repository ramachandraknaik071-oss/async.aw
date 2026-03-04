const API = "https://jsonplaceholder.typicode.com/users/1";
const output = document.querySelector(".output-section");
const buttons = document.querySelectorAll(".btn");

function startFetch(type) {


    buttons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.${type}-btn`).classList.add("active");

    // Show loading
    output.innerHTML = `<p class="loader">Loading Profile...</p>`;

    type === "async" ? loadAsync() : loadPromise();
}


async function loadAsync() {
    console.clear();
    console.log("1 Start (Async)");

    try {
        const user = await fetch(API).then(res => res.json());
        render(user);
        console.log("4 End (After Data)");
    } catch {
        showError("Error loading data (Async)");
    }
}

/* ---------- PROMISE VERSION ---------- */

function loadPromise() {
    console.clear();
    console.log("1 Start (Promise)");

    fetch(API)
        .then(res => res.json())
        .then(render)
        .catch(() => showError("Error loading data (Promise)"));

    console.log("4 End (Runs Before Data)");
}

function render(user) {
    output.innerHTML = `
        <div class="profile-card">
            <h2>${user.name} (@${user.username})</h2>

            <div class="profile-grid">
                <div class="profile-item"><strong>Email:</strong> ${user.email}</div>
                <div class="profile-item"><strong>Phone:</strong> ${user.phone}</div>
                <div class="profile-item"><strong>Website:</strong> ${user.website}</div>
                <div class="profile-item"><strong>City:</strong> ${user.address.city}</div>
            </div>

            <div class="company-box">
                <strong>Company:</strong> ${user.company.name}<br>
                <em>${user.company.catchPhrase}</em><br>
                ${user.company.bs}
            </div>
        </div>
    `;
}

function showError(message) {
    output.innerHTML = `<p class="error">${message}</p>`;

}
