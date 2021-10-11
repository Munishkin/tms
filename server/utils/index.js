import { ROLES_WEIGHT, ROLES_PERMISSIONS } from '../constants';

export const isActionAllowed = (action, role = 'user') => {
    return ROLES_WEIGHT[ROLES_PERMISSIONS[action]] >= ROLES_WEIGHT[role];
}

export const findPriviligedUsersAboveCurrentRole = currentRole => {
    let priviligedUsersAboveCurrentRole =[];

    Object.keys(ROLES_WEIGHT).forEach(role => {
        if (ROLES_WEIGHT[role] < ROLES_WEIGHT[currentRole]) {
            priviligedUsersAboveCurrentRole.push(role);
        }
    })
    return priviligedUsersAboveCurrentRole;
}
