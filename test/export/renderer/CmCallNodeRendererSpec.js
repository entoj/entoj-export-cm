'use strict';

/**
 * Requirements
 */
const CmCallNodeRenderer = require(CM_SOURCE + '/export/renderer/CmCallNodeRenderer.js').CmCallNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(CmCallNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(CmCallNodeRenderer, 'export.renderer/CmCallNodeRenderer', undefined, require('./RendererHelper.js').options());
});
