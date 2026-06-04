(() => {
    const resizeForm = document.querySelector("#resize-game-form");
    resizeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(resizeForm);
        
        const data = Object.fromEntries(formData.entries());

        const size = data["size"];

        game.start(size);
    })
})();


const game = (() => {
    let size = 3;

    const players = ["X", "O"];
    let currentTurn = -1;

    // Stores and manages the grid, 
    // also takes care of its display
    const grid = (() => {
        // 2D array storing values (X, O or empty)
        let positions;

        const display = (() => {
            const spaces = [];

            const container = document.querySelector("#game-container");


            const update = function(row, col) {
                spaces[row][col].textContent = positions[row][col];
            };

            const initialize = function() {
                container.innerHTML = "";
                for (let row = 0; row < positions.length; row++) {
                    const spacesRow = [];

                    const rowDiv = document.createElement("div");
                    rowDiv.classList.add("row");

                    for (let col = 0; col < positions[row].length; col++) {
                        const spaceButton = document.createElement("button");
                        spaceButton.classList.add("space-button");
                        spaceButton.textContent = positions[row][col];
                        spaceButton.addEventListener("click", () => {
                            // console.log({row, col});
                            takeTurn(row, col);
                        });
                        rowDiv.appendChild(spaceButton);

                        spacesRow.push(spaceButton);
                    }

                    container.appendChild(rowDiv);

                    spaces.push(spacesRow);
                }
            };

            return {
                update,
                initialize,
            };
        })();

        const initializeGrid = function() {
            // console.log(size);
            positions = [];
            for (let i = 0; i < size; i++) {
                // console.log("Adding row");
                positions.push([]);
                for (let j = 0; j < size; j++) {
                    // console.log("Adding element");
                    positions[i].push(null);
                }
            }
            // console.log(positions);
            display.initialize();
        };

        const setPositionTo = function(row, col, player) {
            if (positions[row][col] == null) {
                // console.log({row, col, player});
                positions[row][col] = player;
                display.update(row, col);
                return true;
            } else {
                return false;
            }
        };

        const checkForVictoryOf = function(player) {
            // Check diagonals
            let victory = true;
            for (let i = 0; i < positions.length; i++) {
                if (positions[i][i] != player) {
                    victory = false;
                    break;
                }
            }
            if (victory) return true;

            // Check rows
            for (row of positions) {
                victory = true;
                for (space of row) {
                    if (space != player) {
                        victory = false;
                        break;
                    }
                }
                if (victory) return true;
            }

            // Check columns
            for (let col = 0; col < positions.length; col++) {
                victory = true;
                for (let row = 0; row < positions[col].length; row++) {
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
            setPositionTo,
            checkForVictoryOf,
            logPositions,
        };
    })();

    const start = function(s=3) {
        size = s;
        currentTurn = 0;
        // console.log(size);
        grid.initializeGrid();
    };

    // Returns true
    const end = function(reason) {
        currentTurn = -1;
        console.log(reason);
    }

    // Returns true if game over
    const takeTurn = function(row, col) {
        const currentPlayer = players[currentTurn%players.length];
        if (currentTurn != -1 && grid.setPositionTo(row, col, currentPlayer)) {
            if (grid.checkForVictoryOf(currentPlayer)) {
                return end(`Player ${currentPlayer} won!`);
            } else {
                currentTurn++;
                if (currentTurn >= size**2) return end(`No more moves!`);
                return false;
            }
        }
    }

    const logGrid = function() {
        grid.logPositions();
    };

    return {
        start,
        logGrid,
    };
})();

game.start(3);