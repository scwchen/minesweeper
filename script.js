const app = {};

// Beginner 10 -> 9x9
// Intermediate 40 -> 16x16
// Expert 99 -> 30x16
app.grid = document.querySelector('.playgrid');
app.difficulty = 'beginner';

app.gameInfo =

{
    beginner: {
        width: 9,
        height: 9,
        mines: 10,
    },
    intermediate: {
        width: 16,
        height: 16,
        mines: 40,
    },
    expert: {
        width: 30,
        height: 16,
        mines: 99,
    }
};




app.setDifficulty = () => {
    const r = document.querySelector(':root');
    const gameType = app.gameInfo[app.difficulty];
    const { width, height, mines } = gameType;

    r.style.setProperty('--grid-width', width);
    r.style.setProperty('--grid-height', height);

    app.makeGrid(width, height);
    app.setMines(mines);
}

app.setMines = (mines) => {
    const squares = [...document.querySelectorAll('.playsquare')];

    for (let i = 0; i < mines; i++) {
        // number between 0 and 80 for the indices of the nodelist
        const newIndex = Math.floor(Math.random() * squares.length);
        squares[newIndex].classList.add('mine');
        squares.splice(newIndex, 1);
    }

}

app.makeGrid = (gridWidth, gridHeight) => {


    for (let i = 1; i <= (gridWidth * gridHeight); i++) {
        const square = document.createElement('button');
        square.classList.add('playsquare');
        app.grid.append(square);
    }
}



app.init = () => {
    app.setDifficulty();
};

app.init();
