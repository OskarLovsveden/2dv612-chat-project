type IConfig = {
    port: string;
}

export const config: IConfig = {
    port: process.env.PORT || '5000',
};
  