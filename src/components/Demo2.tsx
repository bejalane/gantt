import { Gantt } from '@visactor/vtable-gantt';
import { useEffect, useRef } from 'react';
import { ganttChart, isWeekend, isHoliday } from '../utils/ganttEngine';
import moment from 'moment';

const Demo = () => {
    const ganttContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const records = ganttChart([
            { id: '1', name: 'get data', assignee: 'Alex', estimation: 3 },
            { id: '2', name: 'create table', assignee: 'Alex', estimation: 4 },
            {
                id: '3',
                name: 'create backend pagination',
                assignee: 'Grom',
                estimation: 1.5,
            },
            {
                id: '4',
                name: 'create table',
                assignee: 'Grom',
                estimation: 0.5,
            },
        ]);
        console.log(records);
        // [
        //     {
        //         id: 1,
        //         title: 'Task 1',
        //         developer: 'liufangfang.jane@bytedance.com',
        //         start: '2024-10-18',
        //         end: '2024-10-25',
        //         progress: 0,
        //         priority: 'P0',
        //     },
        //     {
        //         id: 2,
        //         title: 'Task 2',
        //         developer: 'liufangfang.jane@bytedance.com',
        //         start: '07/24/2024',
        //         end: '08/04/2024',
        //         progress: 0,
        //         priority: 'P0',
        //     },
        //     {
        //         id: 3,
        //         title: 'Task 3',
        //         developer: 'liufangfang.jane@bytedance.com',
        //         start: '2024-08-04',
        //         end: '2024-08-04',
        //         progress: 100,
        //         priority: 'P1',
        //     },
        //     {
        //         id: 4,
        //         title: 'Task 4',
        //         developer: 'liufangfang.jane@bytedance.com',
        //         start: '2024-07-26',
        //         end: '2024-07-28',
        //         progress: 0,
        //         priority: 'P0',
        //     },
        // ];

        const columns = [
            {
                field: 'taskName',
                title: 'title',
                width: 'auto',
                sort: true,
                tree: true,
                editor: 'input',
            },
            {
                field: 'assigneeId',
                title: 'assignee',
                width: 'auto',
                sort: true,
                tree: true,
                editor: 'input',
            },
            {
                field: 'start',
                title: 'start',
                width: 'auto',
                sort: true,
                editor: 'date-input',
            },
            {
                field: 'end',
                title: 'end',
                width: 'auto',
                sort: true,
                editor: 'date-input',
            },
        ];
        const option = {
            overscrollBehavior: 'none',
            records,
            taskListTable: {
                columns,
            },
            taskBar: {
                startDateField: 'start',
                endDateField: 'end',
                progressField: 'progress',
                resizable: true,
                moveable: true,
                hoverBarStyle: {
                    barOverlayColor: 'rgba(35, 119, 255, 0.8)',
                },
                labelText: '{taskName}',
                labelTextStyle: {
                    fontFamily: 'Arial',
                    fontSize: 12,
                    textAlign: 'left',
                    textOverflow: 'ellipsis',
                    color: '#ffffff',
                },
                barStyle: {
                    width: 20,
                    /** Task bar color */
                    barColor: '#1777ff',
                    /** Completed part of the task bar color */
                    completedBarColor: '#53c31b',
                    /** Task bar corner radius */
                    cornerRadius: 8,
                    /** Task bar border */
                    borderWidth: 1,
                    /** Border color */
                    borderColor: 'black',
                },
            },
            grid: {
                verticalLine: {
                    lineWidth: 1,
                    lineColor: '#e1e4e8',
                },
                horizontalLine: {
                    lineWidth: 1,
                    lineColor: '#e1e4e8',
                },
            },
            timelineHeader: {
                colWidth: 50,
                backgroundColor: '#EEF1F5',
                horizontalLine: {
                    lineWidth: 1,
                    lineColor: '#e1e4e8',
                },
                verticalLine: {
                    lineWidth: 1,
                    lineColor: '#e1e4e8',
                },
                scales: [
                    {
                        unit: 'day',
                        step: 1,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        format(date: any) {
                            const mDate = moment(date.startDate);
                            const isNotWrokingDay =
                                isWeekend(mDate) || isHoliday(mDate);
                            return isNotWrokingDay
                                ? '-'
                                : mDate.format('dd DD');
                        },
                        style: {
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'right',
                            textBaseline: 'bottom',
                            backgroundColor: '#EEF1F5',
                        },
                    },
                ],
            },
        };
        if (ganttContainer.current) {
            new Gantt(ganttContainer.current, option);
        }
    }, []);

    return (
        <div
            className="COO"
            ref={ganttContainer}
            style={{ width: '100%', height: '100%', background: '#000' }}
        />
    );
};

export default Demo;
