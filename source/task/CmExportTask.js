'use strict';

/**
 * Requirements
 * @ignore
 */
const CmExporter = require('../export/CmExporter.js').CmExporter;
const ExportTask = require('entoj-system').task.ExportTask;
const GlobalRepository = require('entoj-system').model.GlobalRepository;
const CliLogger = require('entoj-system').cli.CliLogger;
const BuildConfiguration = require('entoj-system').model.configuration.BuildConfiguration;


/**
 * @memberOf task
 */
class CmExportTask extends ExportTask
{
    /**
     * @param {cli.CliLogger} cliLogger
     * @param {model.GlobalRepository} globalRepository
     */
    constructor(cliLogger, globalRepository, buildConfiguration, CmExporter)
    {
        super(cliLogger, globalRepository, CmExporter);
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': [CliLogger, GlobalRepository, BuildConfiguration, CmExporter] };
    }


    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'task/CmExportTask';
    }


    /**
     * @inheritDocs
     */
    get sectionName()
    {
        return 'Exporting CoreMedia files';
    }


    /**
     * @inheritDocs
     */
    get exportName()
    {
        return 'cm';
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmExportTask = CmExportTask;
