c1 = setInterval(cnt1, 300);
up1 = 0;

function cnt1(){
    let a = document.getElementById("count1").innerHTML = ++up1;

    if(up1 === 2){
        clearInterval(c1);
    }
}

c2 = setInterval(cnt2, 200);
up2 = 0;

function cnt2(){
    let b = document.getElementById("count2").innerHTML = ++up2;

    if(up2 === 3){
        clearInterval(c2);
    }
}

c3 = setInterval(cnt3, 8);
up3 = 0;

function cnt3(){
    let c = document.getElementById("count3").innerHTML = ++up3;

    if(up3 === 92){
        clearInterval(c3);
    }
}

c4 = setInterval(cnt4, 90);
up4 = 0;

function cnt4(){
    let d = document.getElementById("count4").innerHTML = ++up4;

    if(up4 === 10){
        clearInterval(c4);
    }
}

c5 = setInterval(cnt5, 30);
up5 = 0;

function cnt5(){
    let e = document.getElementById("count5").innerHTML = ++up5;

    if(up5 === 30){
        clearInterval(c5);
    }
}

c6 = setInterval(cnt6);
up6 = 0;

function cnt6(){
    let f = document.getElementById("count6").innerHTML = ++up6;

    if(up6 === 109){
        clearInterval(c6);
    }
}