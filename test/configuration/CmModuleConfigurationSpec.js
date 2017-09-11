'use strict';

/**
 * Requirements
 */
const CmModuleConfiguration = require(CM_SOURCE + '/configuration/CmModuleConfiguration.js').CmModuleConfiguration;
const baseSpec = require('entoj-system/test').BaseShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(CmModuleConfiguration.className, function()
{
    /**
     * Base Test
     */
    baseSpec(CmModuleConfiguration, 'configuration/CmModuleConfiguration', () =>
    {
        return [global.fixtures.globalConfiguration, global.fixtures.buildConfiguration];
    });


    beforeEach(function()
    {
        global.fixtures = projectFixture.createStatic();
    });
});
