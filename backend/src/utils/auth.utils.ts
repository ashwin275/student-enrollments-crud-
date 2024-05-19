export const isSuperAdmin = (user:any) => {
    if (user && (user.role === 'super_admin')) {
        return true;
    }
    return false;
};


export const isAdmin = (user:any) => {
    if (user && (user.role === 'admin')) {
        return true;
    }
    return false;
};
