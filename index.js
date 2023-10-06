var Cricket = /** @class */ (function () {
    function Cricket(n) {
        this.batsman = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.playerNumber = 0;
        this.balls = 0;
        this.totalscore = 0;
        this.teamNumber = n;
    }
    Cricket.prototype.makeRuns = function () {
        var score = Math.floor(Math.random() * 7);
        this.totalscore += score;
        this.batsman[Math.floor(this.playerNumber)] = score + this.batsman[Math.floor(this.playerNumber)];
        console.log(score, (this.playerNumber + 1).toString(), (this.balls + 1).toString());
        var scoreElement = document.getElementById(this.teamNumber + "-score");
        if (scoreElement)
            scoreElement.innerText = this.totalscore.toString();
        if (score === 0) {
            var wicketElement = document.getElementById(this.teamNumber + (this.playerNumber + 1).toString() + (this.balls + 1).toString());
            if (wicketElement)
                wicketElement.innerText = 'W';
        }
        else {
            var ballElement = document.getElementById(this.teamNumber + (this.playerNumber + 1).toString() + (this.balls + 1).toString());
            if (ballElement)
                ballElement.innerText = score.toString();
        }
        var playerNumberTotalElement = document.getElementById(this.teamNumber + (this.playerNumber + 1).toString() + "7");
        if (playerNumberTotalElement)
            playerNumberTotalElement.innerText = this.batsman[this.playerNumber].toString();
        if (this.balls === 5 || score === 0) {
            this.balls = 0;
            this.playerNumber++;
        }
        else {
            this.balls++;
        }
        if (this.playerNumber === 10) {
            clearInterval(timer);
            var teamButton = document.getElementById(this.teamNumber);
            if (teamButton)
                teamButton.disabled = true;
            var startButton = document.getElementById("start");
            if (startButton)
                startButton.disabled = false;
            if (isMatchStarted === 3) {
                if (startButton)
                    startButton.disabled = true;
                var resultButton = document.getElementById("result");
                if (resultButton)
                    resultButton.disabled = false;
            }
        }
    };
    Cricket.prototype.result = function (team1, team2) {
        var resultArea = document.getElementById("resultArea");
        if (resultArea) {
            resultArea.innerText = (team1.totalscore > team2.totalscore ? "Team 1 " : "Team 2 ") + "wins by " + Math.abs(team1.totalscore - team2.totalscore) + ".";
        }
        var startButton = document.getElementById("start");
        if (startButton)
            startButton.innerText = "RESTART";
        var resultButton = document.getElementById("result");
        if (resultButton)
            resultButton.disabled = true;
        isMatchStarted = 1;
        beginGame();
    };
    return Cricket;
}());
var team1;
var team2;
var isMatchStarted = 1;
var timer;
function restart() {
    createScoreGrid("team1-table", 1);
    createScoreGrid("team2-table", 2);
    var team1scoreElement = document.getElementById("team1-score");
    if (team1scoreElement)
        team1scoreElement.innerText = '0';
    var team2scoreElement = document.getElementById("team2-score");
    if (team2scoreElement)
        team2scoreElement.innerText = '0';
    var resultArea = document.getElementById("resultArea");
    if (resultArea)
        resultArea.innerText = "";
    var startButton = document.getElementById("start");
    if (startButton) {
        startButton.onclick = beginGame;
        startButton.innerText = "START";
    }
    isMatchStarted = 1;
    beginGame();
}
function gameTimeIncrement() {
    var timeComponent = document.getElementById("timer");
    if (timeComponent)
        timeComponent.innerText = (+timeComponent.innerText - 1).toString();
}
function startGameTime() {
    clearInterval(timer);
    var timeComponent = document.getElementById("timer");
    if (timeComponent)
        timeComponent.innerText = '60';
    var team1Button = document.getElementById("team1");
    var team2Button = document.getElementById("team2");
    if (team1Button)
        team1Button.disabled = true;
    if (team2Button)
        team2Button.disabled = true;
    var startButton = document.getElementById("start");
    if (startButton)
        startButton.disabled = false;
    if (isMatchStarted === 3) {
        if (startButton)
            startButton.disabled = true;
        var resultButton = document.getElementById("result");
        if (resultButton)
            resultButton.disabled = false;
    }
}
function beginGame() {
    if (isMatchStarted === 1) {
        team1 = new Cricket("team1");
        var timeComponent = document.getElementById("timer");
        if (timeComponent)
            timeComponent.innerText = '60';
        var team1Button = document.getElementById("team1");
        if (team1Button)
            team1Button.disabled = false;
        var startButton = document.getElementById("start");
        if (startButton)
            startButton.disabled = true;
        timer = setInterval(gameTimeIncrement, 1000);
        setTimeout(function () { return startGameTime(); }, 60000);
        isMatchStarted = 2;
    }
    else if (isMatchStarted === 2) {
        team2 = new Cricket("team2");
        var timeComponent = document.getElementById("timer");
        if (timeComponent)
            timeComponent.innerText = '60';
        var team1Button = document.getElementById("team1");
        var team2Button = document.getElementById("team2");
        if (team1Button)
            team1Button.disabled = true;
        if (team2Button)
            team2Button.disabled = false;
        var startButton = document.getElementById("start");
        if (startButton)
            startButton.disabled = true;
        timer = setInterval(gameTimeIncrement, 1000);
        setTimeout(function () { return startGameTime(); }, 60000);
        isMatchStarted = 3;
    }
}
renderHTML();
createScoreGrid("team1-table", 1);
createScoreGrid("team2-table", 2);
function createScoreGrid(node, n) {
    var div = document.getElementById(node);
    if (div) {
        var table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-bordered");
        table.classList.add("table-sm");
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        for (var i = 0; i <= 7; i++) {
            var th = document.createElement("th");
            if (i === 0) {
                th.innerText = "Team " + n;
            }
            else if (i === 7) {
                th.innerText = "Total";
            }
            else {
                th.innerText = i.toString();
            }
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);
        var tbody_1 = document.createElement("tbody");
        function addRow(n) {
            var tr = document.createElement("tr");
            for (var i = 0; i <= 7; i++) {
                var tx = void 0;
                if (i === 0)
                    tx = document.createElement("th");
                else
                    tx = document.createElement("td");
                if (i === 0)
                    tx.innerText = "Player " + n;
                else
                    tx.setAttribute("id", (node === "team1-table" ? "team1" : "team2") + n.toString() + i.toString());
                tr.appendChild(tx);
            }
            tbody_1.appendChild(tr);
        }
        for (var i = 1; i <= 10; i++) {
            addRow(i);
        }
        table.appendChild(tbody_1);
        div.innerHTML = '';
        div.appendChild(table);
    }
}
function renderHTML() {
    var container = document.getElementById("root");
    if (container) {
        container.innerHTML = "";
        container.className = "container text-center";
        var row1 = document.createElement("div");
        row1.className = "row";
        var col = document.createElement('div');
        col.className = 'col-4';
        var p = document.createElement('p');
        p.innerText = "TEAM 1 SCORE";
        col.appendChild(p);
        var h2 = document.createElement('h2');
        h2.innerText = '0';
        h2.setAttribute('id', 'team1-score');
        col.appendChild(h2);
        var button = document.createElement('button');
        button.disabled = true;
        button.setAttribute('id', 'team1');
        button.className = 'btn btn-primary';
        button.setAttribute("onclick", "team1.makeRuns()");
        button.innerText = "HIT";
        col.appendChild(button);
        row1.appendChild(col);
        col = document.createElement('div');
        col.className = 'col-4';
        p = document.createElement('p');
        p.innerText = "TIMER";
        col.appendChild(p);
        h2 = document.createElement('h1');
        h2.innerText = '60';
        h2.setAttribute('id', 'timer');
        col.appendChild(h2);
        button = document.createElement('button');
        button.setAttribute('id', 'start');
        button.className = 'btn btn-primary';
        button.onclick = beginGame;
        button.innerText = "START";
        col.appendChild(button);
        row1.appendChild(col);
        col = document.createElement('div');
        col.className = 'col-4';
        p = document.createElement('p');
        p.innerText = "TEAM 2 SCORE";
        col.appendChild(p);
        h2 = document.createElement('h2');
        h2.innerText = '0';
        h2.setAttribute('id', 'team2-score');
        col.appendChild(h2);
        button = document.createElement('button');
        button.disabled = true;
        button.setAttribute('id', 'team2');
        button.className = 'btn btn-primary';
        button.setAttribute("onclick", "team2.makeRuns()");
        button.innerText = "HIT";
        col.appendChild(button);
        row1.appendChild(col);
        container.appendChild(row1);
        var row2 = document.createElement('div');
        row2.className = "row";
        col = document.createElement('div');
        col.className = 'col-12 mt-3';
        button = document.createElement('button');
        button.disabled = true;
        button.setAttribute('id', 'result');
        button.className = 'btn btn-primary';
        button.setAttribute("onclick", "team1.result(team1, team2)");
        button.innerText = "GENERATE RESULT";
        col.appendChild(button);
        row2.appendChild(col);
        container.appendChild(row2);
        var row3 = document.createElement('div');
        row3.className = "row";
        col = document.createElement('div');
        col.className = 'col-12 mt-3';
        h2 = document.createElement('h2');
        h2.setAttribute('id', 'resultArea');
        col.appendChild(h2);
        row3.appendChild(col);
        container.appendChild(row3);
        var row4 = document.createElement('div');
        row4.className = "row";
        col = document.createElement('div');
        col.className = 'col-md-6';
        col.setAttribute('id', 'team1-table');
        row4.appendChild(col);
        col = document.createElement('div');
        col.className = 'col-md-6';
        col.setAttribute('id', 'team2-table');
        row4.appendChild(col);
        container.appendChild(row4);
    }
}
