import React, { useState } from 'react';
import Papa from 'papaparse';
import { Task } from '../interfaces/Task';
// import SettingsEditor from './SettingsEditor';
import { AssigneeSettings } from '../interfaces/AssigneeSettings';
import { v4 as uuidv4 } from 'uuid';

type CsvData = {
    [key: string]: string; // Generic type for CSV data where each row is a key-value pair
};
type CsvUploaderProps = {
    setGanttData: (data: Task[]) => void;
    setAssigneeSettings: (settings: AssigneeSettings) => void;
};

const CsvUploader: React.FC<CsvUploaderProps> = ({
    setGanttData,
    // setAssigneeSettings,
}) => {
    const [jsonData, setJsonData] = useState<Task[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Create a FileReader to read the file content
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            // Use PapaParse to parse CSV content
            Papa.parse<CsvData>(text, {
                header: true, // Treat first row as headers
                skipEmptyLines: true,
                complete: (result) => {
                    const data: Task[] = [];
                    result.data.forEach((item) => {
                        const task = {
                            id: uuidv4(),
                            name: item.name,
                            assignee: item.assignee,
                            estimation: Number(item.estimation),
                            epic: item.epic,
                        };
                        data.push(task);
                    });
                    console.log('jj:', jsonData);
                    setJsonData(data); // Set parsed JSON data to state
                    setGanttData(data);
                    console.log('Parsed JSON Data:', result.data);
                },
                error: (error: Error) => {
                    console.error('Error parsing CSV:', error.message);
                },
            });
        };
        reader.readAsText(file); // Read file content as text
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '40%' }}>
                <h2>Upload CSV</h2>
                <input type="file" accept=".csv" onChange={handleFileUpload} />

                {/* <div>
                    <h3>Parsed JSON Data:</h3>
                    {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
                </div> */}
            </div>
            {/* <div style={{ width: '60%' }}>
                <SettingsEditor
                    data={jsonData}
                    setAssigneeSettings={setAssigneeSettings}
                />
            </div> */}
        </div>
    );
};

export default CsvUploader;
