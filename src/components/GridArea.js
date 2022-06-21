import React, { useState, useEffect } from "react";
import Node from "./Node";
import Astar from "../algorithms/astar";

const cols = 20;
const rows = 8;

const NODE_START_COL = 0;
const NODE_START_ROW = 0;
const NODE_END_COL = cols - 1;
const NODE_END_ROW = rows - 1;

const GridArea = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisitedNodes] = useState([]);

    //run before components are rendered
    useEffect(() => {
        initializeGrid();
    }, []);

    const initializeGrid = () => {
        const grid = new Array(cols);

        for (let i = 0; i < cols; i++) {
            grid[i] = new Array(rows);
        }

        createSpots(grid);
        addNodeNeighbours(grid);
        setGrid(grid);

        const startNode = grid[NODE_START_COL][NODE_START_ROW];

        const endNode = grid[NODE_END_COL][NODE_END_ROW];

        let result = Astar(startNode, endNode);
        console.log(result);
        setPath(result.path);
        setVisitedNodes(result.visitedNodes);
        startNode.isWall = false;
        endNode.isWall = false;
    };

    const createSpots = (grid) => {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }
    };

    //Add neighbours for all nodes
    const addNodeNeighbours = (grid) => {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].addNeighbours(grid);
            }
        }
    };

    //Node constructor
    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === NODE_START_COL && this.y === NODE_START_ROW;
        this.isEnd = this.x === NODE_END_COL && this.y === NODE_END_ROW;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.neighbours = [];
        this.isWall = false;
        if(Math.random()<0.2){
            this.isWall = true;
        }
        this.previous = undefined;
        this.addNeighbours = function (grid) {
            let i = this.x;
            let j = this.y;
            if (i > 0) {
                this.neighbours.push(grid[i - 1][j]);
            }
            if (i < cols - 1) {
                this.neighbours.push(grid[i + 1][j]);
            }
            if (j > 0) {
                this.neighbours.push(grid[i][j - 1]);
            }
            if (j < rows - 1) {
                this.neighbours.push(grid[i][j + 1]);
            }
        };
    }

    //Render nodes
    const gridWithNodes = (
        <div className="flex">
            {Grid.map((col, colIndex) => {
                return (
                    <div key={colIndex}>
                        {col.map((row, rowIndex) => {
                            const { isStart, isEnd, isWall } = row;
                            return (
                                <Node
                                    key={rowIndex}
                                    text={`${row.x}, ${row.y}`}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    isWall={isWall}
                                    col={colIndex}
                                    row={rowIndex}
                                ></Node>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );

    const visualizeShortestPath = (shortestPathNodes) => {
        console.log("visualizing shortest");
        for (let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i];
                document
                    .getElementById(`node-${node.x}-${node.y}`)
                    .classList.add("node-shortest-path");
            }, 20 * i);
        }
    };

    const visualizePath = () => {
        for (let i = 0; i <= VisitedNodes.length; i++) {
            //animate shortest path after all visited nodes animated
            if (i === VisitedNodes.length) {
                setTimeout(() => {
                    visualizeShortestPath(Path);
                }, 20 * i);
            } else {
                setTimeout(() => {
                    const node = VisitedNodes[i];
                    document
                        .getElementById(`node-${node.x}-${node.y}`)
                        .classList.add("node-visited");
                }, 10 * i);
            }
        }
    };

    console.log(Grid);
    console.log(Path);
    return (
        <div>
            <h1 className="text-3xl">Grid</h1>
            <button
                onClick={() => {
                    visualizePath();
                }}
            >
                A star visualize
            </button>
            {gridWithNodes}
        </div>
    );
};

export default GridArea;
