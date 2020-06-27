const y = Math.floor(Math.random()*10+1);


document.querySelector(".guessSubmit").onclick = function(){
    const x = document.querySelector(".guessField").value;

    if (x == y)
    {
        alert(`Congratualtion you got a right number! Number is ${x}`);
    }
    else if(x > y){
        alert("Mate, Try lower number!");
    }
    else
    {
        alert("Mate, Try greater number!");
    }
}

