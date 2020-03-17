import { environment } from 'src/environments/environment.prod';

const baseUrl= environment.apiUrl;
export const apis= {
    auth: {
        login: baseUrl+ '/auth/login',
        logout: baseUrl+ '/auth/logout',
        verify_user: baseUrl+ '/auth/verify',
        verify_user_code: baseUrl+ '/auth/verifycode',
        change_password: baseUrl+ '/auth/changepassword',
        forgotpassword: baseUrl+ '/auth/forgotpassword',
        generate_otp: baseUrl+ '/auth/generate',
        verify_otp: baseUrl+ '/auth/validate'
    },
    agents: {
        agents: baseUrl+ '/agent',
        activate_agent: baseUrl+ '/agent/activation',

    },
    employees: {
        employees: baseUrl+ '/employee',
        activate_employee: baseUrl+ '/employee/activation',
        roles: baseUrl+ '/role',
        change_role: baseUrl+ '/employee/role',
    },
    publications: {
        publications: baseUrl+ '/publication',   
        activate_publication: baseUrl+ '/publication/activation',
        map_publication: baseUrl+ '/publication/map'       
    },
    inspector_location: {
        report: baseUrl+ '/report',
    },
    configurations: {
        get_indents: baseUrl+ '/indent',
    },
    common: {
    }
}

export default apis;