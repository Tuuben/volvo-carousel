import cars from './cars.json';

export type CarModel = {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl: string;
}

export const getCarById = async (id: string): Promise<CarModel> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const car = cars.find((car) => car.id === id);
            if (car) {
                resolve(car);
            } else {
                reject(new Error(`Car with id ${id} not found`));
            }
        }, 1500); // Arbitrary delay to simulate a real API call
    });
}

export const getAllCars = async (): Promise<CarModel[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(cars);
        }, 1500); // Arbitrary delay to simulate a real API call
    });
}
