'use strict';

/**
 * Requirements
 * @ignore
 */
const CmExporter = require('../export/CmExporter.js').CmExporter;
const ExportTask = require('entoj-system').task.ExportTask;
const EntitiesRepository = require('entoj-system').model.entity.EntitiesRepository;
const GlobalRepository = require('entoj-system').model.GlobalRepository;
const CliLogger = require('entoj-system').cli.CliLogger;


/**
 * @memberOf task
 */
class CmExportTask extends ExportTask
{
    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [CliLogger, EntitiesRepository, GlobalRepository, CmExporter] };
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'task/CmExportTask';
    }


    /**
     * @inheritDoc
     */
    get sectionName()
    {
        return 'Exporting CoreMedia files';
    }


    /**
     * @inheritDoc
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
