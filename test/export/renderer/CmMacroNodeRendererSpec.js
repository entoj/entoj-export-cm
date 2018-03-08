'use strict';

/**
 * Requirements
 */
const CmMacroNodeRenderer = require(CM_SOURCE + '/export/renderer/CmMacroNodeRenderer.js').CmMacroNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(CmMacroNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(CmMacroNodeRenderer, 'export.renderer/CmMacroNodeRenderer', undefined, require('./RendererHelper.js').options());
});
