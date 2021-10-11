import { useState, useEffect, useRef } from 'react';
import { saveRecordsReport } from '../../services/recordsReport';
import formatDate from '../../utils/formatDate';
import Header from '../../components/Header';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import { recordService } from '../../services';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button/saveBtn';
import Link from '../../components/Link';
import Message from '../../components/Message';

function Records() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [error, setError] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const isCancelledRef = useRef(false);
    
    const fetchRecords = () => {
        isCancelledRef.current = false;

        recordService.getAll()
            .then(data => {
                if (isCancelledRef.current) return;
                setRecords(data);
                setFilteredRecords(data);
                setError(false);
                setFromDate('');
                setToDate('');
            })
            .catch(error => {
                if (isCancelledRef.current) return;
                setError(true);
            });
    }

    const cancelFetchRecords = () => {
        isCancelledRef.current = true;
    }

    const onChangeFromDate = e => {
        setFromDate(e.target.value);
    }

    const onChangeToDate = e => {
        setToDate(e.target.value);
    }

    const filterRecordsByDate = () => {
        if (fromDate && toDate) {
            const newFilteredRecords = records.filter(record => {
                return record.date >= fromDate && record.date <=toDate;
            });

            setFilteredRecords(newFilteredRecords);
        }
    }

    const clearFilters = () => {
        setFilteredRecords(records);
        setFromDate('');
        setToDate('');
    }

    const exportDailyReports = () => {
        saveRecordsReport(filteredRecords)
    }
 
    useEffect(() => {
        fetchRecords();

        return cancelFetchRecords;
    }, []);

    return (
        <AppContainer>
            <Header />
            { error && <Message>There is an error retrieving records. Please try again later</Message>}
            <Title>Filter dates (from, to):</Title>
            <div>
                <Input onChange={onChangeFromDate} type="date" placeholder="From" value={fromDate} width={'150px'}/>
                <Input onChange={onChangeToDate} type="date" placeholder="To" value={toDate} width={'150px'}/>
            </div>
            <div>
                <Button onClick={filterRecordsByDate} disabled={records.length === 0}>Apply</Button>
                <Button onClick={clearFilters} disabled={records.length === 0}>Clear</Button>
                <Button onClick={exportDailyReports} disabled={filteredRecords.length === 0}>Export</Button>
            </div>
            <Table 
                columns={[
                    { title: 'Project description', key: 'projectDescription' },
                    { title: 'Hours spent', key: 'hours' },
                    { title: 'Date', key: 'date', format: formatDate }
                    ]}
                data={filteredRecords}
                hilightRow={({ preferredWorkingHoursPerDay, hours }) => {
                    if (preferredWorkingHoursPerDay) {
                        if (preferredWorkingHoursPerDay > hours) {
                            return 'LavenderBlush';
                        } else {
                            return 'HoneyDew';
                        }
                    }
                    return '';
                }}
                onDelete={async (id) => {
                    await recordService.delete(id);
                    await fetchRecords();
                }}
                editUrl={ id => `/records/${id}` }
            />
            <Link to='/records/add'><Button>Add</Button></Link>
        </AppContainer>
    );
}

export default Records;
