//服务提供者接口

export class ServiceProvider {
    /**
     * @param {Core} core Core类
     */
    constructor(core, options = {}) {
        this.core = core;
        this.options = options;
    }

    /**
     * 服务名称（数组）
     * @return {string[]}
     */
    provides() {
        return [];
    }

    /**
     * 服务依赖的其他服务
     */
    depends() {
        return [];
    }

    //初始化服务
    async init() {
    }

    //启动服务
    start() {
    }

    //销毁服务提供者
    destroy() {
    }

}