const game = (() => {
    const size = 3;

    // Stores and manages the grid, 
    // also takes care of its display
    const grid = (() => {
        // 2D array storing values (X, O or empty)
        let positions;

        const display = (() => {
            const spaces = [];

            const containter = document.querySelector("#game-container");


            const update = function(row, col) {
                spaces[row][col].textContent = positions[row][col];
            };

            const initialize = function() {
                for (row in positions) {
                    const spacesRow = [];

                    const rowDiv = document.createElement("div");
                    rowDiv.classList.add("row");

                    for (col in positions) {
                        const spaceButton = document.createElement("button");
                        spaceButton.classList.add("space-button");
                        spaceButton.textContent = positions[row][col];
                        spaceButton.addEventListener("click", () => {
                            // HERE GOES BUTTON ACTION
                        });
                        rowDiv.appendChild(spaceButton);

                        spacesRow.push(spaceButton);
                    }

                    containter.appendChild(rowDiv);

                    spaces.push(spacesRow);
                }
            };

            return {
                update,
                initialize,
            };
        })();

        const initializeGrid = function() {
        // Declare 'size' by 'size' array filled with empty space
            positions = Array.from({ length: size }, () => Array(size).fill(" "));
            display.initialize();
        };

        const setPositionTo = function(row, col, player) {
            positions[row][col] = player;
            display.update(row, col);
        };

        const checkForVictoryOf = function(player) {
            // Check diagonals
            let victory = true;
            for (i in positions) {
                if (positions[i][i] != player) {
                    victory = false;
                    break;
                }
            }
            if (victory) return true;

            // Check rows
            for (row in positions) {
                victory = true;
                for (col in positions) {
                    if (positions[row][col] != player) {
                        victory = false;
                        break;
                    }
                }
                if (victory) return true;
            }

            // Check columns
            for (col in positions) {
                victory = true;
                for (row in positions) {
                    if (positions[row][col] != player) {
                        victory = false;
                        break;
                    }
                }
                if (victory) return true;
            }

            // Nothing found
            return false;
        };

        const logPositions = function() {
            for (row of positions) console.log(row);
        };

        return {
            initializeGrid,
            logPositions,
        };
    })();

    const start = function() {
        grid.initializeGrid();
    };

    const logGrid = function() {
        grid.logPositions();
    };

    return {
        start,
        logGrid,
    };
})();

game.start();
game.logGrid();