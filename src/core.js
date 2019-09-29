import { resolveTreeByKey, providerHandler } from './utils.js';
import { EventEmitter } from 'useosc-emitter';
import merge from 'deepmerge';
import omitDeep from 'omit-deep';

export class CoreBase extends EventEmitter {
    constructor(defaultConfiguration, configuration, options) {
        super('Core');

        // https://github.com/KyleAMathews/deepmerge#webpack-bug
        const merger = merge.default ? merge.default : merge;
        const omitted = omitDeep(defaultConfiguration, options.omit || []);

        this.logger = console;
        this.configuration = merger(omitted, configuration);
        this.options = options;
        this.booted = false;
        this.started = false;
        this.destroyed = false;
        this.providers = providerHandler(this);
    }

    //销毁core实例
    destroy() {
        if (this.destroyed) {
            return false;
        }

        this.booted = false;
        this.destroyed = true;
        this.started = false;
        this.providers.destroy();

        super.destroy(); //清除事件监听
        return true;
    }

    //启动useosc
    boot() {
        if (this.booted) {
            return Promise.resolve(true);
        }

        this.started = false;
        this.destroyed = false;
        this.booted = true;

        return this.providers.init(true)
            .then(() => true);
    }

    //启动所有的core服务
    start() {
        if (this.started) {
            return Promise.resolve(true);
        }

        this.started = true;

        return this.providers.init(false)
            .then(() => true);
    }

    //
    config(key, defaultValue) {
        return key
            ? resolveTreeByKey(this.configuration, key, defaultValue)
            : Object.assign({}, this.configuration);
    }

    //注册一个服务提供者
    register(ref, options = {}) {
        this.providers.register(ref, options);
    }

    //为服务注册新的实例工厂
    instance(name, callback) {
        this.providers.bind(name, false, callback);
    }

    //为服务注册新的单例实例工厂
    singleton(name, callback) {
        this.providers.bind(name, true, callback);
    }

    /**
     * @param 服务名称
     * @param args 构造参数
     * @return 服务实例
     */
    make(name, ...args) {
        return this.providers.make(name, ...args);
    }

    /**
     * 检测服务是否存在
     * @param name 服务名称
     * @return {Boolean}
     */
    has(name) {
        return this.providers.has(name);
    }
}