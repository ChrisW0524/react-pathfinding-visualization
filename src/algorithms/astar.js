import { h_manhattan } from "./heuristics";

function Astar(startNode, endNode) {
    let openSet = [];
    let closedSet = [];
    let path = [];
    let visitedNodes = [];

    openSet.push(startNode);
    while (openSet.length > 0) {
        let leastIndex = 0;

        //find index of node in openset with lowest f cost
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[leastIndex].f) {
                leastIndex = i;
            }
        }

        let current = openSet[leastIndex];
        visitedNodes.push(current);
        if (current === endNode) {
            let temp = current;
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            return { path, visitedNodes };
        }

        //remove current node from open set
        openSet = openSet.filter((element) => element !== current);
        //add current node to closedSet
        closedSet.push(current);

        //check neighboirs
        let neighbours = current.neighbours;
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];
            //check if current neighbour has already beenm visited
            if (!closedSet.includes(neighbour) && !neighbour.isWall) {
                let tempG = current.g + 1;
                let newPath = false;
                if (openSet.includes(neighbour)) {
                    if (tempG < neighbour.g) {
                        neighbour.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbour.g = tempG;
                    newPath = true;
                    openSet.push(neighbour);
                }

                if (newPath) {
                    neighbour.h = h_manhattan(neighbour, endNode);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
            }
        }
    }

    return { path, visitedNodes, error: "No Path found!" };
}

export default Astar;
