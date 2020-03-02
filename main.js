
function btnAc() {
    const clk_id = event.target.id;
    // console.log('did click ');
    // alert(`you clicked the button ${clk_id}`);
    console.log(`you clicked the button ${clk_id}`);
}

document.getElementById("btn1").addEventListener('click',btnAc);
document.getElementById("btn2").addEventListener('click',btnAc);
document.getElementById("btn3").addEventListener('click',btnAc);