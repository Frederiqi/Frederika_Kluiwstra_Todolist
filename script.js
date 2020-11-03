let container = document.getElementById("tasksTodo");
let taskForm = document.getElementById("taskForm");

const getTasks = async () => {
    try {
        await fetch(API_URL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Tasks:", data);
                container.innerHTML = "";
                data.map((item) => {
                    const taskTemplate =
                        `<div class="taskcontainer"><li>
            ${item.task} <image src="bin25.png" onclick="deleteTasks('${item._id}')" />
          </li></div>`;
                    container.innerHTML += taskTemplate;
                });
            });
    } catch (error) {
        console.log(error)
    }
};

getTasks();

const postTasks = (data) => {
    if (data) {
        fetch(API_URL, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                getTasks();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}

const deleteTasks = (id) => {
    if (id) {
        fetch(API_URL + "/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                getTasks();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskValue = document.querySelector('input[name="task"]').value;
    const data = {
        task: taskValue,
    };
    taskForm.reset();
    postTasks(data);
});