export interface Car {
    _id: string;
    make: string;
    model: string;
    year?: number;
}

export interface CreateCarDto {
    make: string;
    model: string;
    year?: number;
}

// same as create car but later usefull to change individual fields
export interface UpdateCarDto {
    make: string;
    model: string;
    year?: number;
}

