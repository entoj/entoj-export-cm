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
     * @inheritDocs
     */
    static get className()
    {
        return 'export/CmConfiguration';
    }


    /**
     * @inheritDocs
     */
    refineConfiguration(configuration)
    {
        const superPromise = super.refineConfiguration(configuration);
        const scope = this;
        const promise = co(function*()
        {
            const result = yield superPromise;

            // defaults
            result.includeMode = 'jsp-include';

            // refine macros
            if (result.macro)
            {
                // add modelParameter
                result.modelParameter = result.macro.parameters.find(param => param.name === 'model');

                // add type
                if (!result.type)
                {
                    if (result.modelParameter && result.modelParameter.type.length && result.modelParameter.type[0] != '*')
                    {
                        result.type = result.modelParameter.type[0];
                    }
                    else
                    {
                        result.type = 'Object';
                    }
                }

                // add namespace
                const typeParts = result.type.split('.');
                if (typeParts.length > 1)
                {
                    result.type = typeParts.pop();
                    result.namespace = typeParts.join('.');
                }
                else
                {
                    result.namespace = '';
                }

                // set includeMode
                if (result.type != 'Object')
                {
                    result.includeMode = 'cm-include';
                }

                if (result.includeMode == 'cm-include')
                {
                    // add view
                    if (!result.view)
                    {
                        result.view = result.macro.name.dasherize();
                    }

                    // Override view via settings
                    if (scope.settings.settings &&
                        scope.settings.settings.view &&
                        scope.settings.settings.view[result.macro.name])
                    {
                        result.view = scope.settings.settings.view[result.macro.name];
                    }

                    // create filename
                    if (!scope.settings.filename)
                    {
                        result.filename = '';
                        if (result.namespace)
                        {
                            result.filename = result.namespace + '/';
                        }
                        result.filename+= result.type + '.' + result.view;
                        if (result.viewVariant)
                        {
                            result.filename+= '[' + result.viewVariant + ']';
                        }
                        if (!result.filename.endsWith('.jsp'))
                        {
                            result.filename+= '.jsp';
                        }
                    }
                }
            }

            return result;
        });
        return promise;
    }
}


// Exports
module.exports.CmConfiguration = CmConfiguration;
