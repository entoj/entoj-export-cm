'use strict';

/**
 * Requirements
 * @ignore
 */
const NodeRenderer = require('entoj-system').export.renderer.NodeRenderer;
const co = require('co');


/**
 * renders template blocks
 */
class CmBlockNodeRenderer extends NodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/CmBlockNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        return Promise.resolve(node && node.is('BlockNode'));
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
            let result = yield configuration.renderer.renderComment('Block ' + node.name + ' start');
            if (node.children.length)
            {
                result+= yield configuration.renderer.renderList(node.children, configuration);
            }
            else
            {
                result+= '<c:if test="${ not empty self.placementMap.' + node.name + '.items }">';
                result+= '<cm:include self="${ self.placementMap.' + node.name + ' }" view="' + node.name + '"/>';
                result+= '</c:if>';
            }
            result+= yield configuration.renderer.renderComment('Block ' + node.name + ' end');
            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmBlockNodeRenderer = CmBlockNodeRenderer;
