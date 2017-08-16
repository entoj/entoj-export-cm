'use strict';

/**
 * Requirements
 */
const CmExportCommand = require(CM_SOURCE + '/command/CmExportCommand.js').CmExportCommand;
const exportCommandSpec = require('entoj-system/test').command.ExportCommandShared;
const projectFixture = require('entoj-system/test').fixture.project;


/**
 * Spec
 */
describe(CmExportCommand.className, function()
{
    /**
     * Command Test
     */
    function prepareParameters()
    {
        const fixture = projectFixture.createDynamic();
        return [fixture.context];
    }

    exportCommandSpec(CmExportCommand, 'command/CmExportCommand', prepareParameters, { action: 'jsp' });
});
