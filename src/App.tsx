import { useState } from 'react';
import ManageProjects from './components/ManageProjects';
import { GanttProject } from './interfaces/GanttProject';
import Project from './Project';

const App = () => {
    const [selectedProject, setSelectedProject] = useState<
        GanttProject | undefined
    >();
    return (
        <>
            {!selectedProject && (
                <ManageProjects
                    onProjectSelect={(project: GanttProject) => {
                        setSelectedProject(project);
                    }}
                />
            )}
            {selectedProject && (
                <Project
                    selectedProject={selectedProject}
                    backToProjects={() => setSelectedProject(undefined)}
                />
            )}
        </>
    );
};

export default App;
