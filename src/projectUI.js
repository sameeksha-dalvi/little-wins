import { defaultProjectId, deleteProjectById,getCurrentProject, setCurrentProject, getAllProjects } from "./projectManager";
import {loadTodosOfCurrentProject} from "./index.js"

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

    const deleted = deleteProjectById(project.getId());
    if (!deleted) return;

    wrapper.remove();

    // If current project was deleted → go to default
    const current = getCurrentProject();
    if (!current || current.getId() === project.getId()) {
      setCurrentProject(defaultProjectId);

      const defaultProject = getAllProjects()
        .find(p => p.getId() === defaultProjectId);

      if (defaultProject) {
        switchProjectUI(defaultProject);
        loadTodosOfCurrentProject();
      }
    }
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
