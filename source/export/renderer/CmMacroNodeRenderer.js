'use strict';

/**
 * Requirements
 * @ignore
 */
const JspMacroNodeRenderer = require('entoj-export-jsp').export.renderer.JspMacroNodeRenderer;
const prepareParameters = require('entoj-export-jsp').export.renderer.helper.prepareParameters;
const co = require('co');
const EOL = '\n';


/**
 * Renders a macro
 */
class CmMacroNodeRenderer extends JspMacroNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/CmMacroNodeRenderer';
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
            // Prepare
            let result = '';
            const macroConfiguration = yield configuration.getMacroConfiguration(node.name);

            // Render parameters
            const parameters = yield prepareParameters(node, macroConfiguration, configuration);
            result+= yield configuration.renderer.renderComment('macro ' + node.name + ' parameters');
            for (const paramName in parameters)
            {
                if (parameters[paramName] === 'null')
                {
                    continue;
                }
                result+= '<c:set var="' + paramName + '" ';
                result+= 'value="${ not empty ' + paramName + ' ? ' + paramName + ' : ' + parameters[paramName].value + ' }" />' + EOL;
            }
            result+= yield configuration.renderer.renderComment('/macro ' + node.name + ' parameters', configuration);

            // Render children
            result+= yield configuration.renderer.renderComment('macro ' + node.name + ' body', configuration);
            result+= yield configuration.renderer.renderList(node.children, configuration);
            result+= yield configuration.renderer.renderComment('/macro ' + node.name + ' body', configuration);

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmMacroNodeRenderer = CmMacroNodeRenderer;
