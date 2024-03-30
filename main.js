const time = document.getElementById("time");
const input = document.getElementById("forTyping");
const words = document.getElementById("words");
const result = document.getElementById("result");

let totalTime = 60;

const arr = ["got", "found", "head", "take", "all", "really", "find", "such", "want", "song", "what", "song", "so", "many", "take", "too", "and", "find", "tree", "country", "need", "still", "good", "line", "off", "its", "any", "until", "open", "not", "out", "give", "does", "got", "write", "America", "there", "again", "little", "don't", "leave"];
let wordDigit = 0; //? "space" duymesine basdiqda diger soze kecmek ucun istifade olunur, 1-1 artir;
let trueWordDigit = 0; //? BASLANGICDA duzgun yazdigin sozlerin sayini verir;
result.innerText = trueWordDigit; //? BASLANGICDA duzgun yazdigin sozlerin sayini result container'ine yazir;

//? "arr" array'inin p elementleri doldurulmasi ucun;
arr.forEach(el => {
    const p = document.createElement("p"); //? p-leri yaradir, cunki word container'inde coxlu p elementi olmalidir;
    p.textContent = el; //? elementleri (her defe yenisi yaradilan) p'lerin icine deyer kimi yazir;
    words.append(p); //? words container'ine p-leri daxil edir; 
    words.append(" "); //? her p elementinden sonra boslugun qoyulmasi ucun;
});

time.innerText = "1:00"; //? Time container'de baslangicda 1:00 yazilmasi ucun;
input.focus(); //? Baslangicda input'a fokuslanmasi ucun;
localStorage.setItem("key", "exist"); //? Baslangicda localstorage'e (key,exist) cutluyunu daxil edir;
let keyNumber = 0; //?

//? "keyNumber" deyeri 0'dan boyuk olduqda aninda dayanmasi ucun;
let keyNumberInterval = setInterval(() => {
    input.addEventListener('input', function (e) {
        if (!localStorage.getItem("key")) {
            clearInterval(keyNumberInterval);
        }
        if (localStorage.getItem("key")) {
            if (document.activeElement === input) {
                keyNumber++;
            }
        }
    })
}, 100)
//? "keyNumber" deyeri 0'dan boyuk olduqda localstorage'de olan deyeri (key,exist) cutluyunu silmek ucun;
setInterval(() => {
    wordsChildren[wordDigit].style.backgroundColor = "lightgray"
    if (keyNumber > 0) {
        localStorage.removeItem("key")
    }
}, 100)

let wordsChildren = words.children; //? Bu deyer words container'indeki p elementlerini goturur;
//?
input.addEventListener("input", function () {
    if (document.activeElement === input) { //? eger input aktivdirse(fokuslanibsa);
        for (let i = wordDigit; i < wordDigit + 1; i++) {
            if (input.value == arr[wordDigit]) {
                console.log("YES");
            }
        }
        if (localStorage.getItem("key")) {
            let a = setInterval(() => {
                if (totalTime == 60) {
                    time.innerText = "1:00"
                } else if (totalTime >= 10 && totalTime < 60) {
                    time.innerText = `0:${totalTime}`
                } else if (totalTime != 0 && totalTime < 10) {
                    time.innerText = `0:0${totalTime}`
                } else if (totalTime == 0) {
                    time.innerText = `0:00`
                    clearInterval(a);
                    input.disabled = true
                }
                totalTime -= 1;
            }, 1000);
        }
    }
});
//?
document.addEventListener("keypress", function (e) {
    if (e.keyCode == 32) {
        for (let i = wordDigit; i < wordDigit + 1; i++) {
            if (input.value == arr[wordDigit]) { //? eger yazdigin soz ardicil olaraq arr icindeki sozlere beraberdirse;
                trueWordDigit++; //? duzgun yazdigin sozlerin sayini 1 vahid artirir;
                result.innerText = trueWordDigit; //? duzgun yazdigin sozlerin sayini result container'ine yazir;
                wordsChildren[wordDigit].style.color = "green"; //? words container'inde olan sozler space duymesine basildiqda duzgun olduqda yasil rengde yazilir;
            } else {
                wordsChildren[wordDigit].style.color = "red"; //? words container'inde olan sozler space duymesine basildiqda sehv olduqda qirmizi rengde yazilir;
            }
        }
        wordDigit++; //? her defe space duymesine basdiqda "wordDigit" 1 vahid artir;
    }
    console.log(wordDigit);
});
//? Space duymesine basdiqda input.value = "" olur;
document.addEventListener("keyup", function (e) {
    if (e.keyCode == 32) {
        input.value = "";
    }
});
