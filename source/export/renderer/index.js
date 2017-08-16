/**
 * @namespace export.renderer
 */
module.exports =
{
    CmCallNodeRenderer: require('./CmCallNodeRenderer.js').CmCallNodeRenderer,
    CmMacroNodeRenderer: require('./CmMacroNodeRenderer.js').CmMacroNodeRenderer,
    CmLinkUrlFilterRenderer: require('./CmLinkUrlFilterRenderer.js').CmLinkUrlFilterRenderer,

    rendererList:
    [
        require('./CmCallNodeRenderer.js').CmCallNodeRenderer,
        require('./CmMacroNodeRenderer.js').CmMacroNodeRenderer,
        require('./CmLinkUrlFilterRenderer.js').CmLinkUrlFilterRenderer
    ].concat(require('entoj-export-jsp').export.renderer.rendererList)
};
