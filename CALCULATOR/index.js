function main(value){
    document.getElementById("display").value += value;
}

function calc(value){
    let a = document.getElementById("display").value;

    let result;

    try{
        result = eval(a);
        document.getElementById("display").value = result;
    }

    catch(errror){
        result = "ERROR";
        document.getElementById("display").value = result;
        document.getElementById("display").style.backgroundColor = "red";
        document.getElementById("display").style.color = "lightblue";

    }

}

function add_inv(value){
    let b = document.getElementById("display").value;
    let ans;
    if(b>=0){
        ans = (-1)*value;
    }
    else{
        ans = (-1)*value;
    }
    document.getElementById("display").value = ans;
}

function clearInterval(){
    document.getElementById("display").value = "";
}

function del(){
    document.getElementById("display").value = display.value.toString().slice(0,-1);
}