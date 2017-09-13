'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterNodeRenderer = require('entoj-export-jsp').export.renderer.JspFilterNodeRenderer;
const co = require('co');


/**
 * Renders the |assetUrl filters
 */
class CmNavigationClassFilterRenderer extends JspFilterNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/CmNavigationClassFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['navigationClass'];
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
        const promise = co(function*()
        {
            let result = '';
            const args = [];
            for (const arg of node.arguments)
            {
                args.push(yield configuration.renderer.renderNode(arg.value, configuration));
            }
            result+= 'bp:cssClassAppendNavigationActive(\'\', ' +  args.join(', ') + ', ';
            result+= yield configuration.renderer.renderNode(node.value, configuration);
            result+= ', model.navigationPathList)';
            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmNavigationClassFilterRenderer = CmNavigationClassFilterRenderer;
