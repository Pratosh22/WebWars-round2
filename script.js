const btn=document.querySelector('button');
const input=document.querySelector('input');
const result=document.querySelector('.results');
//get the value of the input

btn.addEventListener('click',function(){
  const inputValue=input.value;
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${inputValue}&number=3&apiKey=59aaee828d6e4657a1b550bf2a50df44 `
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));

    



});