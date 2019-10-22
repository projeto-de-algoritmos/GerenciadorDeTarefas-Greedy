let taskDuration = [];
let tableCells = [];

function inicializeArrays(qtdtask) {
  for (let i = 0; i < qtdtask; i++) {
    tableCells[i] = [];
    taskDuration[i] = { duration: 0, startAt: null };
  }
}

//Pega as entradas passadas na index
function getInput() {
  let taskData = window.location.search;
  taskData = taskData.replace("?", "");
  taskData = taskData.split("&");
  let qtdtask = parseInt(taskData[0]);
  let qtdsched = parseInt(taskData[1]);
  return [qtdtask, qtdsched];
}

//Cria a tabela de tarefas
function createTable(qtdtask, qtdsched) {
  let table = document.getElementById("tableTask");
  let row = table.insertRow(0);
  let cell = row.insertCell(0);
  cell.style.backgroundColor = "rgba(25,120,255,1)";
  for (let i = 1; i < qtdsched + 1; i++) {
    let cell = row.insertCell(i);
    cell.style.backgroundColor = "rgba(25,120,255,1)";
    cell.innerHTML = `<strong>${i}ºHorário</strong>`;
  }

  for (let i = 1; i < qtdtask + 1; i++) {
    row = table.insertRow(i);
    for (let j = 0; j < qtdsched + 1; j++) {
      let cell = row.insertCell(j);
      if (j == 0) {
        cell.innerHTML = `<input type="text" placeholder="Tarefa ${i}"></input>`;
        cell.style.backgroundColor = "rgba(25,120,255,1)";
      } else {
     	tableCells[i-1][j-1] = cell;
        cell.style.backgroundColor = "white";
      }
    }
  }
}

//Cria as animações da tabela de tarefas
function animationSetup() {
  //Hover na célula da tabela
  let colorPrev;
  $("td").hover(
    function() {
      let coordx = $(this).parent(); //linha obj
      let coordy = $(this); //coluna obj
      coordx = coordx.index();
      coordy = coordy.index();
      colorPrev = this.style.backgroundColor;
      if (coordx > 0 && coordy > 0) {
        $(this).animate({ "background-color": "yellow" }, 50);
      }
    },
    function() {
      let coordx = $(this).parent();
      let coordy = $(this);
      coordx = coordx.index();
      coordy = coordy.index();
      if (coordx > 0 && coordy > 0) {
        $(this).animate({ "background-color": colorPrev }, 0);
      }
    }
  );

  //Click na célula da tabela
  $("td").click(function() {
    let coordx = $(this).parent();
    let coordy = $(this);
    coordx = coordx.index();
    coordy = coordy.index();

    if (coordx > 0 && coordy > 0) {
      $(this).css("border", "4px solid blue");

      taskDuration[coordx - 1].duration++;
      if (
   		taskDuration[coordx - 1].startAt === undefined ||
        taskDuration[coordx - 1].startAt === null
      ) {
        taskDuration[coordx - 1].startAt = coordy - 1;
      }
      else{
      	if(taskDuration[coordx - 1].startAt > (coordy -1)){
      		taskDuration[coordx - 1].startAt = coordy - 1;
      	}	
      }

      //$(this).css("background-color", "blue");
    }
  });
}

function intervalScheduling() {
  // converter tarefas para formato (s,f)
  const jobs = [];
  for (let i = 0; i < taskDuration.length; i++) {
    if (
      taskDuration[i].startAt === undefined ||
      taskDuration[i].startAt === null
    ) {
      continue;
    }
    const s = taskDuration[i].startAt;
    const f = s + taskDuration[i].duration - 1;
    jobs.push({ i, s, f });
  }

  // ordernar segundo tempo de término
  const jobsOrdered = jobs.sort((joba, jobb) => joba.f > jobb.f);

  // selecionar tarefas
  const jobsSelected = [];
  while (jobsOrdered.length) {
    const currentJob = jobsOrdered.shift();
    const lastJobSelected = jobsSelected[jobsSelected.length - 1];
    if (lastJobSelected) {
      if (currentJob.s > lastJobSelected.f) {
        jobsSelected.push(currentJob);
      }
    } else {
      jobsSelected.push(currentJob);
    }
  }

  paintSelectedJobs(jobsSelected);
}

function paintSelectedJobs(selectedJobs){
	
	selectedJobs.forEach((task) => {
		for(let j = task.s;j <= task.f;j++){
			tableCells[task.i][j].style.backgroundColor = 'red';
		}
	});
}
