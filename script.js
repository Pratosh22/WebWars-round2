const btn = document.querySelector("button");
const input = document.querySelector("input");
const result = document.querySelector(".results");
let limit = document.querySelector(".limit");
//get the value of the input
btn.addEventListener("click", function () {
  const inputValue = input.value;
  document.querySelector(".error").innerHTML = "";
  newlimit = limit.value;
  if (newlimit == "") {
    newlimit = 5;
  }

  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${inputValue}&number=${newlimit}&apiKey=194a19ca1baa4345a26710e6cc233a66 `
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length == 0) {
        document.querySelector(
          ".error"
        ).innerHTML = `<h2>Sorry, no results found for '${inputValue}'</h2>`;
      }
      result.innerHTML = result.innerHTML = data.results.map((item) => {
        return `      
        <li class="preview" onClick="handleClick(${item.id})" data-id=${item.id}>
        <div class="preview-link" data-id=${item.id}>
            <figure class="preview-fig">
                <img src="${item.image}"
                    alt="preivew-img" style="width:60px;border-radius: 50%;">
            </figure>
            <div class="preview-data">
                <h4 class="preview-title">${item.title}</h4>
            </div>
        </a>
    </li>`;
      });
    })
    .catch((error) => {
      document.querySelector(
        ".error"
      ).innerHTML = `<h2>Sorry, no results found for '${inputValue}'</h2>`;
    });
});

const handleClick = (id) => {
  fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=d1ea3622ae844fd49ef113c2f15e0ef8` //stepsToMake
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(
        ".recipe-img"
      ).innerHTML = `<img src="${data.image}" width="300px" alt="">`;
      document.querySelector(
        ".recipe-details"
      ).innerHTML = `<h2>${data.title}</h2>
            <p>${data.summary}</p>`;
      document.querySelector(".ing").innerHTML = `<h3>Recipe Ingredient</h3>
            <ul class="wrap">
                ${data.extendedIngredients
                  .map((item) => {
                    return `<li class="recipe-ingredient">
                <div>
                    <div class="recipe_quantity">${item.amount}</div>
                    <div class="description"><p>${item.name}</p></div>
                </div>
                </div>
            </li>`;
                  })
                  .join("")}
            </ul>`;
      document.querySelector(
        ".instructions-list"
      ).innerHTML = `<h3>Steps to make</h3>
      ${data.analyzedInstructions[0].steps.map(
        (step) => `<li style="list-style-type:disc">${step.step}</li>`
      )}`;
    })
    .catch((error) => console.error(error));
};
