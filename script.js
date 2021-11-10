const app = {};

// Beginner 10 -> 9x9
// Intermediate 40 -> 16x16
// Expert 99 -> 30x16
app.grid = document.querySelector('.playgrid');
app.difficulty = 3;
// difficulty
// 1 = easy
// 2 = intermediate
// 3 = expert


app.setDifficulty = () => {
    const r = document.querySelector(':root');

    let gridWidth = 0, gridHeight = 0;

    if (app.difficulty === 1) {
        r.style.setProperty('--grid-width', 9);
        r.style.setProperty('--grid-height', 9);
        gridWidth = 9;
        gridHeight = 9;
    } else if (app.difficulty === 2) {
        r.style.setProperty('--grid-width', 16);
        r.style.setProperty('--grid-height', 16);
        gridWidth = 16;
        gridHeight = 16;

    } else if (app.difficulty === 3) {
        r.style.setProperty('--grid-width', 30);
        r.style.setProperty('--grid-height', 16);
        gridWidth = 30;
        gridHeight = 16;
    }

    app.makeGrid(gridWidth, gridHeight);
}

app.makeGrid = (gridWidth, gridHeight) => {
    for (let i = 1; i < (gridWidth * gridHeight); i++) {
        const square = document.createElement('div');
        square.classList.add('playsquare');
        app.grid.append(square);
    }
}



app.init = () => {
    app.setDifficulty();
};

app.init();
