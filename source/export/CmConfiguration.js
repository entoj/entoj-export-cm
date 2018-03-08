'use strict';

// Requirements
const JspConfiguration = require('entoj-export-jsp').export.JspConfiguration;
const co = require('co');


/**
 * @memberOf export.fluid
 * @extends export.Configuration
 */
class CmConfiguration extends JspConfiguration
{
    /**
     * @inheritDoc
     */
    static get className()
    {
        return 'export/CmConfiguration';
    }


    /**
     * @inheritDoc
     */
    generateType(configuration, overrides)
    {
        // Override type via settings
        if (overrides && typeof overrides.type === 'string')
        {
            configuration.type = overrides.type;
        }

        // add namespace
        configuration.namespace = '';
        if (configuration.type)
        {
            const typeParts = configuration.type.split('.');
            if (typeParts.length > 1)
            {
                configuration.type = typeParts.pop();
                configuration.namespace = typeParts.join('.');
            }
        }

        return configuration;
    }


    /**
     * @inheritDoc
     */
    generateViewProperties(configuration, overrides)
    {
        // get export configs
        const exportConfigs = (configuration.macro && this.macro && configuration.macro.name !== this.macro.name)
            ? configuration.entity.properties.getByPath('export.' + this.identifier + '', [])
            : [];
        let macroConfigurationAvailable = false;

        // add view
        if (typeof configuration.view !== 'string')
        {
            if (exportConfigs.length)
            {
                // use the view settings for the designated macro
                if (configuration.macro)
                {
                    const item = this.filterExportConfigByMacroName(exportConfigs, configuration.macro.name);
                    if (item)
                    {
                        configuration.view = item.view;
                        configuration.viewVariant = item.viewVariant || false;
                        macroConfigurationAvailable = true;
                    }
                    // if there is no match use the settings of the first config
                    else
                    {
                        configuration.view = exportConfigs[0].view || false;
                    }
                }
                // if there is no match use the settings of the first config
                else
                {
                    configuration.view = exportConfigs[0].view || false;
                }
            }
            // when we have a mscoe generate from name
            if (!configuration.view && configuration.macro)
            {
                configuration.view = configuration.macro.name.dasherize();
            }
            // otherwise generate from entity name
            if (!configuration.view)
            {
                configuration.view = configuration.entity.idString.dasherize();
            }
        }

        // Override view via settings
        if (overrides && typeof overrides.view === 'string')
        {
            configuration.view = overrides.view;
        }

        // add viewVariant
        if (!configuration.viewVariant && !macroConfigurationAvailable)
        {
            // if possible get the viewVariant of the first export
            if (exportConfigs && exportConfigs.length)
            {
                configuration.viewVariant = exportConfigs[0].viewVariant || false;
            }
        }

        // Override viewVariant via settings
        if (overrides && typeof overrides.viewVariant === 'string')
        {
            configuration.viewVariant = overrides.viewVariant;
        }

        return configuration;
    }


    /**
     * filters the configuration, provided by the entity.json, for the designated marco
     * @param exportConfig
     * @param macroName
     */
    filterExportConfigByMacroName(exportConfig, macroName)
    {
        return exportConfig.find(item =>
        {
            if (item.macro && item.macro == macroName)
            {
                return item;
            }
        });
    }


    /**
     * @inheritDoc
     */
    generateFilename(configuration)
    {
        if (!this.settings.filename)
        {
            configuration.filename = '';
            if (configuration.entity)
            {
                configuration.filename+= this.renderTemplate(configuration, this.moduleConfiguration.basePathTemplate);
            }
            if (configuration.namespace)
            {
                configuration.filename+= configuration.namespace + '/';
            }
            configuration.filename+= configuration.type;
            if (configuration.viewVariant || configuration.view)
            {
                configuration.filename+= '.';
            }
            if (configuration.view)
            {
                configuration.filename+= configuration.view;
            }
            if (configuration.viewVariant)
            {
                configuration.filename+= '[' + configuration.viewVariant + ']';
            }
            if (!configuration.filename.endsWith('.jsp'))
            {
                configuration.filename+= '.jsp';
            }
        }
        return configuration;
    }


    /**
     * @inheritDoc
     */
    refineConfiguration(configuration)
    {
        const superPromise = super.refineConfiguration(configuration);
        const scope = this;
        const promise = co(function*()
        {
            let result = yield superPromise;

            // defaults
            result.includeMode = 'jsp-include';

            // refine macros
            if (result.macro)
            {
                // get macro settings
                const macroSettings = (scope.settings.settings && scope.settings.settings[result.macro.name])
                    ? scope.settings.settings[result.macro.name]
                    : {};

                // add modelParameter
                result.modelParameter = result.macro.parameters.find(param => param.name === 'model');

                // add type based on modelParameter
                if (!result.type)
                {
                    if (result.modelParameter &&
                        result.modelParameter.type.length &&
                        result.modelParameter.type[0] != '*')
                    {
                        result.type = result.modelParameter.type[0];
                    }
                    else
                    {
                        result.type = 'Object';
                    }
                }

                // generate type
                result = scope.generateType(result, macroSettings);

                // set includeMode
                if (result.namespace.length || result.macro.name.endsWith('_dispatcher'))
                {
                    result.includeMode = 'cm-include';
                }

                // set cm specifics
                if (result.includeMode == 'cm-include')
                {
                    result = scope.generateViewProperties(result, macroSettings);
                    result = scope.generateFilename(result, macroSettings);
                }
            }
            // refine templates
            else
            {
                result = scope.generateType(result);
                result = scope.generateViewProperties(result);
                result = scope.generateFilename(result);
            }
            return result;
        });
        return promise;
    }
}


// Exports
module.exports.CmConfiguration = CmConfiguration;
