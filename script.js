const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function render() {
    taskList.innerHTML = '';
    tasks.forEach((t, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <span class="${t.done ? 'done' : ''}">${t.text}</span>
      <button data-i="${i}" class="toggle">✔</button>
      <button data-i="${i}" class="delete">🗑</button>`;
        taskList.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskList.addEventListener('click', (e) => {
    const index = Number(e.target.dataset.i);
    if (Number.isNaN(index)) return;
    if (e.target.classList.contains('toggle')) {
        tasks[index].done = !tasks[index].done;
        render();
    }
    if (e.target.classList.contains('delete')) {
        tasks.splice(index, 1);
        render();
    }
});

addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.push({ text, done: false });
    taskInput.value = '';
    render();
});

render();