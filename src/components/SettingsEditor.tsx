import { FC, useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { Task } from '../interfaces/Task';
import dayjs, { Dayjs } from 'dayjs';
import { AssigneeSettings } from '../interfaces/AssigneeSettings';

type SettingsEditorProps = {
    data: Task[];
    setAssigneeSettings: (settings: AssigneeSettings) => void;
    assigneeSettings: AssigneeSettings;
};

const styles = {
    row: {
        display: 'flex',
        marginBottom: '10px',
    },
    col1: {
        width: '15%',
    },
    col2: {
        width: '20%',
    },
    col3: {
        width: '60%',
    },
};
const SettingsEditor: FC<SettingsEditorProps> = ({
    data,
    setAssigneeSettings,
    assigneeSettings,
}) => {
    console.log('ASD: ', assigneeSettings);
    const [settings, setSettings] = useState<AssigneeSettings>(
        assigneeSettings || {}
    );
    // const [assignees, setAssignees] = useState<string[]>([]);

    useEffect(() => {
        const assigneesFiltered = new Set<string>(
            data.map((item) => item['assignee'])
        );
        const newSettings: AssigneeSettings = {};
        Array.from(assigneesFiltered).forEach((assignee) => {
            if (assignee) {
                newSettings[assignee] = {
                    startDate:
                        settings[assignee]?.startDate ||
                        dayjs().format('YYYY-MM-DD'),
                    vacationDates: settings[assignee]?.vacationDates || [],
                };
            }
        });
        setSettings(newSettings);
    }, [data]);

    useEffect(() => {
        console.log(settings);
        setAssigneeSettings(settings);
    }, [settings]);

    const onChangeStartDate = (
        date: Dayjs,
        dateString: string,
        assignee: string
    ) => {
        console.log(date, dateString, assignee);
        setSettings({
            ...settings,
            [assignee]: {
                ...settings[assignee],
                startDate: dateString,
            },
        });
    };

    const onChangeVacationDates = (
        date: Dayjs | string[],
        dateString: string[],
        assignee: string
    ) => {
        console.log(date, dateString);
        setSettings({
            ...settings,
            [assignee]: {
                ...settings[assignee],
                vacationDates: dateString,
            },
        });
    };

    // const defaultValue = [dayjs('2000-01-01'), dayjs('2000-01-03'), dayjs('2000-01-05')];

    return (
        <div>
            <h2>Edit assignees' settings</h2>
            <div style={styles.row}>
                <div style={styles.col1}>Assignee</div>
                <div style={styles.col2}>Start date</div>
                <div style={styles.col3}>Vacation dates</div>
            </div>
            {Object.keys(settings).length > 0 &&
                Object.keys(settings).map((item) => (
                    <div style={styles.row} key={item}>
                        <div style={styles.col1}>{item}</div>
                        <div style={styles.col2}>
                            <DatePicker
                                onChange={(date, dateString) =>
                                    onChangeStartDate(
                                        date,
                                        dateString as string,
                                        item
                                    )
                                }
                                value={
                                    dayjs(settings[item].startDate) || dayjs()
                                }
                                size="small"
                            />
                        </div>
                        <div style={styles.col3}>
                            <DatePicker
                                multiple
                                onChange={(date, dateString) =>
                                    onChangeVacationDates(
                                        date,
                                        dateString as string[],
                                        item
                                    )
                                }
                                maxTagCount="responsive"
                                value={settings[item].vacationDates || []}
                                size="small"
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default SettingsEditor;
