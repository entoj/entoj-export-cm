/**
 * @namespace export.renderer
 */
module.exports =
{
    CmBlockNodeRenderer: require('./CmBlockNodeRenderer.js').CmBlockNodeRenderer,
    CmCallNodeRenderer: require('./CmCallNodeRenderer.js').CmCallNodeRenderer,
    CmLinkUrlFilterRenderer: require('./CmLinkUrlFilterRenderer.js').CmLinkUrlFilterRenderer,
    CmMacroNodeRenderer: require('./CmMacroNodeRenderer.js').CmMacroNodeRenderer,
    CmMarkupFilterRenderer: require('./CmMarkupFilterRenderer.js').CmMarkupFilterRenderer,
    CmMetadataFilterRenderer: require('./CmMetadataFilterRenderer.js').CmMetadataFilterRenderer,
    CmNavigationClassFilterRenderer: require('./CmNavigationClassFilterRenderer.js').CmNavigationClassFilterRenderer,
    CmSettingsFilterRenderer: require('./CmSettingsFilterRenderer.js').CmSettingsFilterRenderer,

    rendererList:
    [
        require('./CmBlockNodeRenderer.js').CmBlockNodeRenderer,
        require('./CmCallNodeRenderer.js').CmCallNodeRenderer,
        require('./CmLinkUrlFilterRenderer.js').CmLinkUrlFilterRenderer,
        require('./CmMacroNodeRenderer.js').CmMacroNodeRenderer,
        require('./CmMetadataFilterRenderer.js').CmMetadataFilterRenderer,
        require('./CmMarkupFilterRenderer.js').CmMarkupFilterRenderer,
        require('./CmNavigationClassFilterRenderer.js').CmNavigationClassFilterRenderer,
        require('./CmSettingsFilterRenderer.js').CmSettingsFilterRenderer
    ].concat(require('entoj-export-jsp').export.renderer.rendererList)
};
