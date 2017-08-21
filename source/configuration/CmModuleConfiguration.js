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
     * @param  {model.configuration.GlobalConfiguration} globalConfiguration
     */
    constructor(globalConfiguration, buildConfiguration)
    {
        super(globalConfiguration, buildConfiguration, { prefix: 'cm' });
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': [GlobalConfiguration, BuildConfiguration] };
    }


    /**
     * @inheritDocss
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
