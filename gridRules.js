function automatonRules(grid) {
    let case0 = "#2210869c";
    let case1 = '#f43';
    for (let i = height - 2; i >= 0; i--) {
        for (let j = 0; j < width; j++) {
            let topleftcolor, toprightcolor, bottomrightcolor, bottomleftcolor;
            let topLeft, topRight, bottomRight, bottomLeft;

            if (isInArray(tetrisColors, grid[i][j])) {
                topLeft = 1;
                topleftcolor = grid[i][j];
            } else if (grid[i][j] == case0) {
                topLeft = 0;
            }
            if (isInArray(tetrisColors, grid[i][j + 1])) {
                topRight = 1;
                toprightcolor = grid[i][j + 1];
            } else if (grid[i][j + 1] == case0) {
                topRight = 0;
            }
            if (isInArray(tetrisColors, grid[i + 1][j + 1])) {
                bottomRight = 1;
                bottomrightcolor = grid[i + 1][j + 1];
            } else if (grid[i + 1][j + 1] == case0) {
                bottomRight = 0;
            }
            if (isInArray(tetrisColors, grid[i + 1][j])) {
                bottomLeft = 1;
                bottomleftcolor = grid[i + 1][j];
            } else if (grid[i + 1][j] == case0) {
                bottomLeft = 0;
            }

            let block = [topLeft, topRight, bottomRight, bottomLeft];
            const patternMapping = {
                "0000": [case0, case0, case0, case0],
                "0010": [case0, case0, bottomrightcolor, case0],
                "0001": [case0, case0, case0, bottomleftcolor],
                "0011": [case0, case0, bottomrightcolor, bottomleftcolor],
                "0100": [case0, case0, toprightcolor, case0],
                "0110": [case0, case0, toprightcolor, bottomrightcolor],
                "0101": [case0, case0, toprightcolor, bottomleftcolor],
                "0111": [case0, toprightcolor, bottomrightcolor, bottomleftcolor],
                "1000": [case0, case0, case0, topleftcolor],
                "1010": [case0, case0, bottomrightcolor, topleftcolor],
                "1001": [case0, case0, bottomleftcolor, topleftcolor],
                "1011": [topleftcolor, case0, bottomrightcolor, bottomleftcolor],
                "1100": [case0, case0, toprightcolor, topleftcolor],
                "1110": [case0, toprightcolor, bottomrightcolor, topleftcolor],
                "1101": [topleftcolor, case0, toprightcolor, bottomleftcolor],
                "1111": [topleftcolor, toprightcolor, bottomrightcolor, bottomleftcolor]
            };
            function updateGrid(block, i, j, grid) {
                const patternKey = block.join("");
                if (patternMapping[patternKey]) {
                    const [topLeft, topRight, bottomRight, bottomLeft] = patternMapping[patternKey];
                    grid[i][j] = topLeft;
                    grid[i][j + 1] = topRight;
                    grid[i + 1][j + 1] = bottomRight;
                    grid[i + 1][j] = bottomLeft;
                }
            }
            updateGrid(block, i, j, grid);
        }
    }
}
