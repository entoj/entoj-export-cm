'use strict';

/**
 * Requirements
 */
const CmMarkupFilterRenderer = require(CM_SOURCE + '/export/renderer/CmMarkupFilterRenderer.js').CmMarkupFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(CmMarkupFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(CmMarkupFilterRenderer, 'export.renderer/CmMarkupFilterRenderer', undefined, require('./RendererHelper.js').options());
});
