/**
 * Only prints to console if NODE_ENV is not production!
 * Handy for debug console.logs!
 */
 export const printToConsole = (message: string) => {
    if (process.env.NODE_ENV == 'test') {
        console.log(message);
    }
};