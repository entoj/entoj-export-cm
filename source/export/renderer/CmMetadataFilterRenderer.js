'use strict';

/**
 * Requirements
 * @ignore
 */
const JspFilterReplacementRenderer = require('entoj-export-jsp').export.renderer.JspFilterReplacementRenderer;
const trimQuotes = require('entoj-system').utils.string.trimQuotes;
const co = require('co');


/**
 * Renders |metadata filters
 */
class CmMetadataFilterRenderer extends JspFilterReplacementRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/CmMetadataFilterRenderer';
    }


    /**
     * @type {Boolean|Array}
     */
    get filterName()
    {
        return ['metadata'];
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
                throw new Error('Could not locate metadata filter in ' + node.type);
            }

            // Get data
            const metadataName = filter.value.is('LiteralNode')
                ? filter.value.value
                : trimQuotes(yield configuration.renderer.renderNode(filter.value, configuration));
            if (typeof metadataName !== 'string')
            {
                return result;
            }

            // Render
            if (metadataName === 'entity')
            {
                result+= '<cm:metadata value="${ self.content }" />';
            }
            else if (metadataName.indexOf('.') > -1)
            {
                result+= '<cm:metadata value="${ ' + metadataName + ' }" />';
            }
            else
            {
                result+= '<cm:metadata value="properties.' + metadataName + '" />';
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
module.exports.CmMetadataFilterRenderer = CmMetadataFilterRenderer;
