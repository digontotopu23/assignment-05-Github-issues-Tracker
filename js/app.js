// Login Protection
if (localStorage.getItem("login") !== "true") {
    window.location.href = "login.html";
}

const container = document.getElementById("issuesContainer");

// Load All Issues

function loadIssues() {

    container.innerHTML = `
<div class="col-span-4 flex justify-center">
<span class="loading loading-spinner loading-lg"></span>
</div>
`

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

        .then(res => res.json())

        .then(data => {

            displayIssues(data.data)

        })

};

function displayIssues(issues) {
    
    const countElement = document.getElementById("totalIssueCount");
    if (countElement) {
        countElement.innerText = issues.length;
    }

    container.innerHTML = "";

    issues.forEach(issue => {

        const labelsHTML = issue.labels.map(l =>
            `<span class="badge badge-warning badge-outline badge-xs text-[10px] uppercase font-bold">${l}</span>`
        ).join("") 
        || "";

        const div = document.createElement("div")

        div.className = `
      card bg-white shadow cursor-pointer border-t-4
     ${issue.status === "open" ? "border-green-500" : "border-purple-500"}
`

        div.innerHTML = `

           <div class="card-body p-4 space-y-2">
                <div class="flex justify-between items-center">
                      
                     <span class="text-xs ${issue.status === 'open' ? 'text-green-600' : 'text-purple-600'} font-semibold italic">${issue.status}</span>
                     <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gray-100">${issue.priority}</span>
                </div>
                
                <h2 class="card-title text-base font-bold leading-tight">${issue.title}</h2>
                <p class="text-xs text-gray-500 line-clamp-2">${issue.description}</p>
                
                <div class="flex flex-wrap gap-1">${labelsHTML}</div>

                <div class="pt-2 border-t border-gray-50 mt-auto">
                    <p class="text-[11px] text-gray-600">#${issue.id} by <b>${issue.author}</b></p>
                    <p class="text-[10px] text-gray-400">${issue.createdAt}</p>
                </div>
            </div>
`

        div.onclick = () => loadSingle(issue.id)

        container.appendChild(div)

    });

};

// Load Single Issue

function loadSingle(id) {

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

        .then(res => res.json())

        .then(data => {

            showModal(data.data)

        });

};

// Modal

function showModal(issue) {

    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalDesc").innerText = issue.description;
    document.getElementById("modalAuthor").innerText = issue.author;
    document.getElementById("modalDate").innerText = issue.createdAt;
    document.getElementById("modalAssigneeName").innerText = issue.author; // Assuming author as assignee

    
    const statusBadge = document.getElementById("modalStatusBadge");
    statusBadge.innerText = issue.status;
    statusBadge.className = issue.status === 'open' 
        ? "badge badge-success text-white font-semibold py-3" 
        : "badge badge-secondary text-white font-semibold py-3";


    const priorityBadge = document.getElementById("modalPriorityBadge");
    priorityBadge.innerText = issue.priority;
    const pColor = issue.priority.toLowerCase();
    priorityBadge.className = `badge text-white text-[10px] font-bold uppercase ${
        pColor === 'high' ? 'bg-red-500' : pColor === 'medium' ? 'bg-orange-400' : 'bg-blue-400'
    }`;

    // Update Labels
    const labelsContainer = document.getElementById("modalLabels");
    labelsContainer.innerHTML = issue.labels.map(l => 
        `<span class="badge badge-outline badge-warning text-[11px] font-bold uppercase px-3 py-3">🏷️ ${l}</span>`
    ).join("");

    issueModal.showModal();
}

// Filter Open       

function loadOpen() {

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

        .then(res => res.json())

        .then(data => {

            const open = data.data.filter(i => i.status === "open")

            displayIssues(open)

        });

};

// Filter Closed

function loadClosed() {

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

        .then(res => res.json())

        .then(data => {

            const closed = data.data.filter(i => i.status === "closed")

            displayIssues(closed)

        });

};


// Search

function searchIssue() {

    const text = document.getElementById("searchInput").value.trim();

    if (text === "") {
        loadIssues();
        return;
    }

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

        .then(res => res.json())

        .then(data => {

            displayIssues(data.data)

        });

};

function setTab(tab) {

    document.getElementById("allTab").classList.remove("btn-primary", "text-white")
    document.getElementById("openTab").classList.remove("btn-primary", "text-white")
    document.getElementById("closedTab").classList.remove("btn-primary", "text-white")

    document.getElementById(tab + "Tab").classList.add("btn-primary", "text-white")

    if (tab === "all") {
        loadIssues()
    }
    else if (tab === "open") {
        loadOpen()
    }
    else {
        loadClosed()
    };

};

loadIssues();


