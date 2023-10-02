//1.deposit some money
//determine number of line to bet on
//2 collect a bet amount
//spin
//check if they won
//give the winning
//play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const Symbol_count = {

    a: 10,
    b: 10,
    c: 10,
    d: 10,

};
const symbol_values = {
    a: 5,
    b: 4,
    c: 3,
    d: 2,

};












const deposits = () => {
    while (true) {
        const amounts = prompt("Enter a deposit amount ");
        const moneytodeposit = parseFloat(amounts);
        if (isNaN(moneytodeposit) || moneytodeposit <= 0) {
            console.log("invalid amount, try again.");

        } else {
            return moneytodeposit;
        }
    }
};

const getNumberofLine = () => {
    while (true) {
        const lines = prompt("enter the amount of lines you wanna bet 1-3    :");
        const numberoflines = parseFloat(lines);
        if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3) {
            console.log("choose the correct betting line:   ");

        }
        else {
            return numberoflines;
        }
    }




};

const getbet = (moneytodeposit, numberoflines) => {
    while (true) {
        const bets = prompt("enter the  bet per line   :");
        const totalbet = parseFloat(bets);
        if (isNaN(totalbet) || totalbet <= 0 || totalbet > moneytodeposit/ numberoflines) {
            console.log("invalid bet , try again   :")
        }
        else {
            return totalbet
        }
    }

};
const spin = () => {
    const symbols = [];

    for (let [symbol, count] of Object.entries(Symbol_count)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }


    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        let reelsymbol= [...symbols];

        for (let j=0; j<ROWS;j++){
            let randomindex=Math.floor (Math.random()*reelsymbol.length);
            selectedsymbol=reelsymbol[randomindex]
            reels[i].push(selectedsymbol);
            reelsymbol.splice(randomindex,1);

        }
        // reels.push([]);
        // let reelssymbol = [...symbols];
        // //the copy of the array
        // for (let j = 0; j < ROWS; j++) {
        //     //random generate a number between 0-1
        //     let randomindex = Math.floor(Math.random() * reelssymbol.length);
        //     let selectedsymbol = reelssymbol[randomindex];
        //     reels[i].push(selectedsymbol);
        //     //splice to remove element from the arrAy, the first(index where to start deleting ,how many elements to delete)
        //     reelssymbol.splice(randomindex, 1);

        // }
    }



    return (reels);

};


const transposes = (reels) => {
    const transponse_arr = [];

    for (let i = 0; i < ROWS; i++) {
        transponse_arr.push([]);



        // transponse_arr.push([]);
        // transponse_arr.push([]);



        for (let j = 0; j < COLS; j++) {
            transponse_arr[i].push(reels[j][i]);

        }




    }
    return (transponse_arr);
};


const printreel = (transponse_arr) => {

    for (const line of transponse_arr) {
        let strings = "";
        for (const [i, values] of line.entries()) {
            strings += values;
            if (i != line.length - 1) {
                strings += " | ";



            }



        }
        console.log(strings);
    }



};

//  check if the user win
const wincheck = (transponse_arr, totalbet, numberoflines) => {
    let winnings = 0;

    for (let row = 0; row < numberoflines; row++) {
        const mysymbol = transponse_arr[row];
        let allsame = true;
        for (const symbol of mysymbol) {
            if (symbol != mysymbol[0]) {
                allsame = false;
                break;
            }

        }
        if (allsame) {
            winnings += totalbet * symbol_values[mysymbol[0]]
        }

    }
    return winnings;

}



















let balance = deposits();
const numberoflines = getNumberofLine();
const totalbet = getbet(balance, numberoflines);
const reels = spin();
const transponse_arr = transposes(reels);
printreel(transponse_arr);
const winnings = wincheck(transponse_arr, totalbet, numberoflines);

console.log('you won, $  ' + winnings.toString());



