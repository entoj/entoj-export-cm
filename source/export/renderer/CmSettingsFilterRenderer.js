'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('entoj-export-jsp').export.renderer.JspFilterNodeRenderer;
const co = require('co');


/**
 * Renders |settings filters
 */
class CmSettingsFilterRenderer extends JspFilterNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/CmSettingsFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['settings'];
    }


    /**
     * @return {Promise<String>}
     */
    render(node, configuration)
    {
        if (!node || !configuration)
        {
            return Promise.resolve('');
        }
        const scope = this;
        const promise = co(function*()
        {
            let result = '';
            const filter = node.find('FilterNode', { name: scope.filterName });
            if (!filter)
            {
                throw new Error('Could not locate settings filter in ' + node.type);
            }

            // Get data
            const key = yield configuration.renderer.renderNode(filter.value, configuration);
            const context = (filter.arguments.length)
                ? yield configuration.renderer.renderNode(filter.arguments[0].value, configuration)
                : 'self';

            // Render
            result+= 'bp:setting(' + context + ', ' + key + ')';

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmSettingsFilterRenderer = CmSettingsFilterRenderer;
