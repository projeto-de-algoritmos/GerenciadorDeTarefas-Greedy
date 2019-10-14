let taskDuration = [];
let taskTable = [];

function inicializeArrays(qtdtask,qtdsched) {
	for(let i = 0;i < qtdtask;i++){
		taskTable[i] = [];
		taskDuration[i] = 0;
		for(let j = 0;j < qtdsched;j++){
			taskTable[i][j] = false;
		}
	}
}

//Pega as entradas passadas na index
function getInput() {
	let taskData = window.location.search;
	taskData = taskData.replace('?','');
	taskData = taskData.split('&');
	let qtdtask = parseInt(taskData[0]);
	let qtdsched = parseInt(taskData[1]);	
	return [qtdsched,qtdsched];
}

//Cria a tabela de tarefas
function createTable(qtdtask,qtdsched) {
	let table = document.getElementById('tableTask');
	let row = table.insertRow(0);
	let cell = row.insertCell(0);
	cell.style.backgroundColor = 'rgba(0,191,255,1)';
	for(let i = 1;i < qtdsched + 1;i++){
		let cell = row.insertCell(i);
		cell.style.backgroundColor = 'rgba(0,191,255,1)';
		cell.innerHTML = `<strong>${i}ºHorário</strong>`;
	}
			
	for(let i = 1;i < qtdsched + 1;i++){
		row = table.insertRow(i);
		for(let j = 0;j < qtdtask + 1;j++){
			let cell = row.insertCell(j);
			if(j == 0){
				cell.innerHTML = `<input type="text" placeholder="Tarefa ${i}"></input>`;
				cell.style.backgroundColor = 'rgba(0,191,255,1)';
			}	
			else{
				cell.style.backgroundColor = 'white';
			}
		}
	}
}

//Cria as animações da tabela de tarefas
function animationSetup(){
	//Hover na célula da tabela
	let colorPrev;
	$('td').hover(
		function() {
			let coordx = $(this).parent();//linha obj
			let coordy = $(this);//coluna obj
			coordx = coordx.index();
			coordy = coordy.index();
			colorPrev = this.style.backgroundColor;
			if(coordx > 0 && coordy > 0){
				$(this).animate({"background-color": "yellow"}, 50);
			}
		}, 
		function() {
			let coordx = $(this).parent();
			let coordy = $(this);
			coordx = coordx.index();
			coordy = coordy.index();
			if(coordx > 0 && coordy > 0){
				$(this).animate({"background-color": colorPrev}, 0);
			}
		}
	);

	//Click na célula da tabela
	$('td').click(function() {
		let coordx = $(this).parent();
		let coordy = $(this);
		coordx = coordx.index();
		coordy = coordy.index();
					
		if(coordx > 0 && coordy > 0){
			$(this).css("border", "4px solid blue");
					
			taskDuration[coordx-1]++;
			taskTable[coordx-1][coordy-1] = true; 
			console.log(taskDuration);
			//$(this).css("background-color", "blue");
		}
	});
}
