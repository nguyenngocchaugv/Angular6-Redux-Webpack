import { User } from '../../admin/models/user.model';

export interface Auth {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    rememberMe: boolean;
}

export const initialAuth: Auth = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rememberMe: false
};
