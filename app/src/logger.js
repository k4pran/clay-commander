import log from 'loglevel'


export default class Logger {

    constructor(componentName) {
        log.setDefaultLevel(log.levels.DEBUG);
        this.componentName = componentName;
    }

    debug = (text) => {
        log.debug(this.format(text));
    }

    info = (text) => {
        log.info(this.format(text));
    }

    warn = (text) => {
        log.warn(this.format(text));
    }

    error = (text) => {
        log.error(this.format(text))
    }

    format = (text) => {
        const now = new Date();
        let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' '
        + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        return date + "\t[" + this.componentName + "]\t" + text;
    }
}