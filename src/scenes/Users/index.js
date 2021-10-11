import { useState, useEffect, useRef } from 'react';
import { userService } from '../../services';
import Error from '../../components/Message';
import Header from '../../components/Header';
import AppContainer from '../../components/AppContainer';
import Table from '../../components/Table';
import Button from '../../components/Button/saveBtn';
import Link from '../../components/Link';

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const isCancelledRef = useRef(false);
    
    const fetchUsers = () => {
        isCancelledRef.current = false;

        userService.getAll()
            .then(data => {
                if (isCancelledRef.current) return;
                setUsers(data);
            })
            .catch(error => {
                if (isCancelledRef.current) return;
                setError(true);
            });
    }

    const cancelFetchUsers = () => {
        isCancelledRef.current = true;
    }

    useEffect(() => {
        fetchUsers();

        return cancelFetchUsers;
    }, []);

    return (
        <AppContainer>
            { error && <Error>Error fetching users. Try again later.</Error>} 
            <Header />
            <Table 
                columns={[
                    { title: 'First name', key: 'firstname' },
                    { title: 'Last name', key: 'lastname' },
                    { title: 'Role', key: 'role' }]} 
                data={users}
                onDelete={async (id) => {
                    await userService.delete(id);
                    await fetchUsers();
                }}
                editUrl={ id => `/users/${id}` }
            />
            <Link to='/users/add'><Button>Add</Button></Link>
        </AppContainer>
    );
}

export default Users;
