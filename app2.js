// const Base_URL = "https://open.er-api.com/v6/latest";
// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// // for (let code in countryList) {
// //     console.log(code, countryList[code]);
// // }

// for (let select of dropdowns) {
//     for (currcode in countryList) {
//         let newOption = document.createElement("option");
//         newOption.innerText = currcode;
//         newOption.value = currcode;
//         if (select.name === "from" && currcode === "USD") {
//             newOption.selected = 'selected';
//         } else if (select.name === "to" && currcode === "PKR") {
//             newOption.selected = 'selected';
//             console.log(select.name);

//         }
//         select.append(newOption);
//     }
//     select.addEventListener('change', (evt) => {
//         updateFlag(evt.target)
//     })
// }



// const updateFlag = (element) => {
//     let currcode = element.value;                         // e.g., "USD"
//     let countryCode = countryList[currcode];              // e.g., "US"
//     let img = element.parentElement.querySelector("img"); // get the <img> tag inside select-container
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     img.src = newSrc;                                     // set image source to correct flag
// }
// btn.addEventListener('click', (evt) => {
//     evt.preventDefault();
//     updateExchnageRate();

// });
// const updateExchnageRate = async () => {
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     console.log(amtVal);
//     if (amtVal === "" || amtVal < 1) {
//         amtVal = 1;
//         amount.value = '1';
//     }
//     const URL = `${Base_URL}/${fromCurr.value}`;

//     let response = await fetch(URL);
//     let data = await response.json(); // ✅ Parse JSON response
//     let rate = data.rates[toCurr.value];
//     let msg = document.querySelector(".msg");
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${(amtVal * rate).toFixed(2)} ${toCurr.value}`;
// }

// window.addEventListener("load", () => {
//     updateExchnageRate();
// });
const Base_URL = "https://open.er-api.com/v6/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const spinner = document.getElementById("spinner");  // Get spinner element

// Add event listeners for dropdowns
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = 'selected';
        } else if (select.name === "to" && currcode === "PKR") {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    });
}

// Update flag for selected currency
const updateFlag = (element) => {
    let currcode = element.value;                         // e.g., "USD"
    let countryCode = countryList[currcode];              // e.g., "US"
    let img = element.parentElement.querySelector("img"); // get the <img> tag inside select-container
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.src = newSrc;                                     // set image source to correct flag
}

// Handle button click to fetch exchange rate
btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    updateExchnageRate();
});

// Function to update exchange rate
const updateExchnageRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = '1';
    }
    const URL = `${Base_URL}/${fromCurr.value}`;

    // Show spinner while fetching
    spinner.style.display = "block";

    try {
        let response = await fetch(URL);
        let data = await response.json(); // ✅ Parse JSON response
        let rate = data.rates[toCurr.value];
        let msg = document.querySelector(".msg");
        msg.innerText = `${amtVal} ${fromCurr.value} = ${(amtVal * rate).toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    } finally {
        // Hide spinner once data is fetched
        spinner.style.display = "none";
    }
}

// Call to update exchange rate when page loads
window.addEventListener("load", () => {
    updateExchnageRate();
});
