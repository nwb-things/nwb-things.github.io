
const calcBtn = document.getElementById("calcbtn");
calcBtn.addEventListener('click',doSpace);
calcBtn.disabled = true;
const clrBtn = document.getElementById("clrbtn");
clrBtn.addEventListener('click',clrStuff);

const chnlmin = document.getElementById("chminus");
chnlmin.addEventListener('mousedown',btnDwn);
chnlmin.addEventListener('mouseup',btnUp);
chnlmin.addEventListener('click',btnClk);
const chnlplus = document.getElementById("chplus");
chnlplus.addEventListener('mousedown',btnDwn);
chnlplus.addEventListener('mouseup',btnUp);
chnlplus.addEventListener('click',btnClk);
const minminus = document.getElementById("minminus");
minminus.addEventListener('mousedown',btnDwn);
minminus.addEventListener('mouseup',btnUp);
minminus.addEventListener('click',btnClk);
const minplus = document.getElementById("minplus");
minplus.addEventListener('mousedown',btnDwn);
minplus.addEventListener('mouseup',btnUp);
minplus.addEventListener('click',btnClk);

let lowerread = document.getElementById("lowerread");
let numtrx = document.getElementById("numtrx");
let nummin = document.getElementById("nummin");

let indata = [0,0,1,1];

let theResult = document.getElementById('theresult');

function doSpace() {
    const smprate = 1000 * indata[0];
    const minsecs = indata[3] * 60;
    const bytesmin = (indata[1] * smprate * indata[2] * minsecs) / 8;
    const mbsmin = bytesmin / 1048576;
    theResult.innerHTML = (mbsmin > 0) ? mbsmin.toFixed(1) + " MB" : "";
}

function clrStuff() {
    indata = [0,0,1,1];
    theResult.innerHTML = "&nbsp;";
    checkList(0,0);
    checkList(1,0);
    numtrx.innerHTML = "1";
    nummin.innerHTML = "1";
    doclk = true;
    if (numtrx.classList.contains("ylwnum")) {
        numtrx.classList.remove("ylwnum");
    }
    if (nummin.classList.contains("ylwnum")) {
        nummin.classList.remove("ylwnum");
    }
    calcBtn.disabled = true;
}

//par1 is the list, par2 is the item value
function menuSel(par1,par2) { //called in html
    if (par1 == 0) { //is sample rate choice
        indata[0] =  Number(par2);
    }
    else if (par1 == 1) { //is bit depth choice
        indata[1] = Number(par2);
    }
    checkList(par1,par2);

}

let btn_id;
let doclk = true;
function doTimer() {
    //only calls code after and on time interval set in btnAC
    if (doclk == true) {
        doclk = false;
    }
    if (doclk == false) {
        setChlMins(btn_id);
    }
}

function btnDwn() { //mouse down
    btn_id = event.target.id; //sets for either click or hold
    thetimer = setInterval(doTimer,400);
    ylwIncNums(btn_id); //makes num below button yellow
}

function btnUp() { //mouse up
    clearInterval(thetimer);
    //10ms delay prevents mouseup and click from flam trigger artifacts
    setTimeout(function(){doclk = true;}, 10);
}

function btnClk() {
    // btn_id is set with mousedown event above
    if (doclk == true) {
        setChlMins(btn_id);
    }
}

function setChlMins(the_id) {
    let nusum;
    switch (the_id) {
        case "chminus":
            nusum = ((indata[2] - 1) > 1) ? indata[2] - 1 : 1;
            indata[2] = nusum;
            numtrx.innerHTML = nusum.toString();
            break;
        case "chplus":
            nusum = ((indata[2] + 1) > 1) ? indata[2] + 1 : 1;
            indata[2] = nusum;
            numtrx.innerHTML = nusum.toString();
            break;
        case "minminus":
            nusum = ((indata[3] - 1) > 1) ? indata[3] - 1 : 1;
            indata[3] = nusum;
            nummin.innerHTML = nusum.toString();
            break;
        case "minplus":
            nusum = ((indata[3] + 1) > 1) ? indata[3] + 1 : 1;
            indata[3] = nusum;
            nummin.innerHTML = nusum.toString();
            break;
        default: break;
    }
}
//par1 is the list, par2 is the item value
function checkList(par1,par2) { //only handles the highlighting visual
    const idpref = (par1 == 0) ? "f" : "d"; //0 is freq menu and 1 is bit depth menu
    const theid = idpref + Math.floor(par2).toString(); //because decimal in id was avoided
    const togid = document.getElementById(theid);
    const dropclass = (par1 == 0) ? "items0" : "items1";
    var dropdowns = document.getElementsByClassName(dropclass);
    for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('dropselected')) {
            openDropdown.classList.remove('dropselected');
        }
    }
    // 0 is called from clear all so don't add if so
    if (par2 > 0) {togid.classList.add("dropselected");}

    if ((indata[0] > 0) && (indata[1] > 0)) {
        calcBtn.disabled = false;
        ylwIncNums(theid); //sends id to change color of chn and trx count
    }
}

function ylwIncNums(theid) {
    if (theid == "chminus"  || theid == "chplus") {
        numtrx.classList.add("ylwnum");
    }
    else if (theid == "minplus" || theid == "minminus") {
        nummin.classList.add("ylwnum");
    }
    else { //was called from both pulldowns being selected
        numtrx.classList.add("ylwnum");
        nummin.classList.add("ylwnum");
    }
}

 

