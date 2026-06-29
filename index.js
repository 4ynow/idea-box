const input = document.getElementById("idea-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("idea-list");

let ideas = [];

function save() {
  localStorage.setItem("ideas", JSON.stringify(ideas));
}

function load() {
  const stored = localStorage.getItem("ideas");
  if (stored) {
    ideas = JSON.parse(stored);
  }
}

function render() {
  list.innerHTML = "";

  ideas.forEach(function(text, index) {
    const li = document.createElement("li");
    li.className = "idea-item";

    const span = document.createElement("span");
    span.textContent = text;
    span.className = "quote-text";

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "&times;";
    delBtn.className = "delete-btn";

    delBtn.addEventListener("click", function() {
      ideas.splice(index, 1);
      save();
      render();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

button.addEventListener("click", function() {
  const text = input.value.trim();
  if (text === "") return;

  ideas.push(text);
  save();
  render();
  input.value = "";
});

load();
render();