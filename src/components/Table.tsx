import React, { useState, useRef, useEffect } from 'react';
import Sortable from 'sortablejs';
import { Task } from '../interfaces/Task';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'antd';

type TableData = Task;

type EditableTableProps = {
    initialData: TableData[];
    syncData: (data: Task[]) => void;
};

const colWidth = {
    id: '20px',
    name: '350px',
    assignee: '100px',
    estimation: '60px',
    epic: '70px',
};

const EditableTable: React.FC<EditableTableProps> = ({
    initialData,
    syncData,
}) => {
    const [tableData, setTableData] = useState<TableData[]>(initialData);
    const tableBodyRef = useRef<HTMLTableSectionElement>(null);

    useEffect(() => {
        if (tableBodyRef.current) {
            Sortable.create(tableBodyRef.current, {
                animation: 150,
                onEnd: (event) => {
                    const { oldIndex, newIndex } = event;

                    if (oldIndex !== undefined && newIndex !== undefined) {
                        setTableData((prevData) => {
                            const updatedData = Array.from(prevData);
                            const [movedItem] = updatedData.splice(oldIndex, 1);
                            updatedData.splice(newIndex, 0, movedItem);

                            console.log('HHH:', updatedData);
                            // tableDataBodyRef.current = updatedData;
                            syncData(updatedData);
                            return updatedData;
                        });
                        // setTableData(() => updatedData);
                        // setTimeout(() => {
                        //     setTableData(() => updatedData);
                        // }, 100);
                        // setTableData(updatedData);
                    }
                },
            });
        }
    }, [tableData]);

    // Handle cell edit
    const handleEdit = (
        rowIndex: number,
        columnKey: keyof Task,
        value: string
    ) => {
        const updatedData: TableData[] = cloneDeep(tableData);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        updatedData[rowIndex][columnKey] = value;
        setTableData(updatedData);
        syncData(updatedData);
    };

    // Add a new row
    const handleAddRow = () => {
        const newRow: TableData = {
            id: uuidv4(),
            name: 'New Task',
            assignee: initialData ? initialData[0].assignee : 'Someone',
            estimation: 1,
            epic: '',
        };
        setTableData([...tableData, newRow]);
        syncData([...tableData, newRow]);
    };

    // Remove a row
    const handleRemoveRow = (index: number) => {
        const updatedData = tableData.filter(
            (_, rowIndex) => rowIndex !== index
        );
        setTableData(updatedData);
    };

    // const getColWidth = (key: keyof Task) => {

    // }

    return (
        <div>
            <h2>Edit your project ETAs</h2>
            <Button size="small" onClick={handleAddRow}>
                Add Row
            </Button>
            <table>
                <thead>
                    <tr>
                        {Object.keys(tableData[0]).map((columnKey) => (
                            <th
                                key={columnKey}
                                style={{ textAlign: 'left', fontSize: '14px' }}
                            >
                                {columnKey}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody ref={tableBodyRef}>
                    {tableData.map((row, rowIndex) => (
                        <tr key={row['id']}>
                            {Object.entries(row).map(
                                ([columnKey, cellValue]) => (
                                    <td key={columnKey}>
                                        {columnKey === 'id' ? (
                                            <div
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    backgroundImage:
                                                        'radial-gradient(circle, gray 2px, transparent 2px)',
                                                    backgroundSize:
                                                        '100% 33.33%',
                                                    cursor: 'grab',
                                                }}
                                            ></div>
                                        ) : (
                                            <input
                                                type="text"
                                                style={{
                                                    padding: '5px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #a4a4a4',
                                                    width:
                                                        colWidth[
                                                            columnKey as keyof Task
                                                        ] || '100px',
                                                }}
                                                value={cellValue}
                                                onChange={(e) =>
                                                    handleEdit(
                                                        rowIndex,
                                                        columnKey as keyof Task,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )}
                                    </td>
                                )
                            )}
                            <td>
                                <Button
                                    size="small"
                                    onClick={() => handleRemoveRow(rowIndex)}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <div>
                <h3>Updated JSON Data:</h3>
                <pre>{JSON.stringify(tableData, null, 2)}</pre>
            </div> */}
        </div>
    );
};

export default EditableTable;
