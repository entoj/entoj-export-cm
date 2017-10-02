'use strict';

/**
 * Requirements
 */
const CmConfiguration = require(CM_SOURCE + '/export/CmConfiguration.js').CmConfiguration;
const CmModuleConfiguration = require(CM_SOURCE + '/configuration/CmModuleConfiguration.js').CmModuleConfiguration;
const configurationSpec = require('entoj-system/test').export.ConfigurationShared;
const projectFixture = require('entoj-system/test').fixture.project;
const co = require('co');


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
        const moduleConfiguration = new CmModuleConfiguration(fixture.globalConfiguration, fixture.buildConfiguration);
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

    /**
     * CmConfiguration Test
     */
    describe('getMacroConfiguration', function()
    {
        xit('should use the first configured export as the default if not configured via export.settings', function()
        {
            const promise = co(function *()
            {
                const identifier = 'cm';
                const globalSettings =
                {
                    base:
                    {
                        export:
                        {
                            settings:
                            {
                                [identifier]:
                                {
                                    type: 'global.namespace.Type'
                                }
                            },
                            [identifier]:
                            [
                                {
                                    view: 'global.html'
                                }
                            ]
                        }
                    }
                };
                configurationSpec.createEntity('base/elements/e-headline', ['e_headline'], globalSettings);
                const settings = {};
                const entity = yield global.fixtures.entitiesRepository.getById('e-headline', global.fixtures.siteBase);
                const macro = yield global.fixtures.globalRepository.resolveMacro(global.fixtures.siteBase, 'e_headline');
                const testee = configurationSpec.createTestee(entity, macro, settings);
                const config = yield testee.getMacroConfiguration();
                expect(config.view).to.be.equal('global.html');
            });
            return promise;
        });
    });
});
