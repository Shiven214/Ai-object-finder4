status="";
objects=[];


function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(480,380);
}

function start(){
    objectDetector=ml5.objectDetector("cocossd", modeLoaded);
    document.getElementById("status").innerHTML= "Status: detecting objects";
    input=document.getElementById("input").value;
}

function modeLoaded(){
    console.log("Model is Loaded");
    status=true;
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status!=""){
        objectDetector.detect(video, gotResult);
    
        for(i=0; i < objects.length; i++){

            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("black");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==input){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=input+"Found";

                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(input+"Found");
                synth.speak(utterThis);

            }
            else{
                document.getElementById("status").innerHTML=input+"Not found";
            }
        }
    }
}

function gotResult(error,result){
if(error){
    console.log(error);
}
console.log(result);
objects=result;
}