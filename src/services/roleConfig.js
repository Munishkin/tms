export default {
    user: {
        permissions: {
            canAccessRecords: true,
            canAccessUsers: false
        },
        defaultScreen: 'records'
    },
    manager: {
        permissions: {
            canAccessRecords: false,
            canAccessUsers: true 
        },
        defaultScreen: 'users'
    },
    admin: {
        permissions: {
            canAccessRecords: true,
            canAccessUsers: true
        },
        defaultScreen: 'records'
    }
};
