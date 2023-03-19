const btn = document.querySelector("button");
const input = document.querySelector("input");
const result = document.querySelector(".results");
//get the value of the input
let preview;
btn.addEventListener("click", function () {
  const inputValue = input.value;
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${inputValue}&number=5&apiKey=73d123b0948a42468cfc5cfba1dce24b `
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = result.innerHTML = data.results.map((item) => {
        return `      
        <li class="preview" onClick="handleClick" data-id=${item.id}>
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
    .catch((error) => console.error(error));
});

const handleClick = () => {
  console.log("clicked");
  console.log("clicked");
  const id = e.target.dataset.id;
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
            </li>`;
                  })
                  .join("")}
            </ul>`;
    })
    .catch((error) => console.error(error));
};
