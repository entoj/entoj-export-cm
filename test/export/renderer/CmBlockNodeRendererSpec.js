'use strict';

/**
 * Requirements
 */
const CmBlockNodeRenderer = require(CM_SOURCE + '/export/renderer/CmBlockNodeRenderer.js').CmBlockNodeRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(CmBlockNodeRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(CmBlockNodeRenderer, 'export.renderer/CmBlockNodeRenderer', undefined, require('./RendererHelper.js').options());
});
