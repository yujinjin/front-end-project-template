/*
 * @创建者: yujinjin9@126.com
 * @描述: 日志输出
 */
import config, { BuildEnv } from "@/config";

enum LogLevels {
    DEBUG = 0,

    INFO = 1,

    WARN = 2,

    ERROR = 3,

    FATAL = 4
}

/** 日志 */
export interface Logs {
    debug(...contents: any[]): void;
    info(...contents: any[]): void;
    warn(...contents: any[]): void;
    error(...contents: any[]): void;
    fatal(...contents: any[]): void;
}

class Log {
    private level: LogLevels;

    constructor() {
        if (config.buildEnv === BuildEnv.DEVELOPMENT) {
            this.level = LogLevels.DEBUG;
        } else {
            this.level = LogLevels.ERROR;
        }
    }

    print(logLevel: LogLevels, ...contents: any[]) {
        if (!window.console || !window.console.log) {
            return;
        }
        if (logLevel < this.level) {
            return;
        }
        // 避免被代码打包把console的代码删除，同时eslint 配置不要使用console
        window["console"]["log"](...contents);
    }
}
const log = new Log();
export default <Logs>{
    debug(...contents: any[]) {
        log.print(LogLevels.DEBUG, "DEBUG: ");
        log.print(LogLevels.DEBUG, ...contents);
    },

    info(...contents: any[]) {
        log.print(LogLevels.INFO, "INFO: ");
        log.print(LogLevels.INFO, ...contents);
    },

    warn(...contents: any[]) {
        log.print(LogLevels.WARN, "WARN: ");
        log.print(LogLevels.WARN, ...contents);
    },

    error(...contents: any[]) {
        log.print(LogLevels.ERROR, "ERROR: ");
        log.print(LogLevels.ERROR, ...contents);
    },

    fatal(...contents: any[]) {
        log.print(LogLevels.FATAL, "FATAL: ");
        log.print(LogLevels.FATAL, ...contents);
    }
};
