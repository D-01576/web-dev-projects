let leads = []
let inputEl = document.getElementById("input-el");
let saveinput = document.getElementById("save-input");
let savetab = document.getElementById("save-tab");
let deleteEl = document.getElementById("Delete-all");
let list = document.getElementById("list");

let getdata = localStorage.getItem("leads");

if(getdata){
    leads = JSON.parse(localStorage.getItem("leads"))
    innertext();
}

function add(){
    leads.push(inputEl.value);
    innertext();
    localStorage.setItem("leads", JSON.stringify(leads))
    inputEl.value = "";
}

function innertext(){
    let listItem = ""
    for (let i=0; i<leads.length; i++){
        listItem += `<li>
                        <a href="${leads[i]}" target="_blank">
                            ${leads[i]}
                        </a>
                    </li>`
    }
    list.innerHTML = listItem
}
function removeall(){
    leads = []
    localStorage.clear();
    innertext()
}

savetab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        leads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads))
        innertext()
    })
})

deleteEl.addEventListener("click", removeall)
saveinput.addEventListener("click", add)