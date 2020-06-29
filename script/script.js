
const employeersList = [
    {
        dept_unit_id: 0,
        id: 0,
        name: "YarikHead",
        tel: "123-123-3", 
        salary: 3000
    },
    {
        id: 1,
        name: "MashaLead",
        dept_unit_id: 1,
        tel: "123-123-3", 
        salary: 2000
    },
    {
        id: 2,
        name: "SashaLead",
        dept_unit_id: 1,
        tel: "123-123-3", 
        salary: 2200
    },
    {
        id: 3,
        name: "MirraDev",
        dept_unit_id: 2,
        tel: "123-123-3",
        salary: 1200
    },
    {
        id: 4,
        name: "IraDev",
        dept_unit_id: 2,
        tel: "123-123-3",
        salary: 1000
    },
    {
        id: 5,
        name: "DanikHead3",
        dept_unit_id: 3,
        tel: "123-123-33",
        salary: 3000
    },
    {
        id: 7,
        name: "KoliaLead",
        dept_unit_id: 4,
        tel: "123-123-3",
        salary: 2000
    },
    {
        id: 6,
        name: "OliaLead3",
        dept_unit_id: 4,
        tel: "123-123-3",
        salary: 2200
    },
    {
        id: 9,
        name: "SienaTest",
        dept_unit_id: 5,
        tel: "123-123-3",
        salary: 1000
    },
    {
        id: 8,
        name: "LenaTest",
        dept_unit_id: 5,
        tel: "123-123-3",
        salary: 1200
    },
];

const departaments = [
    {
    name: 'Developers',
    id: 2,
    parent_dep_id: 1,
     
    },
    {
    name: 'Lead Developers',
    id: 1,
    parent_dep_id: 0, 
     
    },
    {   
    name: 'Development Management',
    id: 0,
    parent_dep_id: null,
    
    },
    {
        name: 'Testers',
        id: 5,
        parent_dep_id: 4, 
    },
    {
        name: 'Lead QA',
        id: 4,
        parent_dep_id: 3, 
    },
    {
        name: 'Quality Assurance Management',
        id: 3,
        parent_dep_id: null,
    }
];
// ---------------------------Формируем дерево департаментов
function getTreeDept(arr){
    for(let i = 0; i < arr.length; i++){
        const potentialChild = arr[i];

        for(let j = 0; j < arr.length; j++){
            const potentialParent = arr[j];

            if(potentialParent.id === potentialChild.parent_dep_id){
                if(!potentialParent.child_dep){
                    potentialParent.child_dep = [];
                }
                potentialParent.child_dep.push(potentialChild);
            }
        }
    }

    return  arr.filter(item => item.parent_dep_id === null);
};
let arrayDepartament = getTreeDept(departaments);
let domEl = document.getElementById("dep_tree")

buildTreeInHTML(domEl);

// ----------------------------формируем дерево департаментов в HTML

function buildTreeInHTML (elem){
    let elUl = document.createElement("ul")
    
    recursionDeptTree(arrayDepartament, elUl)
    elem.append(elUl);
}

function recursionDeptTree(array, el){
    array.forEach(element => {
        if(!element.child_dep){
            let elLi = document.createElement("li");
            elLi.innerHTML = `<i"></i><span data-dept-id = ${element.id}> ${element.name}</span>`;
            el.append(elLi);  
        }
        if(element.child_dep){
            let elLi = document.createElement("li");
            elLi.innerHTML = `<i class = "fa fa-chevron-right"></i><span data-dept-id = ${element.id}> ${element.name}</span>`;
            el.append(elLi);
            let childUl = document.createElement("ul");
            elLi.append(childUl);
            recursionDeptTree(element.child_dep, childUl)   
        }
    });   
}
// ------------------------------------------- обработка клика на дереве департаментов
domEl.addEventListener("click",function (ev){
    if(ev.target.nodeName === "SPAN"){
        let deptId = +ev.target.getAttribute("data-dept-id")
        highlight(ev.target)
        let filteredEmpl = employeersList.filter(empl => deptId === empl.dept_unit_id )
        
        buildTable(filteredEmpl)
    }
    if( ev.target.tagName === "I"){
         ev.target.classList.toggle("fa-chevron-down")  
        
        let childrenContainer = ev.target.parentNode.querySelector('ul');

        if (!childrenContainer) {
            return;
        }
            childrenContainer.hidden = !childrenContainer.hidden;
    }
         
});
// =---------------------------строим таблицу по данным сотрудников
function buildTable(arr){
    clearTable();
    fillTable(arr)
}

function clearTable(){
    let tableEl = document.getElementsByTagName('table')[0];
    let tbodyEl = document.getElementsByTagName("tbody")[0];
    if(!tbodyEl){
        return
    }
tableEl.removeChild(tbodyEl)
}
function fillTable(arr){
    let tBody = document.createElement("tbody")
    let keys = ["id", "name", "tel", "salary"]
    arr.forEach(obj => {
        let trEl = document.createElement("tr")
        keys.forEach(key => {
            let elTd = document.createElement("td")
            elTd.innerText = obj[key]; 
            trEl.append(elTd)

            if(key === "salary"){
                elTd.setAttribute("data-salary", obj[key])
            }
            
        })
        tBody.append(trEl)
            
    })
    let tableEl = document.getElementsByTagName('table')[0];
    tableEl.append(tBody)
    converter() 
}

// ____________________________________________________Формируется список валют
const curId = [145, 292];
const select = document.getElementById("sel");
let officialRate = {};

curId.forEach(async function fetchCurr(id){
    const url = id
    ? "https://www.nbrb.by/api/exrates/rates/" + id :
    "https://www.nbrb.by/api/exrates/rates/";
    const result = await fetch(url);
    const fetchedData = await result.json();
    officialRate[id] = fetchedData.Cur_OfficialRate;
    let option = document.createElement("option");
    option.value = fetchedData.Cur_ID;
    
    option.innerText = fetchedData.Cur_Abbreviation; 
    
    select.append(option);
    
    }
);

// -----------------вешаем конвертер на селектор

select.addEventListener("change", ev => {
    
    const actualCur = ev.target.value;
    if(actualCur !== "000"){
        for(let key in officialRate){
            if (actualCur === key){
                let arrayTd = document.querySelectorAll("td[data-salary]")
                    for(let i = 0; i<arrayTd.length; i++){
                        actualSalaryItem = +arrayTd[i].getAttribute("data-salary")
                        let result = actualSalaryItem / officialRate[key]
                        arrayTd[i]. innerText = result.toFixed(1)
                    }  
            }
        }  
    }
    if (actualCur == "000"){
        let arrayTd = document.querySelectorAll("td[data-salary]")
        for(let i = 0; i<arrayTd.length; i++){
            actualSalaryItem = +arrayTd[i].getAttribute("data-salary")
            arrayTd[i]. innerText = actualSalaryItem
        } 
    }
})
// ------------ кнопка очистки таблицы
document.getElementById("clear").addEventListener("click", function(){
    clearTable()
})
// --------- подсветка выбраного департамента
let selectedSpan
function highlight(sp){
    if(selectedSpan){
        selectedSpan.classList.remove('highlight')   
    }
    selectedSpan = sp;
    selectedSpan.classList.add('highlight')
}
// ---------------------- конвертер отдельно для формирования salary по выбранной валюте
function converter(){
    const select = document.getElementById("sel");
    let a = select.value
    if(a !== "000"){
        for(let key in officialRate){
            if (a === key){
                let arrayTd = document.querySelectorAll("td[data-salary]")
                    for(let i = 0; i<arrayTd.length; i++){
                        actualSalaryItem = +arrayTd[i].getAttribute("data-salary")
                        let result = actualSalaryItem / officialRate[key]
                        arrayTd[i]. innerText = result.toFixed(1)
                    }  
            }
        }  
    }
    if (a === "000"){
        let arrayTd = document.querySelectorAll("td[data-salary]")
        for(let i = 0; i<arrayTd.length; i++){
            actualSalaryItem = +arrayTd[i].getAttribute("data-salary")
            arrayTd[i]. innerText = actualSalaryItem
        } 
    }
}














