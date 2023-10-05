import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProjectManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const req = await fetch("/api/projects");

      if (!req.ok) {
        alert("Error occured. Check 'Developer Console'");
        throw Error(req.status, req.statusText);
      }

      const res = await req.json();

      if (!res.status) {
        alert("Error occured. Check 'Developer Console'");
        throw Error(res.message);
      }

      return res.data;
    };

    setIsLoading(true);

    fetchProjects()
      .then((res) => setProjects(res))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const makeNewProject = async () => {
    setIsLoading(true);

    const req = await fetch("/api/new");

    if (!req.ok) {
      alert("Error occured. Check 'Developer Console'");
      console.error(req.status, req.statusText);

      setIsLoading(false);
      return;
    }

    const res = await req.json();

    if (!res.status) {
      alert("Error occured. Check 'Developer Console'");
      console.error(res.message);

      setIsLoading(false);
      return;
    }

    navigate(`/edit/${res.data.key}`);
  };

  const openProject = (ev) => {
    const key = ev.currentTarget.dataset.key;
    navigate(`/edit/${key}`);
  };

  return (
    <div className="project-manager tl-theme__dark">
      <header>
        <h1>Projects</h1>
      </header>
      <main className="projects" data-isloading={isLoading}>
        <figure
          className="project-showcase project-showcase--new"
          onClick={makeNewProject}
        >
          <figcaption className="project-showcase__info">
            <p className="project-showcase__title">New Project</p>
          </figcaption>
        </figure>

        {projects.map((project, idx) => (
          <div
            className="project-showcase"
            key={project.key}
            data-key={project.key}
            onClick={openProject}
          >
            <img src={`https://picsum.photos/250/150?${idx}`} alt="Random cover image" draggable="false" />
            <div className="project-showcase__info">
              <p className="project-showcase__title">{project.name}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default ProjectManager;
