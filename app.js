const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("erase-btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
//색상선택하는 것
const color = document.getElementById("color");
//array 로 변경해서 가져오기
const colorOptions = Array.from(document.getElementsByClassName("color-option"));

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);   
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    //새로운 라인 시작
    ctx.beginPath();
}

function onLineWidthChange(event){
    // console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    // console.log(event.target.value);
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event){
    const colorValue =  event.target.dataset.color;
    // console.dir(event.target.dataset.color);
    ctx.strokeStyle =colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;

}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "채우기 모드";

    }
    else {
        isFilling = true;
        modeBtn.innerText = "그리기 모드";
    }
}
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
    ctx.drawImage(image,0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
    }
}
function onDoubleClick(event){
    //현재상태 저장 후 변경 (ex 펜 굵기)
    const text = textInput.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font ="68px arial";
        ctx.fillText(text, event.offsetX, event.offsetY)
        ctx.lineWidth
        //복원
        ctx.restore();
    }
}
function onSaveClick(){
   const url = canvas.toDataURL();
   const a = document.createElement("a");
   a.href = url;
   a.download = "myDrawing.png"
   a.click();
//    <a href ="" download></a>

}

//마우스 더블클릭시 
canvas.addEventListener("dblclick", onDoubleClick);
//마우스 움직였을때 
canvas.addEventListener("mousemove", onMove);
//마우스 버튼 눌렀을때
canvas.addEventListener("mousedown", startPainting);
//마우스 버튼 뗐을때
canvas.addEventListener("mouseup", cancelPainting);
//마우스 화면 바깥으로 나왔을때  
canvas.addEventListener("mouseleave", cancelPainting);
//클릭했을때 
canvas.addEventListener("click",onCanvasClick);
//선굵기 조절
lineWidth.addEventListener("change", onLineWidthChange);
//선 색깔변경 
color.addEventListener("change", onColorChange);

//색상 선택할때마다 event타도록
//색상 array로 전환 => foreach 로 call function 
colorOptions.forEach(color => color.addEventListener("click",onColorClick));
//모드 버튼 클릭시
modeBtn.addEventListener("click", onModeClick);
//destroy 버튼 클릭시
destroyBtn.addEventListener("click", onDestroyClick);
//지우기 버튼 클릭시 
eraseBtn.addEventListener("click",onEraserClick);
//파일 선택 버튼 클릭시

fileInput.addEventListener("change", onFileChange);

saveBtn.addEventListener("click", onSaveClick);