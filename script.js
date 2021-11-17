const app = {};

app.grid = document.querySelector('.playgrid');
app.difficulty = 'beginner';

app.squareInfo = [];
app.width = 0;
app.height = 0;
app.seconds = 0;
app.start = false;
app.timerInterval = setInterval(() => {
    app.setTimer();
}, 1000);

app.init = () => {

    app.setDifficulty();
    app.handleSquareClick();

};

app.gameInfo =
{
    beginner: {
        width: 9,
        height: 9,
        numMines: 10,
    },
    intermediate: {
        width: 16,
        height: 16,
        numMines: 40,
    },
    expert: {
        width: 30,
        height: 16,
        numMines: 99,
    }
};

app.setDifficulty = () => {
    const r = document.querySelector(':root');
    const gameType = app.gameInfo[app.difficulty];
    const { width, height, numMines } = gameType;
    app.width = width;
    app.height = height;

    r.style.setProperty('--grid-width', app.width);
    r.style.setProperty('--grid-height', app.width);

    app.makeGrid();
    app.setMines(numMines);
    app.setNumbers();
}

app.getRandom = (max) => {
    const newRandom = Math.floor(Math.random() * max);
    const mineArray = app.squareInfo.filter(square => square.mine);

    if (!mineArray.includes(newRandom)) {
        return newRandom;
    } else {
        return app.getRandom(max);
    }
}

app.setMines = (mines) => {
    const squares = document.querySelectorAll('.playsquare');
    const numMines = document.querySelector('.num-mines');

    numMines.innerText = mines.toString().padStart(3, '0');
    for (let i = 0; i < mines; i++) {
        // number between 0 and 80 for the indices of the nodelist
        const newIndex = app.getRandom(squares.length);
        app.squareInfo[newIndex].mine = true;
    }

    app.squareInfo.filter(square => square.mine).map(square => {
        squares[square.id].classList.add('mine');
    });
}

app.makeGrid = () => {

    for (let i = 0; i < (app.width * app.height); i++) {
        const square = document.createElement('button');
        square.classList.add('playsquare');
        square.id = i;
        app.grid.append(square);
        app.squareInfo.push({
            id: i,
            mine: false,
            flag: false,
            number: 0,
        })
    }


}

app.setNumbers = () => {
    const squares = document.querySelectorAll('.playsquare');
    const mines = app.squareInfo.filter(square => square.mine);

    mines.forEach(square => {
        const mine = square.id;
        const left = mine - 1;
        const top = mine - app.width;
        const topLeft = top - 1;
        const topRight = top + 1;
        const right = mine + 1;
        const bottom = mine + app.width;
        const bottomLeft = bottom - 1;
        const bottomRight = bottom + 1;

        const maxIndex = app.width * app.height - 1;

        // Can probably clean this up with a function and some ternaries but this works for now
        if (left >= 0 && !app.squareInfo[left].mine && Math.floor(mine / app.width) === Math.floor(left / app.width)) {
            app.squareInfo[left].number += 1;
        }
        if (top >= 0 && !app.squareInfo[top].mine) {
            app.squareInfo[top].number += 1;
        }
        if (right <= maxIndex && !app.squareInfo[right].mine && Math.floor(mine / app.width) === Math.floor(right / app.width)) {
            app.squareInfo[right].number += 1;
        }
        if (bottom <= maxIndex && !app.squareInfo[bottom].mine) {
            app.squareInfo[bottom].number += 1;
        }
        if (topLeft >= 0 && !app.squareInfo[topLeft].mine && Math.floor(mine / app.width) === Math.floor(topLeft / app.width) + 1) {
            app.squareInfo[topLeft].number += 1;
        }
        if (topRight >= 0 && !app.squareInfo[topRight].mine && Math.floor(mine / app.width) === Math.floor(topRight / app.width) + 1) {
            app.squareInfo[topRight].number += 1;
        }
        if (bottomRight <= maxIndex && !app.squareInfo[bottomRight].mine && Math.floor(mine / app.width) === Math.floor(bottomRight / app.width) - 1) {
            app.squareInfo[bottomRight].number += 1;
        }
        if (bottomLeft <= maxIndex && !app.squareInfo[bottomLeft].mine && Math.floor(mine / app.width) === Math.floor(bottomLeft / app.width) - 1) {
            app.squareInfo[bottomLeft].number += 1;
        }

    });

    app.squareInfo.forEach((square) => {
        const changeSquare = squares[square.id];
        if (square.number > 0) {
            changeSquare.innerText = `${square.number}`;
            switch (square.number) {
                case 1: changeSquare.style.color = 'blue';
                    break;
                case 2: changeSquare.style.color = 'green';
                    break;
                case 3: changeSquare.style.color = 'red';
                    break;
                case 4: changeSquare.style.color = 'purple';
                    break;
                case 5: changeSquare.style.color = 'black';
                    break;
                case 6: changeSquare.style.color = 'grey';
                    break;
                case 7: changeSquare.style.color = 'maroon';
                    break;
                case 8: changeSquare.style.color = 'turquoise';
                    break;
            }
        }

    })

}

app.handleReset = () => {
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
        console.log('reset');
        app.squareInfo = [];
        app.width = 0;
        app.height = 0;
        app.seconds = 0;

        app.init();
    })
}
app.handleSquareClick = () => {

    const grid = document.querySelector('.playgrid');
    const squares = document.querySelectorAll('.playsquare');

    grid.addEventListener('contextmenu', e => e.preventDefault());

    squares.forEach(square => {
        square.addEventListener('contextmenu', (e) => {
            app.squareInfo[e.target.id].flag = true;
            square.classList.toggle('flag');
        });
        square.addEventListener('click', (e) => {
            // app.showSquare(e.target.id);
            // app.start = !app.start;
        });
    })
};

app.setTimer = () => {
    const timer = document.querySelector('.timer');
    if (app.seconds >= 999) {
        clearInterval(app.timerInterval);
    } else if (app.start) {
        app.seconds += 1;
        timer.innerText = app.seconds.toString().padStart(3, '0');
    }
}
// app.showSquare = (square) => {
//     const squares = document.querySelectorAll('.playsquare');

// }




app.init();
