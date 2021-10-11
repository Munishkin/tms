import Handlebars from 'handlebars';
import { saveAs } from 'file-saver';
import formatDate from '../utils/formatDate';

const reportTemplate = Handlebars.compile(`
    <ul>
        {{#each dailyReports}}
            <li>
                <p>Date: {{date}}</p>
                <p>Total time: {{totalTime}}h</p>
                <p>Notes:</p>
                <ul>
                    {{#each projectDescriptions as |note|}}
                        <li>{{note}}</li>
                    {{/each}}
                </ul>
            </li>
        {{/each}}
    </ul>
`);

function accumulateDailyReports(records) {
    const dates = records.map(record => record.date);
    const uniqueDates = [...new Set(dates)];
    const reportData = uniqueDates.map(date => {
        const recordsForDay = records.filter(record => record.date === date);
        const totalTime = recordsForDay.reduce((time, record) => time + record.hours, 0);
        const projectDescriptions = recordsForDay.map(record => record.projectDescription);
        const formattedDate = formatDate(date);
        return {
            date: formattedDate,
            totalTime,
            projectDescriptions
        }
    });

    return reportData;
}

export const saveRecordsReport = (records) => {
    const dailyReports = accumulateDailyReports(records);
    const reportContent = reportTemplate({ dailyReports });
    const reportBlob = new Blob([reportContent]);
    saveAs(reportBlob, 'dailyReport.html');
}
