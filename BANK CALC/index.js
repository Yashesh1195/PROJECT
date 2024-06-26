function main(){
    
    let a = document.getElementById("count1").value;
    let b = document.getElementById("count2").value;
    let c = document.getElementById("count3").value;
    let d = document.getElementById("count4").value;
    let e = document.getElementById("count5").value;
    let f = document.getElementById("count6").value;
    
    let t1 = document.getElementById("amount1").value = a * 500;
    
    let t2 = document.getElementById("amount2").value = b * 200;
    
    let t3 = document.getElementById("amount3").value = c * 100;
    
    let t4 = document.getElementById("amount4").value = d * 50;
    
    let t5 = document.getElementById("amount5").value = e * 20;
    
    let t6 = document.getElementById("amount6").value = f * 10;

    document.getElementById("total_note").innerHTML = a*1+b*1+c*1+d*1+e*1+f*1;
    document.getElementById("total_amt").innerHTML = t1+t2+t3+t4+t5+t6;

}

