import { useState } from "react";

function ProjectManager() {
  const [isLoading, setIsLoading] = useState(false);

  const makeNewProject = () => {
    setIsLoading(true);
  }

  return (
    <div className="project-manager tl-theme__dark">
      <header>
        <h1>Projects</h1>
      </header>
      <main className="projects" data-isLoading={isLoading}>
        <figure
          className="project-showcase project-showcase--new"
          onClick={makeNewProject}
        >
          <figcaption className="project-showcase__info">
            <p className="project-showcase__title">New Project</p>
          </figcaption>
        </figure>

        {/* <div className="project-showcase">
          <img src="https://picsum.photos/250/150" alt="" draggable="false" />
          <div className="project-showcase__info">
            <p className="project-showcase__title">Test</p>
          </div>
        </div> */}
      </main>
    </div>
  );
}

export default ProjectManager;
