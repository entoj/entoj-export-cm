'use strict';

// Requirements
const JspExporter = require('entoj-export-jsp').export.JspExporter;
const GlobalRepository = require('entoj-system').model.GlobalRepository;
const BuildConfiguration = require('entoj-system').model.configuration.BuildConfiguration;
const CmRenderer = require('./CmRenderer.js').CmRenderer;
const CmTransformer = require('./CmTransformer.js').CmTransformer;
const CmConfiguration = require('./CmConfiguration.js').CmConfiguration;
const CmModuleConfiguration = require('../configuration/CmModuleConfiguration.js').CmModuleConfiguration;


/**
 * @memberOf export
 * @extends export.Renderer
 */
class CmExporter extends JspExporter
{
    /**
     * @ignore
     */
    constructor(globalRepository, buildConfiguration, moduleConfiguration, renderer, transformer)
    {
        super(globalRepository, buildConfiguration, moduleConfiguration, renderer, transformer);

        // Assign options
        this._configurationClass = CmConfiguration;
    }


    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export/CmExporter';
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': [GlobalRepository, BuildConfiguration, CmModuleConfiguration, CmRenderer, CmTransformer] };
    }
}


// Exports
module.exports.CmExporter = CmExporter;
