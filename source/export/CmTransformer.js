'use strict';

// Requirements
const JspTransformer = require('entoj-export-jsp').export.JspTransformer;


/**
 * @memberOf export
 * @extends export.Transformer
 */
class CmTransformer extends JspTransformer
{
    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'export/CmTransformer';
    }


    /**
     * @inheritDocs
     */
    static get injections()
    {
        return { 'parameters': ['export/CmTransformer.nodeTransformers'] };
    }
}


// Exports
module.exports.CmTransformer = CmTransformer;
