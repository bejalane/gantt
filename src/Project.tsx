import { FC, useEffect, useState } from 'react';
import Demo2 from './components/Demo2';
import CsvUploader from './components/UploadCsv';
import { Task } from './interfaces/Task';
import { AssigneeSettings } from './interfaces/AssigneeSettings';
import EditableTable from './components/Table';
import SettingsEditor from './components/SettingsEditor';
import { Button } from 'antd';
import { GanttProject } from './interfaces/GanttProject';

type ProjectProps = {
    selectedProject: GanttProject;
    backToProjects: () => void;
};

const Project: FC<ProjectProps> = ({ selectedProject, backToProjects }) => {
    const [currentGanttData, setCurrentGanttData] = useState<Task[]>(
        selectedProject.data.tasks || []
    );
    const [showGantt, setShowGantt] = useState<boolean>(false);
    const [assigneeSettings, setAssigneeSettings] = useState<AssigneeSettings>(
        selectedProject.data.assigneeSettings || {}
    );
    const [updatedTableData, setUpdatedTableData] = useState<
        Task[] | undefined
    >(selectedProject.data.tasks || undefined);

    useEffect(() => {
        const myProjects = localStorage.getItem('ganttProjects');
        if (myProjects) {
            const parsed: GanttProject[] = JSON.parse(myProjects);
            const project = parsed.find(
                (item) => item.id === selectedProject.id
            );
            if (project) {
                project.data.tasks = updatedTableData || currentGanttData;
                project.data.assigneeSettings = assigneeSettings;
                console.log(parsed);
                localStorage.setItem('ganttProjects', JSON.stringify(parsed));
            }
        }
    }, [
        updatedTableData,
        assigneeSettings,
        currentGanttData,
        selectedProject.id,
    ]);

    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{ paddingLeft: '10px' }}>
                    <span style={{ paddingRight: '20px' }}>
                        Gantt builder: {selectedProject.name}
                    </span>
                    {!showGantt && currentGanttData.length > 0 && (
                        <>
                            <Button
                                size="small"
                                color="primary"
                                type="primary"
                                onClick={() => {
                                    setShowGantt(true);
                                }}
                            >
                                Create gantt
                            </Button>
                        </>
                    )}
                    {!showGantt && (
                        <>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => {
                                    backToProjects();
                                }}
                            >
                                Back to projects
                            </Button>
                        </>
                    )}
                    {showGantt && (
                        <button
                            onClick={() => {
                                setShowGantt(false);
                            }}
                        >
                            Back to the table
                        </button>
                    )}
                </div>
                <div style={{ display: 'flex', padding: '20px' }}>
                    {!showGantt && (
                        <div style={{ width: '40%' }}>
                            <CsvUploader
                                setGanttData={(data: Task[]) => {
                                    setCurrentGanttData([]);
                                    setUpdatedTableData(data);
                                    setTimeout(
                                        () => setCurrentGanttData(() => data),
                                        100
                                    );
                                }}
                            />
                        </div>
                    )}

                    {currentGanttData.length > 0 && !showGantt && (
                        <div style={{ width: '60%' }}>
                            <SettingsEditor
                                data={currentGanttData}
                                setAssigneeSettings={setAssigneeSettings}
                                assigneeSettings={assigneeSettings}
                            />
                        </div>
                    )}
                </div>

                {currentGanttData.length > 0 && !showGantt && (
                    <div style={{ padding: '20px' }}>
                        <EditableTable
                            initialData={currentGanttData}
                            syncData={(data: Task[]) => {
                                setUpdatedTableData(data);
                            }}
                        />
                    </div>
                )}
                {showGantt && currentGanttData && (
                    <Demo2
                        data={updatedTableData || currentGanttData}
                        assigneeSettings={assigneeSettings}
                    />
                )}
            </div>
        </>
    );
};

export default Project;
