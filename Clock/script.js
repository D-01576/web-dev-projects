let time = document.getElementById("time");

gettime()
function gettime(){
    let currenttime = new Date();
    let hours = currenttime.getHours();
    let minutes = currenttime.getMinutes();
    let seconds = currenttime.getSeconds();
    let nowtime = hours + " :" + minutes + " :" + seconds;
    time.textContent = nowtime;
    setTimeout(function(){gettime()}, 1000);
}
