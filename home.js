// https://phi-lab-server.vercel.app/api/v1/lab/issues

/*"bug", "help wanted", "enhancement","good first issue","documentation"
 */

/*async function loadStatus() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const resdata = await res.json();
  const situation = resdata.data.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.status === item.status),
  );
  // console.log(resdata);
  situation.forEach((status) => {
    //   console.log(status);
    const btn = document.createElement("button");
    btn.className = "btn bg-white mx-4 text-[#64748B]  w-25";
      btn.textContent = status.status;
      btn.onclick = () => selectStatus(status.id);
    statusContainer.appendChild(btn);
  });
}*/

const statusContainer = document.getElementById("status-btn");
const cardContainer = document.getElementById("issue-cards-container");
const loadingSpinner = document.getElementById("loading-spinner");

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
  cardContainer.innerHTML = "";
}
function hideLoading() {
  loadingSpinner.classList.add("hidden");
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
function toggole(btnId) {
  document.getElementById("all-filter-button").className = "w-25 btn text-[#64748B]";
  document.getElementById("open-button").className = "w-25 btn text-[#64748B]";
  document.getElementById("closed-button").className = "w-25 btn text-[#64748B]";
  document.getElementById(btnId).className =
    "btn btn-primary text-amber-50 w-25";

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
  issues.forEach((issue) => {
    // console.log(issue);
    const card = document.createElement("div");

    card.className = `issue-card border-t-3 rounded-2xl space-y-4 bg-gray-100 shadow-xl/30 ${issue.status === "open" ? "border-green-500" : "border-purple-700"}`;

    card.innerHTML = `<div class="px-6 pt-8">
                        <div class="flex justify-between ">
                             <div><img src="${issue.status === "open" ? "images/open.png" : "images/closed.png"}"  alt></div>
                            
                            <div class="mb-4">
                                <p
                                    class="px-5 rounded-full ${priorityStyle(issue.priority)}">${issue.priority}</p>
                            </div>
                        </div>
                        <div class="mb-2">
                            <h3 class="font-semibold text-[#14px]">${issue.title}</h3>
                            <p class="text-[#12px] regular-text-color line-clamp-2">${issue.description}</p>
                        </div>
                  
                        <div class="labels flex gap-2">
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
           <p>${lable}</p></div> `;
  });
  return div;
}


loadIssues();
