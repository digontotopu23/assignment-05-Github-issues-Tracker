 const container = document.getElementById("issuesContainer");

 // Load All Issues

function loadIssues(){

container.innerHTML=`<span class="loading loading-spinner loading-lg"></span>`

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

.then(res=>res.json())

.then(data=>{

displayIssues(data.data)

})

};

function displayIssues(issues){

container.innerHTML=""

issues.forEach(issue=>{

const div=document.createElement("div")

div.className=`
card bg-white shadow cursor-pointer border-t-4
${issue.status==="open"?"border-green-500":"border-purple-500"}
`

div.innerHTML=`

<div class="card-body">

<h2 class="card-title">${issue.title}</h2>

<p class="text-sm text-gray-500">
${issue.description}
</p>

<p class="text-sm">Author: ${issue.author}</p>

<p class="text-sm">Priority: ${issue.priority}</p>

<p class="text-xs text-gray-400">
${issue.createdAt}
</p>

</div>
`

div.onclick=()=>loadSingle(issue.id)

container.appendChild(div)

});

};

// Load Single Issue

function loadSingle(id){

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

.then(res=>res.json())

.then(data=>{

showModal(data.data)

});

};

// Modal

function showModal(issue){

document.getElementById("modalTitle").innerText=issue.title
document.getElementById("modalDesc").innerText=issue.description
document.getElementById("modalAuthor").innerText="Author: "+issue.author
document.getElementById("modalPriority").innerText="Priority: "+issue.priority
document.getElementById("modalDate").innerText=issue.createdAt

issueModal.showModal()

}

function closeModal(){
issueModal.close()
};

// Filter Open       

function loadOpen(){

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

.then(res=>res.json())

.then(data=>{

const open=data.data.filter(i=>i.status==="open")

displayIssues(open)

});

};

// Filter Closed

function loadClosed(){

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

.then(res=>res.json())

.then(data=>{

const closed=data.data.filter(i=>i.status==="closed")

displayIssues(closed)

});

};


// Search

function searchIssue(){

const text=document.getElementById("searchInput").value

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

.then(res=>res.json())

.then(data=>{

displayIssues(data.data)

})

};


loadIssues();


