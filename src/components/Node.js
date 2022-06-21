import React from "react";

const Node = ({ text, isStart, isEnd, isWall, col, row }) => {
    const classes = isStart
        ? "node-start"
        : isEnd
        ? "node-end"
        : isWall
        ? "node-wall"
        : "";
    return (
        <div
            className={`w-10 h-10 border-neutral-900 border-solid border-[1px]  ${classes}`}
            id={`node-${col}-${row}`}
        >
            <div>
                <p>{col}</p>
            </div>
        </div>
    );
};

export default Node;
