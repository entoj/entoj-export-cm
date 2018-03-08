'use strict';

/**
 * Requirements
 */
const CmNavigationClassFilterRenderer = require(CM_SOURCE + '/export/renderer/CmNavigationClassFilterRenderer.js').CmNavigationClassFilterRenderer;
const nodeRendererSpec = require('entoj-system/test').export.NodeRendererShared;


/**
 * Spec
 */
describe(CmNavigationClassFilterRenderer.className, function()
{
    /**
     * NodeRenderer Test
     */
    nodeRendererSpec(CmNavigationClassFilterRenderer, 'export.renderer/CmNavigationClassFilterRenderer', undefined, require('./RendererHelper.js').options());
});
