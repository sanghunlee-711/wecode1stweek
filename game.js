const y = Math.floor(Math.random()*10+1);
const guess = 1;

document.querySelector("#submitguess").onclick = function(){
    const x = document.querySelector(".guessField").value;

if(x == y)
{
    alert(`Congratualtion you guess right way The number is ${x} ! `);
}
else if(x > y)
{

    alert("Sorry try a smaller number");
}
else
{

    alert("Sorry try a greater number");
}
    };




