'use strict';

/**
 * Requirements
 * @ignore
 */
const JspModuleConfiguration = require('entoj-export-jsp').configuration.JspModuleConfiguration;
const GlobalConfiguration = require('entoj-system').model.configuration.GlobalConfiguration;
const BuildConfiguration = require('entoj-system').model.configuration.BuildConfiguration;


/**
 * @memberOf configuration
 */
class CmModuleConfiguration extends JspModuleConfiguration
{
    /**
     * @param {model.configuration.GlobalConfiguration} globalConfiguration
     * @param {model.configuration.BuildConfiguration} buildConfiguration
     */
    constructor(globalConfiguration, buildConfiguration)
    {
        super(globalConfiguration, buildConfiguration, { prefix: 'cm' });

        // Create configuration
        this._basePathTemplate = buildConfiguration.get('cm.basePathTemplate', globalConfiguration.get('cm.basePathTemplate', '${site.name.urlify()}'));
    }


    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [GlobalConfiguration, BuildConfiguration] };
    }


    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'configuration/CmModuleConfiguration';
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.CmModuleConfiguration = CmModuleConfiguration;
