//1 Drawing Canvas
var canvas = document.getElementById("myCanvas");//캔버스 불러옴
var ctx = canvas.getContext("2d");// 캔버스 2d로 선언
var ballRadius = 10; //3 for rejection ,충돌 감지를 위한 변수선언.
var x = canvas.width/2; //Define x & y for changing initial direction (50,50)
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10; //4 for paddle, 패들크기
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;  //x축위에 paddle 의 시작점을 정했다.
var rightPressed = false; // 키가 눌리면 true가 되는걸로
var leftPressed = false;
var brickRowCount = 5; //5 making brick
var brickColumnCount = 3;
var brickWidth = 75; // 벽돌 간격 및 크기 변수로 지정
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}  // 행과 열의 갯수만큼 새로운 벽돌 생성한다.

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}  //e 변수로 표시된 이벤트 파라미터를 이용 키를 누르면 true 놓으면 false로 표시!

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } //keyCode == 37은 왼쪽 방향키 39는 오른쪽 방향키, 
}
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0; //충돌발생시 status 0 로 만들어 없애기 
          score++; 
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload(); // 경고버튼 클릭시 다시로드하고 게임시작용
            clearInterval(interval); // for ending game in Chrome
          }
        }
      }
    }
  }
}

function drawBall() { //drawing code for ball
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
} // Function for Drawing paddle in screen 
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "gray";
  ctx.fillText("Score: "+score, 8, 20);
}

function draw() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // 캔버스의 내용들을 지워주는 메소드이며 네개의 파라미터 필요 , 좌상단 모서리 표시할 좌표 두개,직사각형 우하단 모서리 표시할 x,y
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  } //좌우 팅겨내기위해 사용
  if(y + dy < ballRadius) {
    dy = -dy; //반대방향으로 간다는 말이당. 좌상단부터 측정되므로 좌상단이 0 하단모서리값이 480암 , 위아래 튕겨내기 위해 작성됨
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
    }
  }  /*document.location.reload();*/ // game over후 페이지 리로딩을 위한 설정

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  } // paddle move

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10); // 실행할 명령어, 실행간격
 
/*
ctx.beginPath(); // 시작을 알리는것.
ctx.rect(20, 40, 50, 50); // 직사각형 정의. 앞의 두개는 좌상단 부터의 좌표,, 나머지 두개는 각각 너비와 높이
ctx.fillStyle ="#FF0000"; //얘는 아래의 fill method에 칠해질 색을 말해줌.
ctx.fill();
ctx.closePath();// 끝을 알림

ctx.beginPath();
ctx.arc(240,160, 20, 0, Math.PI*2, false);
// arc method는 6개의 파라미터를 가짐. 원 중심을 알리는 x,y좌표/ 원의 반지름/ 시작각도와 끝 각도/ 그리는 방향(false는 시계방향 true는 반시계)
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160,10,100,40);
ctx.strokeStyle ="rgba(0, 0, 255, 0.5)";//얘는 아래의 stroke method에 칠해질 색을 말해줌.
ctx.stroke(); //fill은 원 내부 stroke 는 원의 외곽선 색상.
ctx.closePath();
*/
// 위와 같은 그림을 매번 그릴 수 없으니 함수를 이용하여 반복시켜보자 setInterval() 과 requestAnimationFrame()을 사용해보자.

 /*
    if(y+dy < 0){
        dy = -dy;
    } // 상단 모서리 튕겨주기 위해 작성

    if(y + dy > canvas.height){
        dy = -dy;
    }//하단 모서리 튕겨주기 위해 작성
    */