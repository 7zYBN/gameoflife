let n = 100;
let m = 100;
let timerId;
let GridMap = [];
let alive_coordinates = [];
let count_of_neighbours = 0;
let timer_activated = false;
document.getElementById("container").style['grid-template-columns'] = "repeat(" + n + ", 1fr)";
document.getElementById("container").style['grid-template-row'] = "repeat(" + m + ", 1fr)";
for (let i = 0; i < m; i++) {
    GridMap[i] = [];
    for (let j = 0; j < n; j++) {
        let new_div = document.createElement("div");
        let new_span = document.createElement("span");
        /*if (((i === 3) && (j === 3)) || ((i === 4) && (j === 3)) || ((i === 4) && (j === 1)) || ((i === 5) && (j === 2)) || ((i === 5) && (j === 3))) {
        //if (((i === 0) && (j === 1)) || ((i === 1) && (j === 1)) || ((i === 2) && (j === 1))) {
            GridMap[i][j] = 1;
        } else {
            GridMap[i][j] = 0;
        }*/
        GridMap[i][j] = Math.floor(Math.random() * 2);
        document.getElementById("container").insertBefore(new_div, document.getElementById("buttons"));
    }
}
document.getElementById("buttons").style['grid-column'] = "1/" + (GridMap[0].length + 1);

function start_timer() {
    if (!timer_activated) {
        timerId = setTimeout(function run() {
            alive_coordinates_to_array();
            div_color();
            search();
            timerId = setTimeout(run, 500);
        }, 500);
        timer_activated = true;
        console.log("xxxxx")
    }

}

document.getElementById("start_resume_timer").onclick = function() {
    this.setAttribute.disabled = true;
    start_timer();

}

document.getElementById("stop_timer").onclick = function() {
    clearTimeout(timerId);
    document.getElementById("start_resume_timer").innerText = "Resume"
    document.getElementById("start_resume_timer").setAttribute("disabled", "true");
    timer_activated = false;
}

function alive_coordinates_to_array() {
    alive_coordinates.splice(0, alive_coordinates.length)
    for (let i = 0; i < GridMap.length; i++) {
        for (let j = 0; j < GridMap[0].length; j++) {
            if (GridMap[i][j] === 1) {
                alive_coordinates.push([i, j]);
            }
        }
    }
}

function div_color() {

    for (let i = 0; i < GridMap.length; i++) {
        for (let j = 0; j < GridMap[0].length; j++) {
            if (GridMap[i][j] === 1) {
                document.getElementById("container").childNodes[1 + i * GridMap.length + j].style['background'] = "black";
            } else {
                document.getElementById("container").childNodes[1 + i * GridMap.length + j].style['background'] = "white";
            }
        }

    }
}

function search() {
    for (let i = 0; i < GridMap.length; i++) {
        for (let j = 0; j < GridMap[0].length; j++) {
            count_of_neighbours = 0;
            for (let k = 0; k < alive_coordinates.length; k++) {
                //console.log(`i=${i}, j=${j}, [k][0]=${alive_coordinates[k][0]}, [k][1]=${alive_coordinates[k][1]}`)
                if ((i === alive_coordinates[k][0]) && (j === alive_coordinates[k][1])) {

                } else {
                    //console.log(`и i=${i}, и j=${j}, не равны [k][0]=${alive_coordinates[k][0]}, [k][1]=${alive_coordinates[k][1]}`)
                    if (Math.abs(i - alive_coordinates[k][0]) < 2) {
                        if (Math.abs(j - alive_coordinates[k][1]) < 2) {
                            count_of_neighbours++;
                        }
                    }

                }
            }
            if ((GridMap[i][j] === 1) && ((count_of_neighbours < 2) || (count_of_neighbours > 3))) {
                GridMap[i][j] = 0;
            }
            if ((GridMap[i][j] === 0) && (count_of_neighbours === 3)) {
                GridMap[i][j] = 1;
            }
        }
    }
}