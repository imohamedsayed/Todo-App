let input = document.querySelector(".addTask input");
let addTask = document.querySelector(".addTask .plus ");
let taksContainer = document.querySelector(".tasksContent");
let tasksMessage = document.querySelector(".noTasksYet");
let tasksCount = document.querySelector(".tasksCount span");
let tasksCompleted = document.querySelector(".tasksCompleted span");
let deletaAllBtn = document.querySelector(".DeleteAll");
let finishAllBtn = document.querySelector(".DoneAll");

let arrOfTask;

if (localStorage.arrOfData == null) {
  arrOfTask = [];
} else {
  arrOfTask = JSON.parse(localStorage.arrOfData);
}

onload = () => {
  input.focus();
};

// add task

addTask.onclick = () => {
  if (input.value == null || input.value == "") {
    return;
  } else {
    for (let i = 0; i < arrOfTask.length; i++) {
      if (
        arrOfTask[i].title.toLowerCase() == input.value.toLowerCase().trim()
      ) {
        alert(`${input.value} already exists`);
        return;
      }
    }

    var task = {
      title: input.value.trim(),
      done: false,
    };

    arrOfTask.push(task);

    tasksMessage.remove();
    let newTask = `
        <span class="taskBox">
          ${task.title}
          <span class="Done">Done</span>
          <span class="Delete">Delete</span>
        </span>
        `;
    taksContainer.innerHTML += newTask;
    input.value = "";
    tasksCount.innerHTML = parseInt(tasksCount.innerHTML) + 1;
  }

};

document.addEventListener("click", (e) => {
  if (e.target.className == "Delete") {
    e.target.parentNode.remove();
    tasksCount.innerHTML = parseInt(tasksCount.innerHTML) - 1;
    if (e.target.parentNode.classList.contains("finished")) {
      tasksCompleted.innerHTML = parseInt(tasksCompleted.innerHTML) - 1;
    }
    noMessageFunction();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.className == "Done") {
    e.target.parentNode.classList.add("finished");
    tasksCompleted.innerHTML = parseInt(tasksCompleted.innerHTML) + 1;
    e.target.classList.add("disabled");
  }
});

// finishAll
finishAllBtn.onclick = () => {
  let allTasks = Array.from(
    document.querySelectorAll(".tasksContent .taskBox")
  );

  for (let i = 0; i < allTasks.length; i++) {
    if (!allTasks[i].classList.contains("finished")) {
      allTasks[i].classList.add("finished");
      tasksCompleted.innerHTML = allTasks.length;
    }
  }
};

deletaAllBtn.onclick = () => {
  let allTasks = Array.from(
    document.querySelectorAll(".tasksContent .taskBox")
  );

  for (let i = 0; i < allTasks.length; i++) {
    allTasks[i].remove();
    tasksCompleted.innerHTML = 0;
    tasksCount.innerHTML = 0;
  }

  noMessageFunction();
};

function noMessageFunction() {
  let allTasks = Array.from(
    document.querySelectorAll(".tasksContent .taskBox")
  );
  if (allTasks.length == 0) {
    taksContainer.appendChild(tasksMessage);
  }
}
noMessageFunction();
