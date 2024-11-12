import { Gantt } from '@visactor/vtable-gantt';
import { FC, useEffect, useRef } from 'react';
import { ganttChart, isWeekend, isHoliday } from '../utils/ganttEngine';
import moment from 'moment';
import { Task } from '../interfaces/Task';
import { AssigneeSettings } from '../interfaces/AssigneeSettings';

type DemoProps = {
    data: Task[];
    assigneeSettings: AssigneeSettings;
};

const Demo: FC<DemoProps> = ({ data, assigneeSettings }) => {
    const ganttContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const records = ganttChart({
            tasks: data,
            assigneeSettings: assigneeSettings,
        });

        const columns = [
            {
                field: 'taskName',
                title: 'title',
                width: '250px',
                sort: true,
                tree: true,
                editor: 'input',
            },
            {
                field: 'assigneeId',
                title: 'assig.',
                width: 'auto',
                sort: true,
                tree: true,
                editor: 'input',
            },
            {
                field: 'epic',
                title: 'epic',
                width: 'auto',
                sort: true,
                tree: true,
                editor: 'input',
            },
            {
                field: 'eta',
                title: 'eta',
                width: 'auto',
                sort: true,
                tree: true,
                editor: 'input',
            },
            // {
            //     field: 'start',
            //     title: 'start',
            //     width: 'auto',
            //     sort: true,
            //     editor: 'date-input',
            // },
            // {
            //     field: 'end',
            //     title: 'end',
            //     width: 'auto',
            //     sort: true,
            //     editor: 'date-input',
            // },
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
                                : mDate.format('DD/MM');
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
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
