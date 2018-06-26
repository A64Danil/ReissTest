import Config, { environment } from 'webpack-config';

environment.setAll({
    env: () => {
        console.log("Hello from eviroment!!!");
        console.log(process.env.NODE_ENV);
        return process.env.NODE_ENV;
    }
});

export default new Config().extend('conf/webpack.[env].config.js');