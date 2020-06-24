let y = Math.floor(Math.random()*10+1);
//random한 숫자를 주기 위한 변수설정 . Math 이용 숫자 혹시 바뀔수도 있으니 let으로 설정.
const guess = 1;

document.querySelector("#submitguess").onclick = function(){
    var x = document.querySelector(".guessField").value;

if(x == y)
{
    alert(`Congratualtion you guess ${guess} right way`);
}
else if(x > y)
{

    alert("sorry try a smaller number");
}
else
{

    alert("sorry try a greater number");
}
    };




