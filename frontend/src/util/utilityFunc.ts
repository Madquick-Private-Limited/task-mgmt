import * as type from '../types';

export const cleanUser = (user:type.User) => {
    const { _id, notifications, createdAt, updatedAt, taskID, ...cleanedUser } = user;
    return cleanedUser;
}