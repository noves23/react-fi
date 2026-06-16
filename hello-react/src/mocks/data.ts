import type { Item } from "../features/items/types";

export const mockItems: Item[] = [
    {
        id: "1",
        ownerId: "user1",
        brand: "Toyota",
        title: "Camry",
        date: "2022-01-01",
        mileage: 50000,
        color: "blue",
        validPermition: true
    },
    {
        id: "2",
        ownerId: "user2",
        brand: "Honda",
        title: "Civic",
        date: "2022-02-01",
        mileage: 40000,
        color: "red",
        validPermition: false
    }
];