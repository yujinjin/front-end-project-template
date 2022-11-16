/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2022-10-21 10:01:07
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2022-10-21 10:02:49
 * @项目的路径: \360-manager-H5\src\services\logs.js
 * @描述: 日志输出
 */

import { LogLevels, BuildEnv } from "@js/services/enums";

class Log {
    level;

    constructor() {
        if (config.buildEnv === BuildEnv.DEVELOPMENT) {
            this.level = LogLevels.DEBUG;
        } else if (config.buildEnv === BuildEnv.TEST) {
            this.level = LogLevels.INFO;
        } else {
            this.level = LogLevels.ERROR;
        }
    }

    print(logLevel, ...contents) {
        if (!window.console || !window.console.log) {
            return;
        }
        if (logLevel < this.level) {
            return;
        }
        console.log(...contents);
    }
}
const log = new Log();
export default {
    debug(...contents) {
        log.print(LogLevels.DEBUG, "DEBUG: ");
        log.print(LogLevels.DEBUG, ...contents);
    },

    info(...contents) {
        log.print(LogLevels.INFO, "INFO: ");
        log.print(LogLevels.INFO, ...contents);
    },

    warn(...contents) {
        log.print(LogLevels.WARN, "WARN: ");
        log.print(LogLevels.WARN, ...contents);
    },

    error(...contents) {
        log.print(LogLevels.ERROR, "ERROR: ");
        log.print(LogLevels.ERROR, ...contents);
    },

    fatal(...contents) {
        log.print(LogLevels.FATAL, "FATAL: ");
        log.print(LogLevels.FATAL, ...contents);
    }
};
