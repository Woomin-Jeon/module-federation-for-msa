const path = require('path');
const { dependencies } = require('./container/package.json');

const APP_CONTAINER_NAME = 'container';
const APP_1_NAME = 'app1';
const APP_2_NAME = 'app2';

const APP_CONTAINER_PORT = 8000;
const APP_1_PORT = 9000;
const APP_2_PORT = 9100;

const BUILD_FILE_RELATIVE_PATH = './build';
const APP_1_BUILD_FILE_DESTINATION = 'build_app1';
const APP_2_BUILD_FILE_DESTINATION = 'build_app2';

const COPY_PLUGIN_CONFIG = () => ({
  patterns: [
    { from: path.join('../app1', BUILD_FILE_RELATIVE_PATH), to: APP_1_BUILD_FILE_DESTINATION },
    { from: path.join('../app2', BUILD_FILE_RELATIVE_PATH), to: APP_2_BUILD_FILE_DESTINATION },
  ],
});
const MODULE_FEDERATION_PLUGIN_CONFIG = (mode) => {
  const IS_PROD = mode === 'production';

  return {
    remotes: IS_PROD ? {
      app1: `${APP_1_NAME}@./${APP_1_BUILD_FILE_DESTINATION}/${APP_1_NAME}.js`,
      app2: `${APP_2_NAME}@./${APP_2_BUILD_FILE_DESTINATION}/${APP_2_NAME}.js`,
    } : {
      app1: `${APP_1_NAME}@http://localhost:${APP_1_PORT}/${APP_1_NAME}.js`,
      app2: `${APP_2_NAME}@http://localhost:${APP_2_PORT}/${APP_2_NAME}.js`,
    },
    shared: {
      react: {
        singleton: true,
        requiredVersion: dependencies.react,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: dependencies['react-dom'],
      },
      recoil: {
        singleton: true,
        requiredVersion: dependencies.recoil,
      },
      '@module-federation/store': {
        singleton: true,
        requiredVersion: '1.0.0',
      },
    },
  };
};

module.exports = {
  APP_CONTAINER_NAME,
  APP_1_NAME,
  APP_2_NAME,
  APP_CONTAINER_PORT,
  APP_1_PORT,
  APP_2_PORT,
  BUILD_FILE_RELATIVE_PATH,
  COPY_PLUGIN_CONFIG,
  MODULE_FEDERATION_PLUGIN_CONFIG,
};
