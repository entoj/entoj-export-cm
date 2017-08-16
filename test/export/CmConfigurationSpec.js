'use strict';

/**
 * Requirements
 */
const CmConfiguration = require(CM_SOURCE + '/export/CmConfiguration.js').CmConfiguration;
const CmModuleConfiguration = require(CM_SOURCE + '/configuration/CmModuleConfiguration.js').CmModuleConfiguration;
const configurationSpec = require('entoj-system/test').export.ConfigurationShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(CmConfiguration.className, function()
{
    /**
     * Configuration Test
     */
    function prepareParameters(parameters)
    {
        const fixture = projectFixture.createStatic(true);
        const moduleConfiguration = new CmModuleConfiguration(fixture.globalConfiguration);
        if (parameters && parameters.length)
        {
            parameters.push(moduleConfiguration);
            return parameters;
        }
        else
        {
            return [undefined, undefined, {}, undefined, undefined, undefined, fixture.globalRepository, fixture.buildConfiguration, moduleConfiguration];
        }
    }

    configurationSpec(CmConfiguration, 'export/CmConfiguration', prepareParameters, { identifier: 'cm' });
});
