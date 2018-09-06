import { type } from '../../utils/Utils';
export const AdminActionTypes = {
    LOAD_USERS: type('[admin] Load Users'),
    LOAD_USERS_SUCCESS: type('[admin] Load Users Success'),
    ADD_USER: type('[admin] Add User'),
    ADD_USER_SUCCESS: type('[admin] Add User Success'),
    UPDATE_USER: type('[admin] Update User'),
    UPDATE_USER_SUCCESS: type('[admin] Update User Success'),
    UPDATE_USER_FAIL: type('[admin] Update User Fail'),
    DELETE_USER: type('[admin] Delete User'),
    DELETE_USER_SUCCESS: type('[admin] Delete User Success'),

}