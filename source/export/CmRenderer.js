'use strict';

// Requirements
const JspRenderer = require('entoj-export-jsp').export.JspRenderer;
const co = require('co');


/**
 * @memberOf export
 * @extends export.Renderer
 */
class CmRenderer extends JspRenderer
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export/CmRenderer';
    }


    /**
     * @inheritDoc
     */
    renderPreface(configuration)
    {
        const superPromise = super.renderPreface(configuration);
        const promise = co(function*()
        {
            let result = yield superPromise;
            result+= '<%@ taglib prefix="cm" uri="http://www.coremedia.com/2004/objectserver-1.0-2.0"%>';
            result+= '<%@ taglib prefix="bp" uri="http://www.coremedia.com/2012/blueprint"%>';
            result+= '<%--@elvariable id="settingsService" type="com.coremedia.blueprint.base.settings.SettingsService"--%>';
            if (configuration.macro)
            {
                const macroConfiguration = yield configuration.getMacroConfiguration(configuration.macro.name);
                if (macroConfiguration && macroConfiguration.namespace && macroConfiguration.type)
                {
                    result+='<%--@elvariable id="self" type="' + macroConfiguration.namespace + '.' + macroConfiguration.type + '"--%>';
                    result+='<%--@elvariable id="model" type="' + macroConfiguration.namespace + '.' + macroConfiguration.type + '"--%>';
                }
            }
            return result;
        });
        return promise;
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': ['export/CmRenderer.nodeRenderers', 'export/CmRenderer.options'] };
    }
}


// Exports
module.exports.CmRenderer = CmRenderer;
