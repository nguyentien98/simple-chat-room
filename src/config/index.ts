import * as fs from 'fs';

class Config {

  public get(config: string, defaultVal?: string): any {
    let configSplited = config.split('.');
    let [fileName] = configSplited;
    let configFile = this.importFile(fileName);
    let configValue: any;

    for (let elm of configSplited) {
      configValue = configValue === undefined ? configFile[elm] : configValue[elm];
    }

    if (configValue === undefined) {
      return !defaultVal ? null : defaultVal;
    }

    return configValue;
  }

  public importFile(fileName) {
    if (!fs.existsSync(__dirname + '/' + fileName + '.ts') && !fs.existsSync(__dirname + '/' + fileName + '.js')) {
      return [];
    }

    return require(`./${fileName}`);
  }

}

export default new Config();