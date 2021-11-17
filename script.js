const app = {};

// Beginner 10 -> 9x9
// Intermediate 40 -> 16x16
// Expert 99 -> 30x16
app.grid = document.querySelector('.playgrid');
app.difficulty = 'beginner';
// will be an array of objects
app.squareInfo = [];
app.width = 0;
app.height = 0;

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
        const right = mine + 1;
        const up = mine - app.width;
        const down = mine + app.width;
        const maxIndex = app.width * app.height - 1;

        // if left of the mine is still on the grid, not on a mine, and on the same line
        if (left >= 0 && !mines.includes(left)) {
            app.squareInfo[left].number += 1;
        }
        if (right <= maxIndex && !mines.includes(right)) {
            app.squareInfo[right].number += 1;
        }
        if (up >= 0 && !mines.includes(up)) {
            app.squareInfo[up].number += 1;
        }
        if (down <= maxIndex && !mines.includes(down)) {
            app.squareInfo[down].number += 1;
        }
    });

    app.squareInfo.forEach((square) => {
        if (square.number > 0) {
            squares[square.id].innerText = `${square.number}`;
        }

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
            app.showSquare(e.target.id);
        });
    })
};

app.showSquare = (square) => {
    const squares = document.querySelectorAll('.playsquare');

}

app.init = () => {
    app.setDifficulty();
    app.handleSquareClick();
};

app.init();
