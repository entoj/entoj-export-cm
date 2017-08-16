'use strict';

/**
 * Requirements
 */
const CmExporter = require(CM_SOURCE + '/export/CmExporter.js').CmExporter;
const CmModuleConfiguration = require(CM_SOURCE + '/configuration/CmModuleConfiguration.js').CmModuleConfiguration;
const CmRenderer = require(CM_SOURCE + '/export/CmRenderer.js').CmRenderer;
const CmTransformer = require(CM_SOURCE + '/export/CmTransformer.js').CmTransformer;
const DocumentationCallable = require('entoj-system').model.documentation.DocumentationCallable;
const exporterSpec = require('entoj-system/test').export.ExporterShared;
const projectFixture = require('entoj-system/test').fixture.project;
const co = require('co');
const fs = require('fs');
const UPDATE_SPECS = false;


/**
 * Spec
 */
describe(CmExporter.className, function()
{
    /**
     * Exporter Test
     */
    function prepareParameters(parameters, fullyConfigure)
    {
        const options =
        {
            settings:
            {
                cm:
                {
                    configurationName: 'default'
                }
            }
        };
        if (fullyConfigure)
        {
            options.mappings =
            [
                {
                    type: require(CM_SOURCE + '/export/CmRenderer.js').CmRenderer,
                    '!nodeRenderers': require(CM_SOURCE + '/export/renderer/index.js').rendererList
                },
                {
                    type: require(CM_SOURCE + '/export/CmTransformer.js').CmTransformer,
                    '!nodeTransformers': require(CM_SOURCE + '/export/transformer/index.js').transformerList
                }
            ];
        }
        const fixture = projectFixture.createDynamic(options);
        const moduleConfiguration = fixture.context.di.create(CmModuleConfiguration);
        const jspRenderer = fixture.context.di.create(CmRenderer);
        const jspTransformer = fixture.context.di.create(CmTransformer);
        if (parameters && parameters.length)
        {
            parameters.push(moduleConfiguration, jspRenderer, jspTransformer);
            return parameters;
        }
        else
        {
            return [fixture.globalRepository, fixture.buildConfiguration, moduleConfiguration, jspRenderer, jspTransformer];
        }
    }
    exporterSpec(CmExporter, 'export/CmExporter', prepareParameters);


    /**
     * CmExporter Test
     */
    function expectFixture(fixture, entityQuery, macroQuery, settings)
    {
        const promise = co(function*()
        {
            const testee = new CmExporter(...prepareParameters(undefined, true));
            const result = yield testee.export('base', entityQuery, macroQuery, settings);
            if (UPDATE_SPECS)
            {
                fs.writeFileSync(CM_FIXTURES + '/exporter/' + fixture + '.jsp', result.contents, { encoding: 'utf8' });
            }
            expect(result.contents).to.be.equal(fs.readFileSync(CM_FIXTURES + '/exporter/' + fixture + '.jsp', { encoding: 'utf8' }));
            return result;
        });
        return promise;
    }

    describe('#export', function()
    {
        it('should export the default macro of given entity', function()
        {
            const promise = co(function*()
            {
                const result = yield expectFixture('default-macro', 'e-image', undefined, undefined);
                expect(result.configuration.macro).to.be.instanceof(DocumentationCallable);
                expect(result.configuration.macro.name).to.be.equal('e_image');
            });
            return promise;
        });


        it('should export the configured macro of given entity', function()
        {
            const promise = co(function*()
            {
                const result = yield expectFixture('selected-macro', 'm-teaser', 'm_teaser_hero', undefined);
                expect(result.configuration.macro).to.be.instanceof(DocumentationCallable);
                expect(result.configuration.macro.name).to.be.equal('m_teaser_hero');
            });
            return promise;
        });


        it('should allow to preconfigure macro parameters values', function()
        {
            const promise = co(function*()
            {
                const settings =
                {
                    parameters:
                    {
                        classes: 'configured'
                    }
                };
                yield expectFixture('macro-arguments', 'e-image', undefined, settings);
            });
            return promise;
        });


        it('should allow to export templates', function()
        {
            const promise = co(function*()
            {
                const settings =
                {
                };
                yield expectFixture('template', 't-bare', undefined, settings);
            });
            return promise;
        });
    });
});
