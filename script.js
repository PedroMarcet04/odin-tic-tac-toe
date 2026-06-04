const game = (() => {
    const size = 3;

    // Stores and manages the grid, 
    // also takes care of its display
    const grid = (() => {
        // Declare 'size' by 'size' array filled with empty space
        let positions = Array.from({ length: size }, () => Array(size).fill(" "));

        const resetPositions = function() {
            positions = Array.from({ length: size }, () => Array(size).fill(" "));
        };

        const setPositionTo = function(row, col, player) {
            positions[row][col] = player;
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
        }

        const logPositions = function() {
            for (row of positions) console.log(row);
        };

        return {
            resetPositions,
            logPositions,
        }
    })();

    const logGrid = function() {
        grid.logPositions();
    }
})();