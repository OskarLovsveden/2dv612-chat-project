/**
 * Only prints to console if NODE_ENV=development!
 * Handy for debug console.logs!
 */
export const printToConsole = (message: string) => {
    if (process.env.NODE_ENV != 'production') {
        console.log(message);
    }
};