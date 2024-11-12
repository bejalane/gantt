import { FC, useEffect, useState } from 'react';
import { GanttProject } from '../interfaces/GanttProject';
import { Button, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';

type ManageProjectsProps = {
    onProjectSelect: (project: GanttProject) => void;
};

const ManageProjects: FC<ManageProjectsProps> = ({ onProjectSelect }) => {
    const [projects, setProjects] = useState<GanttProject[]>([]);
    const [newProjectName, setNewProjectName] = useState<string>('');

    useEffect(() => {
        const myProjects = localStorage.getItem('ganttProjects');
        if (myProjects) {
            const parsed = JSON.parse(myProjects);
            setProjects(parsed);
        }
    }, []);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNewProjectName(e.target.value);
    };
    const handleCreate = () => {
        if (newProjectName) {
            const newProject: GanttProject = {
                name: newProjectName,
                data: {
                    tasks: [],
                    assigneeSettings: {},
                },
                id: uuidv4(),
            };
            localStorage.setItem(
                'ganttProjects',
                JSON.stringify([newProject, ...projects])
            );
            console.log(onProjectSelect);
        }
    };

    const handleSelect = (project: GanttProject) => {
        onProjectSelect(project);
    };
    return (
        <>
            <div>
                <Input placeholder="Enter project name" onChange={onChange} />;
                <Button type="primary" onClick={handleCreate}>
                    + Create gantt project
                </Button>
            </div>
            <div>
                {projects.map((project) => (
                    <div
                        key={project.name}
                        onClick={() => handleSelect(project)}
                    >
                        {project.name}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ManageProjects;
