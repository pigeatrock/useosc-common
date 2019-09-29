import { Graph, Node } from 'async-dependency-graph';

export const resolveTreeByKey = (tree, key, defaultValue) => {
    let result;

    try {
        result = key
            .split(/\./g)
            .reduce((result, key) => result[key], Object.assign({}, tree));
    } catch (e) { }

    return typeof result === 'undefined' ? defaultValue : result;
};

const each = (list, method) => Promise.all(list.map(p => {
    try {
        return p.provider[method]();
    } catch (e) {
        return Promise.reject(e);
    }
}))
    .catch(err => console.warn(err));

export const providerHandler = (core) => {
    let instances = {};
    let providers = [];
    let registry = [];

    //list => providers [{provider: new ref(core, options.args),options}]
    const createGraph = (list, method) => {
        const graph = new Graph();
        const provides = list.map(p => typeof p.provider.provides === 'function' ? p.provider.provides() : []);
        const dependsOnIndex = wants => provides.findIndex(arr => arr.some(a => wants.indexOf(a) !== -1));

        list.forEach((p, i) => {
            graph.addNode(new Node(String(i), () => {
                try {
                    return Promise.resolve(p.provider[method]());
                } catch (e) {
                    return Promise.reject(e);
                }
            }));
        });

        list.forEach((p, i) => {
            const dependsOptions = p.options.depends instanceof Array
                ? p.options.depends
                : [];

            const dependsInstance = typeof p.provider.depends === 'function'
                ? p.provider.depends()
                : [];

            const depends = [...dependsOptions, ...dependsInstance];
            if (depends.length > 0) {
                const dindex = dependsOnIndex(depends);
                if (dindex !== -1) {
                    graph.addDependency(String(i), String(dindex));
                }
            }
        });
        return graph.traverse()
            .catch(e => console.warn(e));
    };

    const handle = list => createGraph(list, 'init')
        .then(() => createGraph(list, 'start'));


    const has = name => registry.findIndex(p => p.name === name) !== -1;
    const destroy = () => {
        each(providers, 'destroy');

        instances = {};
        registry = [];
    };

    const init = (before) =>
        handle(before
            ? providers.filter(p => p.options.before)
            : providers.filter(p => !p.options.before));

    const register = (ref, options) => {
        try {
            providers.push({
                provider: new ref(core, options.args),
                options
            });
        } catch (e) {
            console.error('服务注册失败', e);
        }
    };

    const bind = (name, singleton, callback) => {
        core.logger.info('服务绑定', name);

        registry.push({
            singleton,
            name,
            make(...args) {
                return callback(...args);
            }
        })
    };

    const make = (name, ...args) => {
        const found = registry.find(p => p.name === name);
        if (!found) {
            throw new Error(`服务'${name}'没有找到`);
        }

        if (!found.singleton) {
            return found.make(...args);
        }

        if (!instances[name]) {
            if (found) {
                instances[name] = found.make(...args);
            }
        }

        return instances[name];
    };

    return { register, init, bind, has, make, destroy };
};