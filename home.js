// https://superlative-pastelito-f8f82c.netlify.app/


const statusContainer = document.getElementById("status-btn");
const cardContainer = document.getElementById("issue-cards-container");
const loadingSpinner = document.getElementById("loading-spinner");
const issueModal = document.getElementById("issue-modal");
const searchIssue = document.getElementById("search-input");

async function searchIssues() {
    const searchText = searchIssue.value;
    showLoading();
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
    );
    const resdata = await res.json();
   
    hideLoading();
    displayIssues(resdata.data);


}

async function openIssueModal(cardId) {
    // console.log(cardId);
   
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`);
    const data = await res.json();
    const issue = data.data;
 
    //  console.log(issueDetails, "data");
    document.querySelector("#issue-modal").innerHTML = `
    <div class="modal-box">
                        <form method="dialog">
                            <button
                                class="btn btn-sm absolute right-2 top-2">✕</button>
                        </form>
                        <h3 class="text-2xl font-bold py-5 ">${issue.title}</h3>
                        <div
                            class="  mt-2 md:flex gap-2 justify-start items-center ">
                            <p
                                class="${issue.status === "open" ? "bg-green-700" : "bg-purple-700"} text-white px-3 rounded-full">${issue.status === "open" ? "Opened" : "Closed"}
                            </p>
                            <p> • Opened by ${issue.author} • </p>
                            <p>${issue.createdAt.split("T")[0]}</p>

                        </div>
                        <div
                            class="  mt-4 md:flex space-y-2 gap-2 justify-start items-center ">
                            ${fixLavels(issue.labels)}</div>
                        <p class="py-4">${issue.description}</p>

                        <div
                            class="bg-gray-100 rounded-xl p-5 flex gap-30">
                            <div><p>Assignee: <br> <span class="font-bold">${issue.assignee ? issue.assignee : "Unassigned"}</span></p></div>
                            <div><p>Priority: <br> <span
                                        class="px-3 rounded-full border-2 flex justify-start items-center gap-1 ${priorityStyle1(issue.priority)}">${issue.priority}</span></p></div>

                        </div>

                        <div class="modal-action">
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn btn-primary">Close</button>
                            </form>
                        </div>
                    </div>
    `;
    
    issueModal.showModal();
}
 
async function filterIssues(status) {
    showLoading();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
    const resdata = await res.json();
    const filterData = resdata.data.filter((item) => item.status == status);
    hideLoading();
    displayIssues(filterData);

}


async function loadIssues() {
  showLoading();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const resdata = await res.json();
  // console.log(resdata);
  hideLoading();
  displayIssues(resdata.data);
}

function displayIssues(issues) {
    // console.log(issues);
    
    document.getElementById("issue-count").innerText = issues.length;
    cardContainer.innerHTML=""; 

    if (issues.length === 0) {
        cardContainer.innerHTML = `
            <div class="col-span-3 flex flex-col justify-center items-center py-20 gap-3">
                <img src="images/file.png" alt>
                <p class="text-2xl font-semibold text-gray-400">No issues found</p> 
            </div>
        `;
        return;
    }

  issues.forEach((issue) => {
    // console.log(issue);
    const card = document.createElement("div");

    card.className = `issue-card border-t-3 rounded-2xl space-y-4 bg-gray-100 shadow-xl/30 ${issue.status === "open" ? "border-green-500" : "border-purple-700"} hover:bg-blue-100`;
      card.onclick = () => openIssueModal(issue.id);
      
    card.innerHTML = `<div class="px-6 pt-8">
                        <div class="flex justify-between ">
                             <div><img src="${issue.status === "open" ? "images/open.png" : "images/closed.png"}"  alt></div>
                            
                            <div class="mb-4">
                                <p
                                    class="px-5 rounded-full ${priorityStyle(issue.priority)}">${issue.priority}</p>
                            </div>
                        </div>
                        <div class="mb-2">
                            <h3 class="font-semibold text-[#14px] cursor-pointer">${issue.title}</h3>
                            <p class="text-[#12px] regular-text-color line-clamp-2">${issue.description}</p>
                        </div>
                  
                        <div class="labels space-y-3 md:flex gap-2">
                            ${fixLavels(issue.labels)}
                            </div>

                    </div>

                    <div class="border-t-2 pb-4 border-gray-400 rounded-b-2xl ">
                        <div class="p-2 flex justify-between">

                            <p class="px-5 ">#<span>${issue.id}</span> by 
                                <span> ${issue.author}</span></p>
                            <p class="px-5 "><span>${issue.createdAt.split("T")[0]}</span>
                                <span> </span></p>
                        </div>
                        <div class="p-2 flex justify-between">

                            <p class="px-5 ">Assignee: <span>${issue.assignee ? issue.assignee : "unassigned"}</span></p>
                            <p class="px-5 ">Updated: <span>${issue.updatedAt.split("T")[0]}</span></p>
                        </div>
                    </div>`;

    cardContainer.appendChild(card);
  });
}

function priorityStyle(p) {
  if (p == "high") {
    return "text-red-700 bg-red-300";
  }
  if (p == "medium") {
    return "text-yellow-700 bg-yellow-200";
  }
  if (p == "low") {
    return "text-gray-700 bg-gray-300";
  }
}
function priorityStyle1(p) {
  if (p == "high") {
    return "text-white bg-red-500";
  }
  if (p == "medium") {
    return "text-white bg-yellow-500";
  }
  if (p == "low") {
    return "text-white bg-gray-500";
  }
}
function labelStyle(l) {
  if (l == "enhancement") {
    return {
      color: "text-green-700 bg-green-300",
      icon: "fa-solid fa-wand-sparkles",
    };
  }
  if (l == "help wanted") {
    return {
      color: "text-yellow-700 bg-yellow-200",
      icon: "fa-solid fa-life-ring",
    };
  }
  if (l == "bug") {
    return {
      color: "text-red-700 bg-red-300",
      icon: "fa-solid fa-bug",
    };
  }
  if (l == "good first issue") {
    return {
      color: "text-blue-700 bg-blue-300",
      icon: "fa-solid fa-seedling",
    };
  }
  if (l == "documentation") {
    return {
      color: "text-orange-700 bg-orange-300",
      icon: "fa-solid fa-file-lines",
    };
  }
}
function fixLavels(fl) {
  let div = "";
  fl.forEach((lable) => {
    div =
      div +
      `  <div  class="px-3 py-1 rounded-full border-2 flex gap-1 ${labelStyle(lable).color}">
           <div><i class="${labelStyle(lable).icon}"></i></div>
           <p>${lable.toUpperCase()}</p></div> `;
  });
  return div;
}
function showLoading() {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
  cardContainer.innerHTML = "";
}
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}
function toggole(btnId) {
  document.getElementById("all-filter-button").className =
    "w-15 md:w-25 btn text-[#64748B]";
  document.getElementById("open-button").className = "w-15 md:w-25 btn text-[#64748B]";
  document.getElementById("closed-button").className =
    "w-15 md:w-25 btn text-[#64748B]";
  document.getElementById(btnId).className =
    "btn btn-primary text-amber-50 w-15 md:w-25";

  if (btnId === "all-filter-button") {
    loadIssues();
  }
  if (btnId === "open-button") {
    filterIssues("open");
  }
  if (btnId === "closed-button") {
    filterIssues("closed");
  }
}


loadIssues();
