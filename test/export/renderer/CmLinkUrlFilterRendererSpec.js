'use strict';

/**
 * Requirements
 */
const CmLinkUrlFilterRenderer = require(CM_SOURCE + '/export/renderer/CmLinkUrlFilterRenderer.js').CmLinkUrlFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(CmLinkUrlFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(CmLinkUrlFilterRenderer, 'export.renderer/CmLinkUrlFilterRenderer', undefined, require('./RendererHelper.js').options());
});
