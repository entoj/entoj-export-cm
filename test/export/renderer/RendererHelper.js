'use strict';

/**
 * Exports
 * @ignore
 */
module.exports.options = function(dynamic, fixtureConfiguration)
{
    const result =
    {
        configurationCreator: function(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration)
        {
            const CmModuleConfiguration = require(CM_SOURCE + '/configuration/CmModuleConfiguration.js').CmModuleConfiguration;
            const CmConfiguration = require(CM_SOURCE + '/export/CmConfiguration.js').CmConfiguration;
            const moduleConfiguration = new CmModuleConfiguration(global.fixtures.globalConfiguration, buildConfiguration);
            return new CmConfiguration(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration, moduleConfiguration);
        },
        basePath: CM_FIXTURES + '/nodeRenderer'
    };
    if (dynamic === true)
    {
        result.createFixture = () => require('entoj-system/test').fixture.project.createDynamic(fixtureConfiguration);
    }
    else
    {
        result.createFixture = () => require('entoj-system/test').fixture.project.createStatic(fixtureConfiguration);
    }
    result.resultExtension = '.jsp';
    return result;
};
