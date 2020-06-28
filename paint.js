const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
//canvas는 내부 pixel을 다룰수 있는 자주 사용되는 요소임
const INITIAL_COLOR ="black";
const CANVAS_SIZE = 500;
const saveBtn = document.getElementById("jsSave")


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; // css로 만들 canvas가 아니라 pixelmodifier가 될 canvas에 실제로 height와 width 를 줘야한다.

ctx.fillStyle = "white";
ctx.fillRect(0, 0,canvas.width , canvas.height); // 흰화면에서 저장시 뒤에 배경이 흰색이 아니라투명으로 저장되는 문제 해결을 위해 default값을 흰색으로 줬다!
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting =false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
            console.log("creating path in",x , y);
        ctx.beginPath();
        ctx.moveTo(x, y); //마우스를 클릭안해도 path는 계속 생성되고 있지만 클릭과 동시에 else로 넘어가서 line to를 실행시킴(이전 path - > else path까지 실행)
    }
    else{
        console.log("creating line in",x , y);
        ctx.lineTo(x, y);
        ctx.stroke()
    }
}

function onmouseDown(event){
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; //strokestyle의 default설정값을 클릭시 생성되는 event내의 background컬러를 바꿔줌으로서 색칠할 색이 바뀌게됨.
    ctx.fillStyle = color;
}

function handleRangechange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}


function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0,canvas.width , canvas.height);
    }
    
}

function handleCM(event){
    event.preventDefault();

}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link =document.createElement("a");
    link.href = image;
    link.download = "PaintfromSanghunleeSite";
    link.click();
}

//Event 내에 보면 client x,y와 offset x,y가 존재하는데 client x,y는 화면전체의 크기 offset x,y는 내가 selecting한 크기(캔버스크기)가 되므로
//event내에서 offset x,y를 가져와야한다.
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); // Mousemoving을 통해 localstorage에 MouseEvent 명목으로 좌표값이 날아가게됨.
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //클릭시 우클릭 저장 방지임
}


//array.from method는 object로부터 array를 만듦.
Array.from(colors).forEach(controled_color => controled_color.addEventListener("click", handleColorClick));
//controled_color는 array로바꾼 내부에 있는 하나하나의 아이템을 말하는 것이기에 무슨 명을 사용해도 상관없음 !

if(range){
    range.addEventListener("input", handleRangechange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}