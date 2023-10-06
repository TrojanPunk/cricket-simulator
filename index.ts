class Cricket {
    private batsman: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    private playerNumber: number = 0;
    private balls: number = 0;
    private totalscore: number = 0;
    private teamNumber: string;
  
    constructor(n: string) {
      this.teamNumber = n;
    }
  
    public makeRuns(): void {
      const score: number = Math.floor(Math.random() * 7);

      this.totalscore += score;
      this.batsman[Math.floor(this.playerNumber)] = score + this.batsman[Math.floor(this.playerNumber)];
      console.log(score, (this.playerNumber + 1).toString(), (this.balls + 1).toString());

      const scoreElement = document.getElementById(this.teamNumber + "-score");

      if (scoreElement) scoreElement.innerText = this.totalscore.toString();

      if (score === 0) {
        const wicketElement = document.getElementById(this.teamNumber + (this.playerNumber + 1).toString() + (this.balls + 1).toString());

        if (wicketElement) {
          wicketElement.innerText = 'W';
        }
      } 
      
      else {
        const ballElement = document.getElementById(this.teamNumber + (this.playerNumber + 1).toString() + (this.balls + 1).toString());
        if (ballElement) ballElement.innerText = score.toString();
      }

      const playerNumberTotalElement = document.getElementById(this.teamNumber + (this.playerNumber + 1).toString() + "7");
      if (playerNumberTotalElement) playerNumberTotalElement.innerText = this.batsman[this.playerNumber].toString();
  
      if (this.balls === 5 || score === 0) {
        this.balls = 0;
        this.playerNumber++;
      } 
      
      else {
        this.balls++;
      }
  
      if (this.playerNumber === 10) {
        clearInterval(timer);
        const teamButton = document.getElementById(this.teamNumber) as HTMLButtonElement;
        
        if (teamButton) teamButton.disabled = true;
        const startButton = document.getElementById("start") as HTMLButtonElement;
        
        if (startButton) startButton.disabled = false;

        if (isMatchStarted === 3) {
          if (startButton) startButton.disabled = true;
          const resultButton = document.getElementById("result") as HTMLButtonElement;

          if (resultButton) resultButton.disabled = false;
        }
      }
    }
  
    public result(team1: Cricket, team2: Cricket): void {
      const resultArea = document.getElementById("resultArea");
      
      if (resultArea) {
        resultArea.innerText = (team1.totalscore > team2.totalscore ? "Team 1 " : "Team 2 ") + "wins by " + Math.abs(team1.totalscore - team2.totalscore) + ".";
      }
      const startButton = document.getElementById("start");
      
      if (startButton) startButton.innerText = "RESTART";
      const resultButton = document.getElementById("result") as HTMLButtonElement;
      
      if (resultButton) resultButton.disabled = true;
      isMatchStarted = 1;
      beginGame();
    }
  }
  
  let team1: Cricket;
  let team2: Cricket;
  let isMatchStarted: number = 1;
  let timer: number;
  
  function restart(): void {
    createScoreGrid("team1-table", 1);
    createScoreGrid("team2-table", 2);
    const team1scoreElement = document.getElementById("team1-score");

    if (team1scoreElement) team1scoreElement.innerText = '0';
    const team2scoreElement = document.getElementById("team2-score");

    if (team2scoreElement) team2scoreElement.innerText = '0';
    const resultArea = document.getElementById("resultArea");

    if (resultArea) resultArea.innerText = "";
    const startButton = document.getElementById("start");

    if (startButton) {
      startButton.onclick = beginGame;
      startButton.innerText = "START";
    }
    isMatchStarted = 1;
    beginGame();
  }
  
  function gameTimeIncrement(): void {
    const timeComponent = document.getElementById("timer");
    if (timeComponent) timeComponent.innerText = (+timeComponent.innerText - 1).toString();
  }
  
  function startGameTime(): void {
    clearInterval(timer);
    const timeComponent = document.getElementById("timer");

    if (timeComponent) timeComponent.innerText = '60';
    const team1Button = document.getElementById("team1") as HTMLButtonElement;
    const team2Button = document.getElementById("team2") as HTMLButtonElement;

    if (team1Button) team1Button.disabled = true;
    if (team2Button) team2Button.disabled = true;

    const startButton = document.getElementById("start") as HTMLButtonElement;

    if (startButton) startButton.disabled = false;
    
    if (isMatchStarted === 3) {
      if (startButton) startButton.disabled = true;

      const resultButton = document.getElementById("result") as HTMLButtonElement;
      if (resultButton) resultButton.disabled = false;
    }
  }
  
  function beginGame(): void {
    if (isMatchStarted === 1) {
      team1 = new Cricket("team1");
      const timeComponent = document.getElementById("timer");

      if (timeComponent) timeComponent.innerText = '60';

      const team1Button = document.getElementById("team1") as HTMLButtonElement;

      if (team1Button) team1Button.disabled = false;

      const startButton = document.getElementById("start") as HTMLButtonElement;

      if (startButton) startButton.disabled = true;
      timer = setInterval(gameTimeIncrement, 1000);
      setTimeout(() => startGameTime(), 60000);
      isMatchStarted = 2;
    } else if (isMatchStarted === 2) {
      team2 = new Cricket("team2");
      const timeComponent = document.getElementById("timer");

      if (timeComponent) timeComponent.innerText = '60';

      const team1Button = document.getElementById("team1") as HTMLButtonElement;
      const team2Button = document.getElementById("team2") as HTMLButtonElement;
      
      if (team1Button) team1Button.disabled = true;
      if (team2Button) team2Button.disabled = false;
      const startButton = document.getElementById("start") as HTMLButtonElement;
      if (startButton) startButton.disabled = true;
      timer = setInterval(gameTimeIncrement, 1000);
      setTimeout(() => startGameTime(), 60000);
      isMatchStarted = 3;
    }
  }
  
  renderHTML();
  createScoreGrid("team1-table", 1);
  createScoreGrid("team2-table", 2);
  
  function createScoreGrid(node: string, n: number): void {
    const div = document.getElementById(node);
    if (div) {
      const table = document.createElement("table");
      table.classList.add("table");
      table.classList.add("table-bordered");
      table.classList.add("table-sm");

      const thead = document.createElement("thead");
      const tr = document.createElement("tr");

      for (let i = 0; i <= 7; i++) {
        const th = document.createElement("th");
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
      const tbody = document.createElement("tbody");
  
      function addRow(n: number): void {
        const tr = document.createElement("tr");
        for (let i = 0; i <= 7; i++) {
          let tx: HTMLElement;
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
        tbody.appendChild(tr);
      }
  
      for (let i = 1; i <= 10; i++) {
        addRow(i);
      }
      table.appendChild(tbody);
      div.innerHTML = '';
      div.appendChild(table);
    }
  }
  
  function renderHTML(): void {
    const container = document.getElementById("root");
    if (container) {
      container.innerHTML = "";
      container.className = "container text-center";

      let title = document.createElement('p');
      title.innerText = "Cricket 10";
      container.appendChild(title);

      const row1 = document.createElement("div");
      row1.className = "row";

      let col = document.createElement('div');
      col.className = 'col-4';

      let p = document.createElement('p');
      p.innerText = "TEAM 1 SCORE";
      col.appendChild(p);

      let h2 = document.createElement('h2');
      h2.innerText = '0';
      h2.setAttribute('id', 'team1-score');
      col.appendChild(h2);

      let button = document.createElement('button');
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
      const row2 = document.createElement('div');
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
      const row3 = document.createElement('div');

      row3.className = "row";
      col = document.createElement('div');
      col.className = 'col-12 mt-3';

      h2 = document.createElement('h2');
      h2.setAttribute('id', 'resultArea');

      col.appendChild(h2);
      row3.appendChild(col);
      container.appendChild(row3);
      const row4 = document.createElement('div');

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
  