/* RESPONSES */
export interface UserLoginResponse {
    success: boolean;
    message: string;
    data?: {
        token?: string;
    }
}

export interface UserCreateResponse {
    success: boolean;
    message: string;
    data?: UserInterface[]
}

export interface UserListResponse {
    success: boolean;
    message: string;
    data?: UserInterface[]
}

/* INTERFACES */
export interface UserInterface {
    readonly id: number; // Id de registro do banco de dados
    readonly ra: number; // Id da matrícula
    readonly cpf: string; // CPF
    name: string;
    email: string;
}

export interface UserUpdateInterface {
    user: UserInterface;
    update: {
        name: string;
        email: string;
    }
}

export interface UserLoginInterface {
    ra: number;
    password: string;
}