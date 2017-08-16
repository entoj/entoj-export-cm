'use strict';

/**
 * Requirements
 * @ignore
 */
const JspCallNodeRenderer = require('entoj-export-jsp').export.renderer.JspCallNodeRenderer;
const prepareArguments = require('entoj-export-jsp').export.renderer.helper.prepareArguments;
const MissingConfigurationError = require('entoj-system').error.MissingConfigurationError;
const co = require('co');


/**
 * Renders a macro call
 */
class CmCallNodeRenderer extends JspCallNodeRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export.renderer/CmCallNodeRenderer';
    }


    /**
     * @return {Promise<Boolean>}
     */
    willRender(node, configuration)
    {
        const promise = co(function*()
        {
            // Only handle calls
            if (!node ||
                !node.is('CallNode'))
            {
                return false;
            }

            // Check if include mode is cm
            const macroConfiguration = yield configuration.getMacroConfiguration(node.name);
            return macroConfiguration && macroConfiguration.includeMode == 'cm-include';
        });
        return promise;
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

            // Get macro
            const macroConfiguration = yield configuration.getMacroConfiguration(node.name);
            if (!macroConfiguration)
            {
                throw new MissingConfigurationError('CallNodeRenderer::render - no configuration for macro ' + node.name + ' found.');
            }

            // Get self
            let self = '${ self }';
            const modelArgument = node.arguments.find(arg => arg.name === 'model');
            if (modelArgument && modelArgument.value)
            {
                self = '${ ';
                self+= yield configuration.renderer.renderNode(modelArgument.value, configuration);
                self+= ' }';
            }

            // Get arguments
            const args = yield prepareArguments(node, macroConfiguration, configuration, 'literals');

            // Render
            result+= '<cm:include self="' + self + '" view="' + macroConfiguration.view + '">';
            for (const arg in args)
            {
                result+= '<cm:param name="' + arg + '" value="${ ' + args[arg].value + ' }" />';
            }
            result+= '</cm:include>';

            return result;
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmCallNodeRenderer = CmCallNodeRenderer;
