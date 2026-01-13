import { defaultProjectId } from "./projectManager";

function addProjectToUI(project, onClick) {
  const projectListDiv = document.querySelector("#project-list");

  const wrapper = document.createElement("div");
  wrapper.className = "current-project-sidebar";
  wrapper.dataset.id = project.getId();

  const nameDiv = document.createElement("div");
  nameDiv.textContent = project.getName();

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-project-btn";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 

    if (project.getId() === defaultProjectId) {
      alert("Default project cannot be deleted.");
      return;
    }
    wrapper.remove();
  });

  wrapper.addEventListener("click", () => {
    if (onClick) onClick(project);
  });

  wrapper.appendChild(nameDiv);
  wrapper.appendChild(deleteBtn);
  projectListDiv.appendChild(wrapper);
}

function switchProjectUI(project) {
  document.querySelector("#current-project").textContent = project.getName();
  document.querySelector("#todo-project-name").textContent = project.getName();
  document.querySelectorAll(".current-project-sidebar")
    .forEach(p => p.classList.remove("active-project"));

  const activeDiv = document.querySelector(
    `.current-project-sidebar[data-id="${project.getId()}"]`
  );
  if (activeDiv) {
    activeDiv.classList.add("active-project");
  }
}

export { addProjectToUI, switchProjectUI };
