'use strict';

/**
 * Requirements
 */
const CmSettingsFilterRenderer = require(CM_SOURCE + '/export/renderer/CmSettingsFilterRenderer.js').CmSettingsFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(CmSettingsFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(CmSettingsFilterRenderer, 'export.renderer/CmSettingsFilterRenderer', undefined, require('./RendererHelper.js').options());
});
