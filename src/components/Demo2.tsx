import { Gantt } from '@visactor/vtable-gantt';
import { useEffect, useRef } from 'react';
import { ganttChart, isWeekend, isHoliday } from '../utils/ganttEngine';
import moment from 'moment';

const Demo = () => {
    const ganttContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const records = ganttChart([
            {
              "name": "Create airflow dag for inserting creatives_urls table",
              "estimation": 3,
              "assignee": "Shir"
            },
            {
              "name": "Create airflow dag for creating thumbnails:\nGet data from singlestore- 1d\nScreenshot tool-7d\nSave thumbnails in s3-1d",
              "estimation": 3,
              "assignee": "Shir"
            },
            {
              "name": "Build grafana dashboard & add logs",
              "estimation": 1,
              "assignee": "Shir"
            },
            {
              "name": "Optional: add autocomplete api to dashboard api",
              "estimation": 2,
              "assignee": "adi"
            },
            {
              "name": "Change Airflow scripts to save data with less than X impressions",
              "estimation": 1,
              "assignee": "Shir"
            },
            {
              "name": "Add ux thresholds support- query that runs before creatives to get the values of the ux patterns for the publisher",
              "estimation": 2,
              "assignee": "Shir"
            },
            {
              "name": "Move creatives table functionality to dashboard api:\n1. including: sort, pagination, count (total creatives number) & sum row count (first line in table)\n2. Add support for ux patterns data in all creatives query (Only in select)\n3. Unit testing",
              "estimation": 7,
              "assignee": "Shir"
            },
            {
              "name": "add support for creatives table total row functionality",
              "estimation": 2,
              "assignee": "Shir"
            },
            {
              "name": "Add filters support in creatives queries for regular filters:\nplatform,\napp,\nad network,\ndsp,\ncreative type\ncountry,\ntags\nux content rating\ncategory\nsearch by creative id",
              "estimation": 3,
              "assignee": "Shir"
            },
            {
              "name": "Add filters support in creatives queries for conditional filters (open search):\nadvertiser\ndeveloper\nwebsite\nandroid package\nios bundle id",
              "estimation": 3,
              "assignee": "Shir"
            },
            {
              "name": "Add filters support in creatives queries for ux patterns filter",
              "estimation": 5,
              "assignee": "Shir"
            },
            {
              "name": "Add filters support for metrics filters: impressions & revenue",
              "estimation": 5,
              "assignee": "Shir"
            },
            {
              "name": "Multi action support for reporting- TBD",
              "estimation": "",
              "assignee": "Shir"
            },
            {
              "name": "Move and update export query to dashboard api",
              "estimation": 3,
              "assignee": "adi"
            },
            {
              "name": "optional: add suport for custom fields selection in table",
              "estimation": 3,
              "assignee": "Tal"
            },
            {
              "name": "Integration and testing with the ui",
              "estimation": 7,
              "assignee": "Shir"
            },
            {
              "name": "Backend support: in query api\n1. add api for get single creative by id - creativeSeenIn\n2. add support for search by app name\n3. sorting\n4. pagination\n5. filters: date range & countries",
              "estimation": 5,
              "assignee": "Shir"
            },
            {
              "name": "Report a creative (setReportedTags) - TBD on flow",
              "estimation": "",
              "assignee": "adi"
            },
            {
              "name": "Add integration with cinema service",
              "estimation": 5,
              "assignee": "adi"
            },
            {
              "name": "Integration and testing with ui",
              "estimation": 7,
              "assignee": "adi"
            },
            {
              "name": "make common component for filters (notification & creatives)",
              "estimation": 3,
              "assignee": "adi"
            },
            {
              "name": "filters deeplink legacy support",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter: App conditional",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter: Ad networks conditional",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter: Tags",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter: Website conditional",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter: Android package conditional",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter: IOS storeid conditional",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter: US content rating conditional",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter: Store category",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "filter - metrics: Revenue, Impressions",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "POC grid container layout as a part pf the shared table DataGrid",
              "estimation": "",
              "assignee": "adi"
            },
            {
              "name": "video component in table (the netfilx component) POC needed",
              "estimation": 7,
              "assignee": "adi"
            },
            {
              "name": "grid container 3 infiny scroll",
              "estimation": "",
              "assignee": "adi"
            },
            {
              "name": "grid container spread layout",
              "estimation": "",
              "assignee": "adi"
            },
            {
              "name": "playable video",
              "estimation": 8,
              "assignee": "adi"
            },
            {
              "name": "grid card: texts",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "grid card: image with tooltips",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "grid card: selection and menu",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "grid card: skeleton",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "grid card: business logic",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "grid header from table (will be done in shared)",
              "estimation": 2,
              "assignee": "adi"
            },
            {
              "name": "Grid responsive",
              "estimation": 2,
              "assignee": "adi"
            },
            {
              "name": "infinty scroll",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "Grid virtual scroll  - poc",
              "estimation": 2,
              "assignee": "adi"
            },
            {
              "name": "Grid multibar",
              "estimation": 0.5,
              "assignee": "adi"
            },
            {
              "name": "Grid and table shared selected state - can be done in phase 2",
              "estimation": 4,
              "assignee": "adi"
            },
            {
              "name": "table view: display mock data",
              "estimation": 3,
              "assignee": "adi"
            },
            {
              "name": "table view: fetch and display real data",
              "estimation": 2,
              "assignee": "adi"
            },
            {
              "name": "customiztion columns modal - main table implementation",
              "estimation": 3,
              "assignee": "adi"
            },
            {
              "name": "adding empty state for new user and empty data by filters",
              "estimation": 0.5,
              "assignee": "adi"
            },
            {
              "name": "Video player",
              "estimation": "",
              "assignee": "adi"
            },
            {
              "name": "text info + skeleton",
              "estimation": 3,
              "assignee": "adi"
            },
            {
              "name": "table - display with mock data",
              "estimation": 2,
              "assignee": "adi"
            },
            {
              "name": "table - fetch and display real data",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "table - customiztion columns modal",
              "estimation": 1,
              "assignee": "adi"
            },
            {
              "name": "report mail",
              "estimation": "?",
              "assignee": "adi"
            },
            {
              "name": "customiztion columns modal - shared UI",
              "estimation": 5,
              "assignee": "Alex"
            }
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
                width: '250px',
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
