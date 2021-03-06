'use strict';

/**
 * Requirements
 */
const CmRenderer = require(CM_SOURCE + '/export/CmRenderer.js').CmRenderer;
const CmConfiguration = require(CM_SOURCE + '/export/CmConfiguration.js').CmConfiguration;
const CmModuleConfiguration = require(CM_SOURCE + '/configuration/CmModuleConfiguration.js').CmModuleConfiguration;
const CmNodeRenderers = require(CM_SOURCE + '/export/renderer/index.js');
const rendererSpec = require('entoj-system/test').export.RendererShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(CmRenderer.className, function()
{
    /**
     * Renderer Test
     */
    const fixtureConfiguration =
    {
        settings:
        {
            cm:
            {
                assetsBaseUrl: '/base/global/assets'
            }
        }
    };
    const testFixtures =
    {
        'should render conditions': 'conditions',
        'should render loops': 'loops',
        'should render filter': 'filter',
        'should render assignments': 'assignments',
        'should render calls': 'calls'
    };
    const options =
    {
        configurationCreator: function(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration)
        {
            const moduleConfiguration = new CmModuleConfiguration(global.fixtures.globalConfiguration, buildConfiguration);
            return new CmConfiguration(entity, macro, settings, parser, renderer, transformer, globalRepository, buildConfiguration, moduleConfiguration);
        },
        fixtureInputPath: CM_FIXTURES + '/renderer',
        fixtureExpectedPath: CM_FIXTURES + '/renderer',
        createFixture: () => projectFixture.createDynamic(fixtureConfiguration)
    };
    const prepareParameters = (parameters) =>
    {
        return [global.fixtures.context.createInstances(CmNodeRenderers.rendererList)];
    };
    beforeEach(function()
    {
        const options =
        {
            settings:
            {
                cm:
                {
                    configurationName: 'cm'
                }
            }
        };
        global.fixtures = projectFixture.createDynamic(options);
    });
    rendererSpec(CmRenderer, 'export/CmRenderer', prepareParameters, testFixtures, options);
});
