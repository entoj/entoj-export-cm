'use strict';

/**
 * Requirements
 * @ignore
 */
const ExportCommand = require('entoj-system').command.ExportCommand;
const Context = require('entoj-system').application.Context;
const CmExportTask = require('../task/CmExportTask.js').CmExportTask;
const CmModuleConfiguration = require('../configuration/CmModuleConfiguration.js').CmModuleConfiguration;
const BeautifyHtmlTask = require('entoj-html').task.BeautifyHtmlTask;


/**
 * @memberOf command
 */
class CmExportCommand extends ExportCommand
{
    /**
     */
    constructor(context)
    {
        super(context);

        // Assign options
        this._exportName = 'cm';
        this._moduleConfigurationClass = CmModuleConfiguration;
        this._exportTaskClass = CmExportTask;
    }


    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [Context] };
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'command/CmExportCommand';
    }


    /**
     * @inheritDoc
     */
    addTaskOptions(options)
    {
        const result = options || {};
        result.exportMinimal = true;
        return Promise.resolve(result);
    }


    /**
     * @inheritDoc
     */
    addTasks(task, mapping)
    {
        if (!task)
        {
            return Promise.resolve();
        }
        return Promise.resolve(task.pipe(this.context.di.create(BeautifyHtmlTask, mapping)));
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmExportCommand = CmExportCommand;
