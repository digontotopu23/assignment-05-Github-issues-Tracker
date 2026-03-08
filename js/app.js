 const container = document.getElementById("issuesContainer");


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

})

}

