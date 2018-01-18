'use strict';

// Requirements
const JspRenderer = require('entoj-export-jsp').export.JspRenderer;


/**
 * @memberOf export
 * @extends export.Renderer
 */
class CmRenderer extends JspRenderer
{
    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export/CmRenderer';
    }


    /**
     * @inheritDocs
     */
    renderPreface(configuration)
    {
        const promise = super.renderPreface(configuration)
            .then((source) =>
            {
                return configuration.getMacroConfiguration(configuration.macro.name).then((macroConfiguration) =>
                {
                    source+= '<%@ taglib prefix="cm" uri="http://www.coremedia.com/2004/objectserver-1.0-2.0"%>';
                    source+= '<%@ taglib prefix="bp" uri="http://www.coremedia.com/2012/blueprint"%>';
                    source+= '<!-- <%--@elvariable id="settingsService" type="com.coremedia.blueprint.base.settings.SettingsService"--%> -->';
                    if(macroConfiguration && macroConfiguration.namespace && macroConfiguration.type){
                        source+='<!-- <%--@elvariable id="self" type="' + macroConfiguration.namespace + '.' + macroConfiguration.type + '"--%> -->';
                        source+='<!-- <%--@elvariable id="model" type="' + macroConfiguration.namespace + '.' + macroConfiguration.type + '"--%> -->';
                    }
                    return source;
                });
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
