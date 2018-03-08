'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('entoj-export-jsp').export.renderer.JspFilterReplacementRenderer;
const co = require('co');


/**
 * Renders the |markup filter.
 */
class CmMarkupFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/CmMarkupFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['markup'];
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
                throw new Error('Could not locate markup filter in ' + node.type);
            }

            // Get data
            const filterName = (filter.arguments.length)
                ? yield configuration.renderer.renderNode(filter.arguments[0].value, configuration)
                : '\'tkPlain\'';

            // Render
            if (scope.isSet(node, configuration))
            {
                result+= '<c:set var="';
                result+= yield configuration.renderer.renderNode(node.variable, configuration);
                result+= '">';
            }
            result+= '<cm:include self="${ ';
            result+= yield configuration.renderer.renderNode(filter.value, configuration);
            result+= ' }" view="${ ' + filterName + ' }" />';
            if (scope.isSet(node, configuration))
            {
                result+= '</c:set>';
            }

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmMarkupFilterRenderer = CmMarkupFilterRenderer;
