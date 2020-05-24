export interface IUser {
    displayName: string,
    image?: string,
    token: string,
    username: string
};

export interface IUserFormValues {
    displayName?: string;
    email: string;
    password: string;
    username?: string;
};
