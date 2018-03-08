'use strict';

/**
 * Requirements
 */
const CmMetadataFilterRenderer = require(CM_SOURCE + '/export/renderer/CmMetadataFilterRenderer.js').CmMetadataFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(CmMetadataFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(CmMetadataFilterRenderer, 'export.renderer/CmMetadataFilterRenderer', undefined, require('./RendererHelper.js').options());
});
