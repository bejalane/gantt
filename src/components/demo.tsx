import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { useEffect, useRef } from 'react';

const Demo = () => {
    const ganttContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize Gantt when the component is mounted
        gantt.config.date_format = '%Y-%m-%d %H:%i';
        gantt.init(ganttContainer.current!);

        // Optional: Load sample data
        gantt.parse({
            data: [
                {
                    id: 1,
                    text: 'Project #1',
                    start_date: null,
                    duration: null,
                    parent: 0,
                    progress: 0,
                    open: true,
                },
                {
                    id: 2,
                    text: 'Task #1',
                    start_date: '2024-10-18 00:00',
                    duration: 5,
                    parent: 1,
                    progress: 1,
                },
                {
                    id: 3,
                    text: 'Task #2',
                    start_date: '2024-10-23 00:00',
                    duration: 2,
                    parent: 1,
                    progress: 0.5,
                },
            ],
            links: [{ id: 2, source: 3, target: 4, type: '0' }],
        });

        return () => {
            // Clean up when the component is unmounted
            gantt.clearAll();
        };
    }, []);

    return (
        <div ref={ganttContainer} style={{ width: '100%', height: '600px' }} />
    );
};

export default Demo;
