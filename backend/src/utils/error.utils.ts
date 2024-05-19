

export function isDuplicateKeyError(error: any): boolean {
    
    return error && error.code === "23505" && error.detail && error.detail.includes("already exists");
}


