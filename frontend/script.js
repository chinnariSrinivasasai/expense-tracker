// ================= LOGIN =================
let loginBtn = document.getElementById("login-btn");
let logoutBtn = document.getElementById("logout-btn");

let loginPage = document.getElementById("login-page");
let homePage = document.getElementById("home-page");

loginBtn.onclick = function () {
    let name = document.getElementById("username").value.trim();
    if (name === "") {
        alert("Please enter your name");
    } else {
        loginPage.style.display = "none";
        homePage.style.display = "block";
    }
};

logoutBtn.onclick = function () {
    homePage.style.display = "none";
    loginPage.style.display = "block";
};


// ================= EXPENSE TRACKER =================

let amt = document.getElementById("amount");
let date = document.getElementById("date");
let incomeRadio = document.getElementById("incomeRadio");
let expenseRadio = document.getElementById("expenseRadio");

let tableBody = document.getElementById("table-body");

let incomeAmount = document.getElementById("income-amt");
let expenseAmount = document.getElementById("expense-amt");
let balanceAmount = document.getElementById("balance-amt");

document.getElementById("add-btn").onclick = function () {

    if (amt.value === "" || date.value === "") {
        alert("Enter amount and date");
        return;
    }

    let amountValue = parseInt(amt.value);
    let transactionType = incomeRadio.checked ? "Income" : "Expense";

    let currentIncome = parseInt(incomeAmount.innerText) || 0;
    let currentExpense = parseInt(expenseAmount.innerText) || 0;
    let currentBalance = parseInt(balanceAmount.innerText) || 0;

    if (transactionType === "Income") {
        incomeAmount.innerText = currentIncome + amountValue;
        balanceAmount.innerText = currentBalance + amountValue;
    } else {
        expenseAmount.innerText = currentExpense + amountValue;
        balanceAmount.innerText = currentBalance - amountValue;
    }

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>$${amountValue}</td>
        <td>${transactionType}</td>
        <td>${date.value}</td>
        <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
    `;

    row.querySelector(".delete-btn").onclick = function () {

        let incomeNow = parseInt(incomeAmount.innerText) || 0;
        let expenseNow = parseInt(expenseAmount.innerText) || 0;
        let balanceNow = parseInt(balanceAmount.innerText) || 0;

        if (transactionType === "Income") {
            incomeAmount.innerText = incomeNow - amountValue;
            balanceAmount.innerText = balanceNow - amountValue;
        } else {
            expenseAmount.innerText = expenseNow - amountValue;
            balanceAmount.innerText = balanceNow + amountValue;
        }

        row.remove();
    };

    tableBody.appendChild(row);

    amt.value = "";
    date.value = "";
};