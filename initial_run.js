var fs = require('fs')
var _ = require('lodash')
var cxjs = require('./index.js')
var content = fs.readFileSync('small_graph.cx')
var rawCX = JSON.parse(content)
var utils = new cxjs.cyNetworkUtils()
var niceCX = utils.rawCXtoNiceCX(rawCX)
fs.writeFileSync('small_graph_nicecx.json', JSON.stringify(niceCX, null, 2))
//console.log(niceCX)
var cx2Js = new cxjs.cxToJs(utils)
var attributeNameMap = {}
var elements = cx2Js.cyElementsFromNiceCX(niceCX, attributeNameMap)
//console.log('Elements:')
fs.writeFileSync('small_graph_elements.json', JSON.stringify(elements, null, 2))
var style = cx2Js.cyStyleFromNiceCX(niceCX, attributeNameMap)
var edgeCSS = _.find(style, {'selector': 'edge'})
if (edgeCSS && edgeCSS.css && !edgeCSS.css['curve-style']) {
    edgeCSS.css['curve-style'] = 'bezier'
}
fs.writeFileSync('default_style', JSON.stringify(cx2Js.getDefaultStyle(), null, 2))
//console.log('Style:')
fs.writeFileSync('small_graph_style.json', JSON.stringify(style, null, 2))
var cxBGColor = cx2Js.cyBackgroundColorFromNiceCX(niceCX)
/** @namespace cxNetwork.cartesianLayout **/
var layoutName = (niceCX.cartesianLayout) ? 'preset' :
    (Object.keys(niceCX.edges).length <= 1000 ? 'cose' : 'circle') 

var cyLayout = {name: layoutName, animate: false, numIter: 50, coolingFactor: 0.9}
fs.writeFileSync('small_graph_layout.json', JSON.stringify(cyLayout, null, 2))
