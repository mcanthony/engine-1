/* gss-engine - version 1.0.4-beta (2014-07-04) - http://gridstylesheets.org */
/**
 * Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)
 * Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros
 *
 * Use of this source code is governed by http://www.apache.org/licenses/LICENSE-2.0
 *
 * This is a compiled version of Cassowary/JS. For source versions or to
 * contribute, see the github project:
 *
 *  https://github.com/slightlyoff/cassowary-js-refactor
 *
 */

(function() {
!function(a){"use strict";try{!function(){}.bind(a)}catch(b){Object.defineProperty(Function.prototype,"bind",{value:function(a){var b=this;return function(){return b.apply(a,arguments)}},enumerable:!1,configurable:!0,writable:!0})}var c="undefined"!=typeof a.HTMLElement,d=function(a){for(var b=null;a&&a!=Object.prototype;){if(a.tagName){b=a.tagName;break}a=a.prototype}return b||"div"},e=1e-8,f={},g=function(a,b){if(a&&b){if("function"==typeof a[b])return a[b];var c=a.prototype;if(c&&"function"==typeof c[b])return c[b];if(c!==Object.prototype&&c!==Function.prototype)return"function"==typeof a.__super__?g(a.__super__,b):void 0}},h=a.c=function(){return h._api?h._api.apply(this,arguments):void 0};h.debug=!1,h.trace=!1,h.verbose=!1,h.traceAdded=!1,h.GC=!1,h.GEQ=1,h.LEQ=2,h.inherit=function(b){var e=null,g=null;b["extends"]&&(g=b["extends"],delete b["extends"]),b.initialize&&(e=b.initialize,delete b.initialize);var i=e||function(){};Object.defineProperty(i,"__super__",{value:g?g:Object,enumerable:!1,configurable:!0,writable:!1}),b._t&&(f[b._t]=i);var j=i.prototype=Object.create(g?g.prototype:Object.prototype);if(h.extend(j,b),c&&g&&g.prototype instanceof a.HTMLElement){var k=i,l=d(j),m=function(a){return a.__proto__=j,k.apply(a,arguments),j.created&&a.created(),j.decorate&&a.decorate(),a};this.extend(j,{upgrade:m}),i=function(){return m(a.document.createElement(l))},i.prototype=j,this.extend(i,{ctor:k})}return i},h.own=function(b,c,d){return Object.getOwnPropertyNames(b).forEach(c,d||a),b},h.extend=function(a,b){return h.own(b,function(c){var d=Object.getOwnPropertyDescriptor(b,c);try{"function"==typeof d.get||"function"==typeof d.set?Object.defineProperty(a,c,d):"function"==typeof d.value||"_"===c.charAt(0)?(d.writable=!0,d.configurable=!0,d.enumerable=!1,Object.defineProperty(a,c,d)):a[c]=b[c]}catch(e){}}),a},h.traceprint=function(a){h.verbose&&console.log(a)},h.fnenterprint=function(a){console.log("* "+a)},h.fnexitprint=function(a){console.log("- "+a)},h.assert=function(a,b){if(!a)throw new h.InternalError("Assertion failed: "+b)};var i=function(a){return"number"==typeof a?h.Expression.fromConstant(a):a instanceof h.Variable?h.Expression.fromVariable(a):a};h.plus=function(a,b){return a=i(a),b=i(b),a.plus(b)},h.minus=function(a,b){return a=i(a),b=i(b),a.minus(b)},h.times=function(a,b){return a=i(a),b=i(b),a.times(b)},h.divide=function(a,b){return a=i(a),b=i(b),a.divide(b)},h.approx=function(a,b){return a===b?!0:(a=+a,b=+b,0==a?Math.abs(b)<e:0==b?Math.abs(a)<e:Math.abs(a-b)<Math.abs(a)*e)};var j=1;h._inc=function(){return j++},h.parseJSON=function(a){return JSON.parse(a,function(a,b){if("object"!=typeof b||"string"!=typeof b._t)return b;var c=b._t,d=f[c];if(c&&d){var e=g(d,"fromJSON");if(e)return e(b,d)}return b})},"function"==typeof define&&define.amd?define(h):"object"==typeof module&&module.exports?module.exports=h:a.c=h}(this),function(a){"use strict";var c=function(a,b){Object.keys(a).forEach(function(c){b[c]=a[c]})},d={};a.HashTable=a.inherit({initialize:function(){this.size=0,this._store={},this._keyStrMap={},this._deleted=0},set:function(a,b){var c=a.hashCode;"undefined"==typeof this._store[c]&&this.size++,this._store[c]=b,this._keyStrMap[c]=a},get:function(a){if(!this.size)return null;a=a.hashCode;var b=this._store[a];return"undefined"!=typeof b?this._store[a]:null},clear:function(){this.size=0,this._store={},this._keyStrMap={}},_compact:function(){var a={};c(this._store,a),this._store=a},_compactThreshold:100,_perhapsCompact:function(){this._size>30||this._deleted>this._compactThreshold&&(this._compact(),this._deleted=0)},"delete":function(a){a=a.hashCode,this._store.hasOwnProperty(a)&&(this._deleted++,delete this._store[a],this.size>0&&this.size--)},each:function(a,b){if(this.size){this._perhapsCompact();var c=this._store,d=this._keyStrMap;for(var e in this._store)this._store.hasOwnProperty(e)&&a.call(b||null,d[e],c[e])}},escapingEach:function(a,b){if(this.size){this._perhapsCompact();for(var c=this,e=this._store,f=this._keyStrMap,g=d,h=Object.keys(e),i=0;i<h.length;i++)if(function(d){c._store.hasOwnProperty(d)&&(g=a.call(b||null,f[d],e[d]))}(h[i]),g){if(void 0!==g.retval)return g;if(g.brk)break}}},clone:function(){var b=new a.HashTable;return this.size&&(b.size=this.size,c(this._store,b._store),c(this._keyStrMap,b._keyStrMap)),b},equals:function(b){if(b===this)return!0;if(!(b instanceof a.HashTable)||b._size!==this._size)return!1;for(var c=Object.keys(this._store),d=0;d<c.length;d++){var e=c[d];if(this._keyStrMap[e]!==b._keyStrMap[e]||this._store[e]!==b._store[e])return!1}return!0},toString:function(){var b="";return this.each(function(a,c){b+=a+" => "+c+"\n"}),b}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.HashSet=a.inherit({_t:"c.HashSet",initialize:function(){this.storage=[],this.size=0,this.hashCode=a._inc()},add:function(a){var b=this.storage;b.indexOf(a),-1==b.indexOf(a)&&(b[b.length]=a),this.size=this.storage.length},values:function(){return this.storage},has:function(a){var b=this.storage;return-1!=b.indexOf(a)},"delete":function(a){var b=this.storage.indexOf(a);return-1==b?null:(this.storage.splice(b,1)[0],this.size=this.storage.length,void 0)},clear:function(){this.storage.length=0},each:function(a,b){this.size&&this.storage.forEach(a,b)},escapingEach:function(a,b){this.size&&this.storage.forEach(a,b)},toString:function(){var a=this.size+" {",b=!0;return this.each(function(c){b?b=!1:a+=", ",a+=c}),a+="}\n"},toJSON:function(){var a=[];return this.each(function(b){a[a.length]=b.toJSON()}),{_t:"c.HashSet",data:a}},fromJSON:function(b){var c=new a.HashSet;return b.data&&(c.size=b.data.length,c.storage=b.data),c}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Error=a.inherit({initialize:function(a){a&&(this._description=a)},_name:"c.Error",_description:"An error has occured in Cassowary",set description(a){this._description=a},get description(){return"("+this._name+") "+this._description},get message(){return this.description},toString:function(){return this.description}});var b=function(b,c){return a.inherit({"extends":a.Error,initialize:function(){a.Error.apply(this,arguments)},_name:b||"",_description:c||""})};a.ConstraintNotFound=b("c.ConstraintNotFound","Tried to remove a constraint never added to the tableu"),a.InternalError=b("c.InternalError"),a.NonExpression=b("c.NonExpression","The resulting expression would be non"),a.NotEnoughStays=b("c.NotEnoughStays","There are not enough stays to give specific values to every variable"),a.RequiredFailure=b("c.RequiredFailure","A required constraint cannot be satisfied"),a.TooDifficult=b("c.TooDifficult","The constraints are too difficult to solve")}(this.c||module.parent.exports||{}),function(a){"use strict";var b=1e3;a.SymbolicWeight=a.inherit({_t:"c.SymbolicWeight",initialize:function(){this.value=0;for(var a=1,c=arguments.length-1;c>=0;--c)this.value+=arguments[c]*a,a*=b},toJSON:function(){return{_t:this._t,value:this.value}}})}(this.c||module.parent.exports||{}),function(a){a.Strength=a.inherit({initialize:function(b,c,d,e){this.name=b,this.symbolicWeight=c instanceof a.SymbolicWeight?c:new a.SymbolicWeight(c,d,e)},get required(){return this===a.Strength.required},toString:function(){return this.name+(this.isRequired?"":":"+this.symbolicWeight)}}),a.Strength.required=new a.Strength("<Required>",1e3,1e3,1e3),a.Strength.strong=new a.Strength("strong",1,0,0),a.Strength.medium=new a.Strength("medium",0,1,0),a.Strength.weak=new a.Strength("weak",0,0,1)}(this.c||("undefined"!=typeof module?module.parent.exports.c:{})),function(a){"use strict";a.AbstractVariable=a.inherit({isDummy:!1,isExternal:!1,isPivotable:!1,isRestricted:!1,_init:function(b,c){this.hashCode=a._inc(),this.name=(c||"")+this.hashCode,b&&("undefined"!=typeof b.name&&(this.name=b.name),"undefined"!=typeof b.value&&(this.value=b.value),"undefined"!=typeof b.prefix&&(this._prefix=b.prefix))},_prefix:"",name:"",value:0,valueOf:function(){return this.value},toJSON:function(){var a={};return this._t&&(a._t=this._t),this.name&&(a.name=this.name),"undefined"!=typeof this.value&&(a.value=this.value),this._prefix&&(a._prefix=this._prefix),this._t&&(a._t=this._t),a},fromJSON:function(b,c){var d=new c;return a.extend(d,b),d},toString:function(){return this._prefix+"["+this.name+":"+this.value+"]"}}),a.Variable=a.inherit({_t:"c.Variable","extends":a.AbstractVariable,initialize:function(b){this._init(b,"v");var c=a.Variable._map;c&&(c[this.name]=this)},isExternal:!0}),a.DummyVariable=a.inherit({_t:"c.DummyVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"d")},isDummy:!0,isRestricted:!0,value:"dummy"}),a.ObjectiveVariable=a.inherit({_t:"c.ObjectiveVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"o")},value:"obj"}),a.SlackVariable=a.inherit({_t:"c.SlackVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"s")},isPivotable:!0,isRestricted:!0,value:"slack"})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Point=a.inherit({initialize:function(b,c,d){if(b instanceof a.Variable)this._x=b;else{var e={value:b};d&&(e.name="x"+d),this._x=new a.Variable(e)}if(c instanceof a.Variable)this._y=c;else{var f={value:c};d&&(f.name="y"+d),this._y=new a.Variable(f)}},get x(){return this._x},set x(b){b instanceof a.Variable?this._x=b:this._x.value=b},get y(){return this._y},set y(b){b instanceof a.Variable?this._y=b:this._y.value=b},toString:function(){return"("+this.x+", "+this.y+")"}})}(this.c||module.parent.exports||{}),function(a){"use strict";var b=function(a,b){return"number"==typeof a?a:b};a.Expression=a.inherit({initialize:function(c,d,e){this.constant=b(e,0),this.terms=new a.HashTable,c instanceof a.AbstractVariable?(d=b(d,1),this.setVariable(c,d)):"number"==typeof c&&(isNaN(c)?console.trace():this.constant=c)},initializeFromHash:function(b,c){return a.verbose&&(console.log("*******************************"),console.log("clone c.initializeFromHash"),console.log("*******************************")),a.GC&&console.log("clone c.Expression"),this.constant=b,this.terms=c.clone(),this},multiplyMe:function(a){this.constant*=a;var b=this.terms;return b.each(function(c,d){b.set(c,d*a)}),this},clone:function(){a.verbose&&(console.log("*******************************"),console.log("clone c.Expression"),console.log("*******************************"));var b=a.Expression.empty();return b.initializeFromHash(this.constant,this.terms),b},times:function(b){if("number"==typeof b)return this.clone().multiplyMe(b);if(this.isConstant)return b.times(this.constant);if(b.isConstant)return this.times(b.constant);throw new a.NonExpression},plus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,1):b instanceof a.Variable?this.clone().addVariable(b,1):void 0},minus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,-1):b instanceof a.Variable?this.clone().addVariable(b,-1):void 0},divide:function(b){if("number"==typeof b){if(a.approx(b,0))throw new a.NonExpression;return this.times(1/b)}if(b instanceof a.Expression){if(!b.isConstant)throw new a.NonExpression;return this.times(1/b.constant)}},addExpression:function(c,d,e,f){return c instanceof a.AbstractVariable&&(c=a.Expression.fromVariable(c)),d=b(d,1),this.constant+=d*c.constant,c.terms.each(function(a,b){this.addVariable(a,b*d,e,f)},this),this},addVariable:function(b,c,d,e){null==c&&(c=1);var f=this.terms.get(b);if(f){var g=f+c;0==g||a.approx(g,0)?(e&&e.noteRemovedVariable(b,d),this.terms.delete(b)):this.setVariable(b,g)}else a.approx(c,0)||(this.setVariable(b,c),e&&e.noteAddedVariable(b,d));return this},setVariable:function(a,b){return this.terms.set(a,b),this},anyPivotableVariable:function(){if(this.isConstant)throw new a.InternalError("anyPivotableVariable called on a constant");var b=this.terms.escapingEach(function(a){return a.isPivotable?{retval:a}:void 0});return b&&void 0!==b.retval?b.retval:null},substituteOut:function(b,c,d,e){this.setVariable.bind(this);var g=this.terms,h=g.get(b);g.delete(b),this.constant+=h*c.constant,c.terms.each(function(b,c){var f=g.get(b);if(f){var i=f+h*c;a.approx(i,0)?(e.noteRemovedVariable(b,d),g.delete(b)):g.set(b,i)}else g.set(b,h*c),e&&e.noteAddedVariable(b,d)})},changeSubject:function(a,b){this.setVariable(a,this.newSubject(b))},newSubject:function(a){var b=1/this.terms.get(a);return this.terms.delete(a),this.multiplyMe(-b),b},coefficientFor:function(a){return this.terms.get(a)||0},get isConstant(){return 0==this.terms.size},toString:function(){var b="",c=!1;if(!a.approx(this.constant,0)||this.isConstant){if(b+=this.constant,this.isConstant)return b;c=!0}return this.terms.each(function(a,d){c&&(b+=" + "),b+=d+"*"+a,c=!0}),b},equals:function(b){return b===this?!0:b instanceof a.Expression&&b.constant===this.constant&&b.terms.equals(this.terms)},Plus:function(a,b){return a.plus(b)},Minus:function(a,b){return a.minus(b)},Times:function(a,b){return a.times(b)},Divide:function(a,b){return a.divide(b)}}),a.Expression.empty=function(){return new a.Expression(void 0,1,0)},a.Expression.fromConstant=function(b){return new a.Expression(b)},a.Expression.fromValue=function(b){return b=+b,new a.Expression(void 0,b,0)},a.Expression.fromVariable=function(b){return new a.Expression(b,1,0)}}(this.c||module.parent.exports||{}),function(a){"use strict";a.AbstractConstraint=a.inherit({initialize:function(b,c){this.hashCode=a._inc(),this.strength=b||a.Strength.required,this.weight=c||1},isEditConstraint:!1,isInequality:!1,isStayConstraint:!1,get required(){return this.strength===a.Strength.required},toString:function(){return this.strength+" {"+this.weight+"} ("+this.expression+")"}});var b=a.AbstractConstraint.prototype.toString,c=function(b,c,d){a.AbstractConstraint.call(this,c||a.Strength.strong,d),this.variable=b,this.expression=new a.Expression(b,-1,b.value)};a.EditConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isEditConstraint:!0,toString:function(){return"edit:"+b.call(this)}}),a.StayConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isStayConstraint:!0,toString:function(){return"stay:"+b.call(this)}});var d=a.Constraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(b,c,d){a.AbstractConstraint.call(this,c,d),this.expression=b}});a.Inequality=a.inherit({"extends":a.Constraint,_cloneOrNewCle:function(b){return b.clone?b.clone():new a.Expression(b)},initialize:function(b,c,e,f,g){var h=b instanceof a.Expression,i=e instanceof a.Expression,j=b instanceof a.AbstractVariable,k=e instanceof a.AbstractVariable,l="number"==typeof b,m="number"==typeof e;if((h||l)&&k){var n=b,o=c,p=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else if(j&&(i||m)){var n=e,o=c,p=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else{if(h&&m){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(l&&i){var s=e,o=c,t=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(h&&i){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(t),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(s));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(s),-1)}}else{if(h)return d.call(this,b,c,e);if(c==a.GEQ)d.call(this,new a.Expression(e),f,g),this.expression.multiplyMe(-1),this.expression.addVariable(b);else{if(c!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");d.call(this,new a.Expression(e),f,g),this.expression.addVariable(b,-1)}}}},isInequality:!0,toString:function(){return d.prototype.toString.call(this)+" >= 0) id: "+this.hashCode}}),a.Equation=a.inherit({"extends":a.Constraint,initialize:function(b,c,e,f){if(b instanceof a.Expression&&!c||c instanceof a.Strength)d.call(this,b,c,e);else if(b instanceof a.AbstractVariable&&c instanceof a.Expression){var g=b,h=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.AbstractVariable&&"number"==typeof c){var g=b,k=c,i=e,j=f;d.call(this,new a.Expression(k),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.Expression&&c instanceof a.AbstractVariable){var h=b,g=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else{if(!(b instanceof a.Expression||b instanceof a.AbstractVariable||"number"==typeof b)||!(c instanceof a.Expression||c instanceof a.AbstractVariable||"number"==typeof c))throw"Bad initializer to c.Equation";b=b instanceof a.Expression?b.clone():new a.Expression(b),c=c instanceof a.Expression?c.clone():new a.Expression(c),d.call(this,b,e,f),this.expression.addExpression(c,-1)}a.assert(this.strength instanceof a.Strength,"_strength not set")},toString:function(){return d.prototype.toString.call(this)+" = 0)"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.EditInfo=a.inherit({initialize:function(a,b,c,d,e){this.constraint=a,this.editPlus=b,this.editMinus=c,this.prevEditConstant=d,this.index=e},toString:function(){return"<cn="+this.constraint+", ep="+this.editPlus+", em="+this.editMinus+", pec="+this.prevEditConstant+", index="+this.index+">"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Tableau=a.inherit({initialize:function(){this.columns=new a.HashTable,this.rows=new a.HashTable,this._infeasibleRows=new a.HashSet,this._externalRows=new a.HashSet,this._externalParametricVars=new a.HashSet},noteRemovedVariable:function(b,c){a.trace&&console.log("c.Tableau::noteRemovedVariable: ",b,c);var d=this.columns.get(b);c&&d&&d.delete(c)},noteAddedVariable:function(a,b){b&&this.insertColVar(a,b)},getInternalInfo:function(){var a="Tableau Information:\n";return a+="Rows: "+this.rows.size,a+=" (= "+(this.rows.size-1)+" constraints)",a+="\nColumns: "+this.columns.size,a+="\nInfeasible Rows: "+this._infeasibleRows.size,a+="\nExternal basic variables: "+this._externalRows.size,a+="\nExternal parametric variables: ",a+=this._externalParametricVars.size,a+="\n"},toString:function(){var a="Tableau:\n";return this.rows.each(function(b,c){a+=b,a+=" <==> ",a+=c,a+="\n"}),a+="\nColumns:\n",a+=this.columns,a+="\nInfeasible rows: ",a+=this._infeasibleRows,a+="External basic variables: ",a+=this._externalRows,a+="External parametric variables: ",a+=this._externalParametricVars},insertColVar:function(b,c){var d=this.columns.get(b);d||(d=new a.HashSet,this.columns.set(b,d)),d.add(c)},addRow:function(b,c){a.trace&&a.fnenterprint("addRow: "+b+", "+c),this.rows.set(b,c),c.terms.each(function(a){this.insertColVar(a,b),a.isExternal&&this._externalParametricVars.add(a)},this),b.isExternal&&this._externalRows.add(b),a.trace&&a.traceprint(this.toString())},removeColumn:function(b){a.trace&&a.fnenterprint("removeColumn:"+b);var c=this.columns.get(b);c?(this.columns.delete(b),c.each(function(a){var c=this.rows.get(a);c.terms.delete(b)},this)):a.trace&&console.log("Could not find var",b,"in columns"),b.isExternal&&(this._externalRows.delete(b),this._externalParametricVars.delete(b))},removeRow:function(b){a.trace&&a.fnenterprint("removeRow:"+b);var c=this.rows.get(b);return a.assert(null!=c),c.terms.each(function(c){var e=this.columns.get(c);null!=e&&(a.trace&&console.log("removing from varset:",b),e.delete(b))},this),this._infeasibleRows.delete(b),b.isExternal&&this._externalRows.delete(b),this.rows.delete(b),a.trace&&a.fnexitprint("returning "+c),c},substituteOut:function(b,c){a.trace&&a.fnenterprint("substituteOut:"+b+", "+c),a.trace&&a.traceprint(this.toString());var d=this.columns.get(b);d.each(function(a){var d=this.rows.get(a);d.substituteOut(b,c,a,this),a.isRestricted&&d.constant<0&&this._infeasibleRows.add(a)},this),b.isExternal&&(this._externalRows.add(b),this._externalParametricVars.delete(b)),this.columns.delete(b)},columnsHasKey:function(a){return!!this.columns.get(a)}})}(this.c||module.parent.exports||{}),function(a){var b=a.Tableau,c=b.prototype,d=1e-8,e=a.Strength.weak;a.SimplexSolver=a.inherit({"extends":a.Tableau,initialize:function(){a.Tableau.call(this),this._stayMinusErrorVars=[],this._stayPlusErrorVars=[],this._errorVars=new a.HashTable,this._markerVars=new a.HashTable,this._objective=new a.ObjectiveVariable({name:"Z"}),this._editVarMap=new a.HashTable,this._editVarList=[],this._slackCounter=0,this._artificialCounter=0,this._dummyCounter=0,this.autoSolve=!0,this._needsSolving=!1,this._optimizeCount=0,this.rows.set(this._objective,a.Expression.empty()),this._editVariableStack=[0],a.trace&&a.traceprint("objective expr == "+this.rows.get(this._objective))},add:function(){for(var a=0;a<arguments.length;a++)this.addConstraint(arguments[a]);return this},_addEditConstraint:function(b,c,d){var e=this._editVarMap.size,f=c[0],g=c[1],h=new a.EditInfo(b,f,g,d,e);this._editVarMap.set(b.variable,h),this._editVarList[e]={v:b.variable,info:h}},addConstraint:function(b){a.trace&&a.fnenterprint("addConstraint: "+b);var c=new Array(2),d=new Array(1),e=this.newExpression(b,c,d);return d=d[0],this.tryAddingDirectly(e)||this.addWithArtificialVariable(e),this._needsSolving=!0,b.isEditConstraint&&this._addEditConstraint(b,c,d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},addConstraintNoException:function(b){a.trace&&a.fnenterprint("addConstraintNoException: "+b);try{return this.addConstraint(b),!0}catch(c){return!1}},addEditVar:function(b,c,d){return a.trace&&a.fnenterprint("addEditVar: "+b+" @ "+c+" {"+d+"}"),this.addConstraint(new a.EditConstraint(b,c||a.Strength.strong,d))},beginEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this._infeasibleRows.clear(),this._resetStayConstants(),this._editVariableStack[this._editVariableStack.length]=this._editVarMap.size,this},endEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this.resolve(),this._editVariableStack.pop(),this.removeEditVarsTo(this._editVariableStack[this._editVariableStack.length-1]),this},removeAllEditVars:function(){return this.removeEditVarsTo(0)},removeEditVarsTo:function(b){try{for(var c=this._editVarList.length,d=b;c>d;d++)this._editVarList[d]&&this.removeConstraint(this._editVarMap.get(this._editVarList[d].v).constraint);return this._editVarList.length=b,a.assert(this._editVarMap.size==b,"_editVarMap.size == n"),this}catch(e){throw new a.InternalError("Constraint not found in removeEditVarsTo")}},addPointStays:function(b){return a.trace&&console.log("addPointStays",b),b.forEach(function(a,b){this.addStay(a.x,e,Math.pow(2,b)),this.addStay(a.y,e,Math.pow(2,b))},this),this},addStay:function(b,c,d){var f=new a.StayConstraint(b,c||e,d||1);return this.addConstraint(f)},removeConstraint:function(b){a.trace&&a.fnenterprint("removeConstraintInternal: "+b),a.trace&&a.traceprint(this.toString()),this._needsSolving=!0,this._resetStayConstants();var c=this.rows.get(this._objective),d=this._errorVars.get(b);a.trace&&a.traceprint("eVars == "+d),null!=d&&d.each(function(e){var f=this.rows.get(e);null==f?c.addVariable(e,-b.weight*b.strength.symbolicWeight.value,this._objective,this):c.addExpression(f,-b.weight*b.strength.symbolicWeight.value,this._objective,this),a.trace&&a.traceprint("now eVars == "+d)},this);var e=this._markerVars.get(b);if(this._markerVars.delete(b),null==e)throw new a.InternalError("Constraint not found in removeConstraintInternal");if(a.trace&&a.traceprint("Looking to remove var "+e),null==this.rows.get(e)){var f=this.columns.get(e);a.trace&&a.traceprint("Must pivot -- columns are "+f);var g=null,h=0;f.each(function(b){if(b.isRestricted){var c=this.rows.get(b),d=c.coefficientFor(e);if(a.trace&&a.traceprint("Marker "+e+"'s coefficient in "+c+" is "+d),0>d){var f=-c.constant/d;(null==g||h>f||a.approx(f,h)&&b.hashCode<g.hashCode)&&(h=f,g=b)}}},this),null==g&&(a.trace&&a.traceprint("exitVar is still null"),f.each(function(a){if(a.isRestricted){var b=this.rows.get(a),c=b.coefficientFor(e),d=b.constant/c;(null==g||h>d)&&(h=d,g=a)}},this)),null==g&&(0==f.size?this.removeColumn(e):f.escapingEach(function(a){return a!=this._objective?(g=a,{brk:!0}):void 0},this)),null!=g&&this.pivot(e,g)}if(null!=this.rows.get(e)&&this.removeRow(e),null!=d&&d.each(function(a){a!=e&&this.removeColumn(a)},this),b.isStayConstraint){if(null!=d)for(var j=0;j<this._stayPlusErrorVars.length;j++)d.delete(this._stayPlusErrorVars[j]),d.delete(this._stayMinusErrorVars[j])}else if(b.isEditConstraint){a.assert(null!=d,"eVars != null");var k=this._editVarMap.get(b.variable);this.removeColumn(k.editMinus),this._editVarMap.delete(b.variable)}return null!=d&&this._errorVars.delete(d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},reset:function(){throw a.trace&&a.fnenterprint("reset"),new a.InternalError("reset not implemented")},resolveArray:function(b){a.trace&&a.fnenterprint("resolveArray"+b);var c=b.length;this._editVarMap.each(function(a,d){var e=d.index;c>e&&this.suggestValue(a,b[e])},this),this.resolve()},resolvePair:function(a,b){this.suggestValue(this._editVarList[0].v,a),this.suggestValue(this._editVarList[1].v,b),this.resolve()},resolve:function(){a.trace&&a.fnenterprint("resolve()"),this.dualOptimize(),this._setExternalVariables(),this._infeasibleRows.clear(),this._resetStayConstants()},suggestValue:function(b,c){a.trace&&console.log("suggestValue("+b+", "+c+")");var d=this._editVarMap.get(b);if(!d)throw new a.Error("suggestValue for variable "+b+", but var is not an edit variable");var e=c-d.prevEditConstant;return d.prevEditConstant=c,this.deltaEditConstant(e,d.editPlus,d.editMinus),this},solve:function(){return this._needsSolving&&(this.optimize(this._objective),this._setExternalVariables()),this},setEditedValue:function(b,c){if(!this.columnsHasKey(b)&&null==this.rows.get(b))return b.value=c,this;if(!a.approx(c,b.value)){this.addEditVar(b),this.beginEdit();try{this.suggestValue(b,c)}catch(d){throw new a.InternalError("Error in setEditedValue")}this.endEdit()}return this},addVar:function(b){if(!this.columnsHasKey(b)&&null==this.rows.get(b)){try{this.addStay(b)}catch(c){throw new a.InternalError("Error in addVar -- required failure is impossible")}a.trace&&a.traceprint("added initial stay on "+b)}return this},getInternalInfo:function(){var a=c.getInternalInfo.call(this);return a+="\nSolver info:\n",a+="Stay Error Variables: ",a+=this._stayPlusErrorVars.length+this._stayMinusErrorVars.length,a+=" ("+this._stayPlusErrorVars.length+" +, ",a+=this._stayMinusErrorVars.length+" -)\n",a+="Edit Variables: "+this._editVarMap.size,a+="\n"},getDebugInfo:function(){return this.toString()+this.getInternalInfo()+"\n"},toString:function(){var a=c.getInternalInfo.call(this);return a+="\n_stayPlusErrorVars: ",a+="["+this._stayPlusErrorVars+"]",a+="\n_stayMinusErrorVars: ",a+="["+this._stayMinusErrorVars+"]",a+="\n",a+="_editVarMap:\n"+this._editVarMap,a+="\n"},addWithArtificialVariable:function(b){a.trace&&a.fnenterprint("addWithArtificialVariable: "+b);var c=new a.SlackVariable({value:++this._artificialCounter,prefix:"a"}),d=new a.ObjectiveVariable({name:"az"}),e=b.clone();a.trace&&a.traceprint("before addRows:\n"+this),this.addRow(d,e),this.addRow(c,b),a.trace&&a.traceprint("after addRows:\n"+this),this.optimize(d);var f=this.rows.get(d);if(a.trace&&a.traceprint("azTableauRow.constant == "+f.constant),!a.approx(f.constant,0))throw this.removeRow(d),this.removeColumn(c),new a.RequiredFailure;var g=this.rows.get(c);if(null!=g){if(g.isConstant)return this.removeRow(c),this.removeRow(d),void 0;var h=g.anyPivotableVariable();this.pivot(h,c)}a.assert(null==this.rows.get(c),"rowExpression(av) == null"),this.removeColumn(c),this.removeRow(d)},tryAddingDirectly:function(b){a.trace&&a.fnenterprint("tryAddingDirectly: "+b);var c=this.chooseSubject(b);return null==c?(a.trace&&a.fnexitprint("returning false"),!1):(b.newSubject(c),this.columnsHasKey(c)&&this.substituteOut(c,b),this.addRow(c,b),a.trace&&a.fnexitprint("returning true"),!0)},chooseSubject:function(b){a.trace&&a.fnenterprint("chooseSubject: "+b);var c=null,d=!1,e=!1,f=b.terms,g=f.escapingEach(function(a,b){if(d){if(!a.isRestricted&&!this.columnsHasKey(a))return{retval:a}}else if(a.isRestricted){if(!e&&!a.isDummy&&0>b){var f=this.columns.get(a);(null==f||1==f.size&&this.columnsHasKey(this._objective))&&(c=a,e=!0)}}else c=a,d=!0},this);if(g&&void 0!==g.retval)return g.retval;if(null!=c)return c;var h=0,g=f.escapingEach(function(a,b){return a.isDummy?(this.columnsHasKey(a)||(c=a,h=b),void 0):{retval:null}},this);if(g&&void 0!==g.retval)return g.retval;if(!a.approx(b.constant,0))throw new a.RequiredFailure;return h>0&&b.multiplyMe(-1),c},deltaEditConstant:function(b,c,d){a.trace&&a.fnenterprint("deltaEditConstant :"+b+", "+c+", "+d);var e=this.rows.get(c);if(null!=e)return e.constant+=b,e.constant<0&&this._infeasibleRows.add(c),void 0;var f=this.rows.get(d);if(null!=f)return f.constant+=-b,f.constant<0&&this._infeasibleRows.add(d),void 0;var g=this.columns.get(d);g||console.log("columnVars is null -- tableau is:\n"+this),g.each(function(a){var c=this.rows.get(a),e=c.coefficientFor(d);c.constant+=e*b,a.isRestricted&&c.constant<0&&this._infeasibleRows.add(a)},this)},dualOptimize:function(){a.trace&&a.fnenterprint("dualOptimize:");for(var b=this.rows.get(this._objective);this._infeasibleRows.size;){var c=this._infeasibleRows.values()[0];this._infeasibleRows.delete(c);var d=null,e=this.rows.get(c);if(e&&e.constant<0){var g,f=Number.MAX_VALUE,h=e.terms;if(h.each(function(c,e){if(e>0&&c.isPivotable){var h=b.coefficientFor(c);g=h/e,(f>g||a.approx(g,f)&&c.hashCode<d.hashCode)&&(d=c,f=g)}}),f==Number.MAX_VALUE)throw new a.InternalError("ratio == nil (MAX_VALUE) in dualOptimize");this.pivot(d,c)}}},newExpression:function(b,c,d){a.trace&&(a.fnenterprint("newExpression: "+b),a.traceprint("cn.isInequality == "+b.isInequality),a.traceprint("cn.required == "+b.required));var e=b.expression,f=a.Expression.fromConstant(e.constant),g=new a.SlackVariable,h=new a.DummyVariable,i=new a.SlackVariable,j=new a.SlackVariable,k=e.terms;if(k.each(function(a,b){var c=this.rows.get(a);c?f.addExpression(c,b):f.addVariable(a,b)},this),b.isInequality){if(a.trace&&a.traceprint("Inequality, adding slack"),++this._slackCounter,g=new a.SlackVariable({value:this._slackCounter,prefix:"s"}),f.setVariable(g,-1),this._markerVars.set(b,g),!b.required){++this._slackCounter,i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(i,1);var l=this.rows.get(this._objective);l.setVariable(i,b.strength.symbolicWeight.value*b.weight),this.insertErrorVar(b,i),this.noteAddedVariable(i,this._objective)}}else if(b.required)a.trace&&a.traceprint("Equality, required"),++this._dummyCounter,h=new a.DummyVariable({value:this._dummyCounter,prefix:"d"}),c[0]=h,c[1]=h,d[0]=e.constant,f.setVariable(h,1),this._markerVars.set(b,h),a.trace&&a.traceprint("Adding dummyVar == d"+this._dummyCounter);else{a.trace&&a.traceprint("Equality, not required"),++this._slackCounter,j=new a.SlackVariable({value:this._slackCounter,prefix:"ep"}),i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(j,-1),f.setVariable(i,1),this._markerVars.set(b,j);
var l=this.rows.get(this._objective);a.trace&&console.log(l);var m=b.strength.symbolicWeight.value*b.weight;0==m&&(a.trace&&a.traceprint("cn == "+b),a.trace&&a.traceprint("adding "+j+" and "+i+" with swCoeff == "+m)),l.setVariable(j,m),this.noteAddedVariable(j,this._objective),l.setVariable(i,m),this.noteAddedVariable(i,this._objective),this.insertErrorVar(b,i),this.insertErrorVar(b,j),b.isStayConstraint?(this._stayPlusErrorVars[this._stayPlusErrorVars.length]=j,this._stayMinusErrorVars[this._stayMinusErrorVars.length]=i):b.isEditConstraint&&(c[0]=j,c[1]=i,d[0]=e.constant)}return f.constant<0&&f.multiplyMe(-1),a.trace&&a.fnexitprint("returning "+f),f},optimize:function(b){a.trace&&a.fnenterprint("optimize: "+b),a.trace&&a.traceprint(this.toString()),this._optimizeCount++;var c=this.rows.get(b);a.assert(null!=c,"zRow != null");for(var g,h,e=null,f=null;;){if(g=0,h=c.terms,h.escapingEach(function(a,b){return a.isPivotable&&g>b?(g=b,e=a,{brk:1}):void 0},this),g>=-d)return;a.trace&&console.log("entryVar:",e,"objectiveCoeff:",g);var i=Number.MAX_VALUE,j=this.columns.get(e),k=0;if(j.each(function(b){if(a.trace&&a.traceprint("Checking "+b),b.isPivotable){var c=this.rows.get(b),d=c.coefficientFor(e);a.trace&&a.traceprint("pivotable, coeff = "+d),0>d&&(k=-c.constant/d,(i>k||a.approx(k,i)&&b.hashCode<f.hashCode)&&(i=k,f=b))}},this),i==Number.MAX_VALUE)throw new a.InternalError("Objective function is unbounded in optimize");this.pivot(e,f),a.trace&&a.traceprint(this.toString())}},pivot:function(b,c){a.trace&&console.log("pivot: ",b,c);var d=!1;d&&console.time(" SimplexSolver::pivot"),null==b&&console.warn("pivot: entryVar == null"),null==c&&console.warn("pivot: exitVar == null"),d&&console.time("  removeRow");var e=this.removeRow(c);d&&console.timeEnd("  removeRow"),d&&console.time("  changeSubject"),e.changeSubject(c,b),d&&console.timeEnd("  changeSubject"),d&&console.time("  substituteOut"),this.substituteOut(b,e),d&&console.timeEnd("  substituteOut"),d&&console.time("  addRow"),this.addRow(b,e),d&&console.timeEnd("  addRow"),d&&console.timeEnd(" SimplexSolver::pivot")},_resetStayConstants:function(){a.trace&&console.log("_resetStayConstants");for(var b=this._stayPlusErrorVars,c=b.length,d=0;c>d;d++){var e=this.rows.get(b[d]);null===e&&(e=this.rows.get(this._stayMinusErrorVars[d])),null!=e&&(e.constant=0)}},_setExternalVariables:function(){a.trace&&a.fnenterprint("_setExternalVariables:"),a.trace&&a.traceprint(this.toString());var b={};this._externalParametricVars.each(function(c){null!=this.rows.get(c)?a.trace&&console.log("Error: variable"+c+" in _externalParametricVars is basic"):(c.value=0,b[c.name]=0)},this),this._externalRows.each(function(a){var c=this.rows.get(a);a.value!=c.constant&&(a.value=c.constant,b[a.name]=c.constant)},this),this._changed=b,this._needsSolving=!1,this._informCallbacks(),this.onsolved()},onsolved:function(){},_informCallbacks:function(){if(this._callbacks){var a=this._changed;this._callbacks.forEach(function(b){b(a)})}},_addCallback:function(a){var b=this._callbacks||(this._callbacks=[]);b[b.length]=a},insertErrorVar:function(b,c){a.trace&&a.fnenterprint("insertErrorVar:"+b+", "+c);var d=this._errorVars.get(c);d||(d=new a.HashSet,this._errorVars.set(b,d)),d.add(c)}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Timer=a.inherit({initialize:function(){this.isRunning=!1,this._elapsedMs=0},start:function(){return this.isRunning=!0,this._startReading=new Date,this},stop:function(){return this.isRunning=!1,this._elapsedMs+=new Date-this._startReading,this},reset:function(){return this.isRunning=!1,this._elapsedMs=0,this},elapsedTime:function(){return this.isRunning?(this._elapsedMs+(new Date-this._startReading))/1e3:this._elapsedMs/1e3}})}(this.c||module.parent.exports||{}),this.c.parser=function(){function a(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var b={parse:function(b,c){function k(a){g>e||(e>g&&(g=e,h=[]),h.push(a))}function l(){var a,b,c,d,f;if(d=e,f=e,a=z(),null!==a){for(b=[],c=m();null!==c;)b.push(c),c=m();null!==b?(c=z(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)}else a=null,e=f;return null!==a&&(a=function(a,b){return b}(d,a[1])),null===a&&(e=d),a}function m(){var a,b,c,d;return c=e,d=e,a=P(),null!==a?(b=s(),null!==b?a=[a,b]:(a=null,e=d)):(a=null,e=d),null!==a&&(a=function(a,b){return b}(c,a[0])),null===a&&(e=c),a}function n(){var a;return b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),a}function o(){var a;return/^[a-zA-Z]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[a-zA-Z]")),null===a&&(36===b.charCodeAt(e)?(a="$",e++):(a=null,0===f&&k('"$"')),null===a&&(95===b.charCodeAt(e)?(a="_",e++):(a=null,0===f&&k('"_"')))),a}function p(){var a;return f++,/^[\t\x0B\f \xA0\uFEFF]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\t\\x0B\\f \\xA0\\uFEFF]")),f--,0===f&&null===a&&k("whitespace"),a}function q(){var a;return/^[\n\r\u2028\u2029]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\n\\r\\u2028\\u2029]")),a}function r(){var a;return f++,10===b.charCodeAt(e)?(a="\n",e++):(a=null,0===f&&k('"\\n"')),null===a&&("\r\n"===b.substr(e,2)?(a="\r\n",e+=2):(a=null,0===f&&k('"\\r\\n"')),null===a&&(13===b.charCodeAt(e)?(a="\r",e++):(a=null,0===f&&k('"\\r"')),null===a&&(8232===b.charCodeAt(e)?(a="\u2028",e++):(a=null,0===f&&k('"\\u2028"')),null===a&&(8233===b.charCodeAt(e)?(a="\u2029",e++):(a=null,0===f&&k('"\\u2029"')))))),f--,0===f&&null===a&&k("end of line"),a}function s(){var a,c,d;return d=e,a=z(),null!==a?(59===b.charCodeAt(e)?(c=";",e++):(c=null,0===f&&k('";"')),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=y(),null!==a?(c=r(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=z(),null!==a?(c=t(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d))),a}function t(){var a,c;return c=e,f++,b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),f--,null===a?a="":(a=null,e=c),a}function u(){var a;return f++,a=v(),null===a&&(a=x()),f--,0===f&&null===a&&k("comment"),a}function v(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function w(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=q()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=q()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function x(){var a,c,d,g,h,i,j;if(h=e,"//"===b.substr(e,2)?(a="//",e+=2):(a=null,0===f&&k('"//"')),null!==a){for(c=[],i=e,j=e,f++,d=q(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,d=q(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?(d=q(),null===d&&(d=t()),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function y(){var a,b;for(a=[],b=p(),null===b&&(b=w(),null===b&&(b=x()));null!==b;)a.push(b),b=p(),null===b&&(b=w(),null===b&&(b=x()));return a}function z(){var a,b;for(a=[],b=p(),null===b&&(b=r(),null===b&&(b=u()));null!==b;)a.push(b),b=p(),null===b&&(b=r(),null===b&&(b=u()));return a}function A(){var a,b;return b=e,a=C(),null===a&&(a=B()),null!==a&&(a=function(a,b){return{type:"NumericLiteral",value:b}}(b,a)),null===a&&(e=b),a}function B(){var a,c,d;if(d=e,/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]")),null!==c)for(a=[];null!==c;)a.push(c),/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]"));else a=null;return null!==a&&(a=function(a,b){return parseInt(b.join(""))}(d,a)),null===a&&(e=d),a}function C(){var a,c,d,g,h;return g=e,h=e,a=B(),null!==a?(46===b.charCodeAt(e)?(c=".",e++):(c=null,0===f&&k('"."')),null!==c?(d=B(),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)):(a=null,e=h),null!==a&&(a=function(a,b){return parseFloat(b.join(""))}(g,a)),null===a&&(e=g),a}function D(){var a,c,d,g;if(g=e,/^[\-+]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\-+]")),a=null!==a?a:"",null!==a){if(/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]")),null!==d)for(c=[];null!==d;)c.push(d),/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]"));else c=null;null!==c?a=[a,c]:(a=null,e=g)}else a=null,e=g;return a}function E(){var a,b;return f++,b=e,a=F(),null!==a&&(a=function(a,b){return b}(b,a)),null===a&&(e=b),f--,0===f&&null===a&&k("identifier"),a}function F(){var a,b,c,d,g;if(f++,d=e,g=e,a=o(),null!==a){for(b=[],c=o();null!==c;)b.push(c),c=o();null!==b?a=[a,b]:(a=null,e=g)}else a=null,e=g;return null!==a&&(a=function(a,b,c){return b+c.join("")}(d,a[0],a[1])),null===a&&(e=d),f--,0===f&&null===a&&k("identifier"),a}function G(){var a,c,d,g,h,i,j;return i=e,a=E(),null!==a&&(a=function(a,b){return{type:"Variable",name:b}}(i,a)),null===a&&(e=i),null===a&&(a=A(),null===a&&(i=e,j=e,40===b.charCodeAt(e)?(a="(",e++):(a=null,0===f&&k('"("')),null!==a?(c=z(),null!==c?(d=P(),null!==d?(g=z(),null!==g?(41===b.charCodeAt(e)?(h=")",e++):(h=null,0===f&&k('")"')),null!==h?a=[a,c,d,g,h]:(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j),null!==a&&(a=function(a,b){return b}(i,a[2])),null===a&&(e=i))),a}function H(){var a,b,c,d,f;return a=G(),null===a&&(d=e,f=e,a=I(),null!==a?(b=z(),null!==b?(c=H(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)):(a=null,e=f),null!==a&&(a=function(a,b,c){return{type:"UnaryExpression",operator:b,expression:c}}(d,a[0],a[2])),null===a&&(e=d)),a}function I(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"')),null===a&&(33===b.charCodeAt(e)?(a="!",e++):(a=null,0===f&&k('"!"')))),a}function J(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=H(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=K(),null!==d?(f=z(),null!==f?(g=H(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=K(),null!==d?(f=z(),null!==f?(g=H(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"MultiplicativeExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function K(){var a;return 42===b.charCodeAt(e)?(a="*",e++):(a=null,0===f&&k('"*"')),null===a&&(47===b.charCodeAt(e)?(a="/",e++):(a=null,0===f&&k('"/"'))),a}function L(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=J(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=M(),null!==d?(f=z(),null!==f?(g=J(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=M(),null!==d?(f=z(),null!==f?(g=J(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"AdditiveExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function M(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"'))),a}function N(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=L(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=O(),null!==d?(f=z(),null!==f?(g=L(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=O(),null!==d?(f=z(),null!==f?(g=L(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"Inequality",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function O(){var a;return"<="===b.substr(e,2)?(a="<=",e+=2):(a=null,0===f&&k('"<="')),null===a&&(">="===b.substr(e,2)?(a=">=",e+=2):(a=null,0===f&&k('">="')),null===a&&(60===b.charCodeAt(e)?(a="<",e++):(a=null,0===f&&k('"<"')),null===a&&(62===b.charCodeAt(e)?(a=">",e++):(a=null,0===f&&k('">"'))))),a}function P(){var a,c,d,g,h,i,j,l,m;if(j=e,l=e,a=N(),null!==a){for(c=[],m=e,d=z(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=z(),null!==h?(i=N(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==d;)c.push(d),m=e,d=z(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=z(),null!==h?(i=N(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==c?a=[a,c]:(a=null,e=l)}else a=null,e=l;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"Equality",operator:c[e][1],left:d,right:c[e][3]};return d}(j,a[0],a[1])),null===a&&(e=j),a}function Q(a){a.sort();for(var b=null,c=[],d=0;d<a.length;d++)a[d]!==b&&(c.push(a[d]),b=a[d]);return c}function R(){for(var a=1,c=1,d=!1,f=0;f<Math.max(e,g);f++){var h=b.charAt(f);"\n"===h?(d||a++,c=1,d=!1):"\r"===h||"\u2028"===h||"\u2029"===h?(a++,c=1,d=!0):(c++,d=!1)}return{line:a,column:c}}var d={start:l,Statement:m,SourceCharacter:n,IdentifierStart:o,WhiteSpace:p,LineTerminator:q,LineTerminatorSequence:r,EOS:s,EOF:t,Comment:u,MultiLineComment:v,MultiLineCommentNoLineTerminator:w,SingleLineComment:x,_:y,__:z,Literal:A,Integer:B,Real:C,SignedInteger:D,Identifier:E,IdentifierName:F,PrimaryExpression:G,UnaryExpression:H,UnaryOperator:I,MultiplicativeExpression:J,MultiplicativeOperator:K,AdditiveExpression:L,AdditiveOperator:M,InequalityExpression:N,InequalityOperator:O,LinearExpression:P};if(void 0!==c){if(void 0===d[c])throw new Error("Invalid rule name: "+a(c)+".")}else c="start";var e=0,f=0,g=0,h=[],S=d[c]();if(null===S||e!==b.length){var T=Math.max(e,g),U=T<b.length?b.charAt(T):null,V=R();throw new this.SyntaxError(Q(h),U,T,V.line,V.column)}return S},toSource:function(){return this._source}};return b.SyntaxError=function(b,c,d,e,f){function g(b,c){var d,e;switch(b.length){case 0:d="end of input";break;case 1:d=b[0];break;default:d=b.slice(0,b.length-1).join(", ")+" or "+b[b.length-1]}return e=c?a(c):"end of input","Expected "+d+" but "+e+" found."}this.name="SyntaxError",this.expected=b,this.found=c,this.message=g(b,c),this.offset=d,this.line=e,this.column=f},b.SyntaxError.prototype=Error.prototype,b}(),function(a){"use strict";var b=new a.SimplexSolver,c={},d={},e=a.Strength.weak;a.Strength.medium,a.Strength.strong,a.Strength.required;var i=function(f){if(d[f])return d[f];switch(f.type){case"Inequality":var g="<="==f.operator?a.LEQ:a.GEQ,h=new a.Inequality(i(f.left),g,i(f.right),e);return b.addConstraint(h),h;case"Equality":var h=new a.Equation(i(f.left),i(f.right),e);return b.addConstraint(h),h;case"MultiplicativeExpression":var h=a.times(i(f.left),i(f.right));return b.addConstraint(h),h;case"AdditiveExpression":return"+"==f.operator?a.plus(i(f.left),i(f.right)):a.minus(i(f.left),i(f.right));case"NumericLiteral":return new a.Expression(f.value);case"Variable":return c[f.name]||(c[f.name]=new a.Variable({name:f.name})),c[f.name];case"UnaryExpression":console.log("UnaryExpression...WTF?")}},j=function(a){return a.map(i)};a._api=function(){var c=Array.prototype.slice.call(arguments);if(1==c.length){if("string"==typeof c[0]){var d=a.parser.parse(c[0]);return j(d)}"function"==typeof c[0]&&b._addCallback(c[0])}}}(this.c||module.parent.exports||{});
}).call(
  (typeof module != "undefined") ?
      (module.compiled = true && module) : this
);

var Expressions;

Expressions = (function() {
  function Expressions(engine, output) {
    this.engine = engine;
    this.output = output;
    this.commands = this.engine && this.engine.commands || this;
  }

  Expressions.prototype.pull = function() {
    var buffer, result;
    buffer = this.capture();
    this.engine.start();
    result = this.evaluate.apply(this, arguments);
    if (buffer) {
      this.flush();
    }
    return result;
  };

  Expressions.prototype.push = function(args, batch) {
    var buffer;
    if (args == null) {
      return;
    }
    if ((buffer = this.buffer) !== void 0) {
      if (!(this.engine._onBuffer && this.engine._onBuffer(buffer, args, batch) === false)) {
        (buffer || (this.buffer = [])).push(args);
      }
    } else {
      return this.output.pull.apply(this.output, args);
    }
  };

  Expressions.prototype.flush = function() {
    var added, buffer;
    buffer = this.buffer;
    if (this.engine._onFlush) {
      added = this.engine._onFlush(buffer);
      buffer = buffer && added && added.concat(buffer) || buffer || added;
    }
    this.lastOutput = GSS.clone(buffer);
    console.log(this.engine.onDOMContentLoaded && 'Document' || 'Worker', 'Output:', buffer);
    if (buffer) {
      this.buffer = void 0;
      return this.output.pull(buffer);
    } else if (this.buffer === void 0) {
      return this.engine.push();
    } else {
      return this.buffer = void 0;
    }
  };

  Expressions.prototype.evaluate = function(operation, continuation, scope, ascender, ascending, meta) {
    var args, contd, evaluate, evaluated, result, _ref;
    console.log('Evaluating', operation, continuation, [ascender, ascending, meta]);
    if (continuation === 'style$2….b$b4–') {
      debugger;
    }
    if (!operation.def) {
      this.analyze(operation);
    }
    if (!meta && (evaluate = (_ref = operation.parent) != null ? _ref.def.evaluate : void 0)) {
      evaluated = evaluate.call(this.engine, operation, continuation, scope, ascender, ascending);
      if (evaluated === false) {
        return;
      }
      if (typeof evaluated === 'string') {
        continuation = evaluated;
      }
    }
    if (operation.tail) {
      operation = this.skip(operation, ascender);
    }
    if (continuation && operation.path) {
      if ((result = this.reuse(operation.path, continuation)) !== false) {
        return result;
      }
    }
    args = this.resolve(operation, continuation, scope, ascender, ascending, meta);
    if (args === false) {
      return;
    }
    if (operation.def.noop) {
      result = args;
    } else {
      result = this.execute(operation, continuation, scope, args);
      contd = continuation;
      continuation = this.log(operation, continuation);
    }
    return this.ascend(operation, continuation, result, scope, ascender, contd === continuation);
  };

  Expressions.prototype.execute = function(operation, continuation, scope, args) {
    var command, context, func, method, node, onAfter, onBefore, result;
    scope || (scope = this.engine.scope);
    if (operation.def.scoped || !args) {
      node = scope;
      (args || (args = [])).unshift(scope);
    } else if (typeof args[0] === 'object') {
      node = args[0];
    } else if (!operation.bound) {
      node = this.engine.scope;
    } else {
      node = scope;
    }
    if (!(func = operation.func)) {
      if (method = operation.method) {
        if (node && (func = node[method])) {
          if (args[0] === node) {
            args.shift();
          }
          context = node;
        }
        if (!func) {
          if (!context && (func = scope[method])) {
            context = scope;
          } else if (command = this.commands[method]) {
            func = this.engine[command.reference];
          }
        }
      }
    }
    if (!func) {
      throw new Error("Couldn't find method: " + operation.method);
    }
    if (onBefore = operation.def.before) {
      result = this.engine[onBefore](context || node || scope, args, operation, continuation, scope);
    }
    if (result === void 0) {
      result = func.apply(context || this.engine, args);
    }
    if (onAfter = operation.def.after) {
      result = this.engine[onAfter](context || node || scope, args, result, operation, continuation, scope);
    }
    if (result !== result) {
      args.unshift(operation.name);
      return args;
    }
    return result;
  };

  Expressions.prototype.reuse = function(path, continuation) {
    var bit, index, key, length, _i, _len, _ref;
    length = path.length;
    _ref = continuation.split('–');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      bit = key;
      if ((index = bit.indexOf('…')) > -1) {
        bit = bit.substring(index + 1);
      }
      if (bit === path || bit.substring(0, path.length) === path) {
        if (length < bit.length && bit.charAt(length) === '$') {
          return this.engine.elements[bit.substring(length)];
        } else {
          return this.engine.queries.get(key);
        }
      }
    }
    return false;
  };

  Expressions.prototype.resolve = function(operation, continuation, scope, ascender, ascending, meta) {
    var args, argument, contd, index, offset, prev, shift, skip, stopping, _i, _len;
    args = prev = void 0;
    skip = operation.skip;
    shift = 0;
    offset = operation.offset || 0;
    for (index = _i = 0, _len = operation.length; _i < _len; index = ++_i) {
      argument = operation[index];
      if (offset > index) {
        continue;
      }
      if (!offset && index === 0 && !operation.def.noop) {
        args = [operation, continuation || operation.path, scope];
        shift += 2;
        continue;
      } else if (ascender === index) {
        argument = ascending;
      } else if (skip === index) {
        shift--;
        continue;
      } else if (argument instanceof Array) {
        if (ascender != null) {
          contd = continuation;
          if (operation.def.rule && ascender === 1) {
            if (contd.charAt(contd.length - 1) !== '…') {
              contd += '…';
            }
          } else {
            if (contd.charAt(contd.length - 1) !== '–') {
              contd += '–';
            }
          }
        }
        argument = this.evaluate(argument, contd || continuation, scope, void 0, prev);
      }
      if (argument === void 0) {
        if (!operation.def.eager || (ascender != null)) {
          if (!operation.def.capture && (operation.parent ? operation.def.noop : !operation.name)) {
            stopping = true;
          } else if (!operation.def.noop || operation.name) {
            return false;
          }
        }
        offset += 1;
        continue;
      }
      (args || (args = []))[index - offset + shift] = prev = argument;
    }
    return args;
  };

  Expressions.prototype.ascend = function(operation, continuation, result, scope, ascender, hidden) {
    var breadcrumbs, item, parent, _i, _len, _ref;
    if (result != null) {
      if ((parent = operation.parent) || operation.def.noop) {
        if (parent && this.engine.isCollection(result)) {
          if (continuation === ".group .vessel$vessel1… .box:last-child") {
            debugger;
          }
          console.group(continuation);
          for (_i = 0, _len = result.length; _i < _len; _i++) {
            item = result[_i];
            breadcrumbs = this.engine.getContinuation(continuation, item);
            this.evaluate(operation.parent, breadcrumbs, scope, operation.index, item);
          }
          console.groupEnd(continuation);
          return;
        } else if ((parent != null ? (_ref = parent.def.capture) != null ? _ref.call(this.engine, result, operation, continuation, scope) : void 0 : void 0) === true) {
          return;
        } else {
          if (operation.def.noop && operation.name && result.length === 1) {
            return;
          }
          if (operation.def.noop || (parent.def.noop && !parent.name)) {
            if (result && (!parent || (parent.def.noop && (!parent.parent || parent.length === 1) || (ascender != null)))) {
              return this.push(result.length === 1 ? result[0] : result);
            }
          } else if (parent && ((ascender != null) || (result.nodeType && (!operation.def.hidden || parent.tail === parent)))) {
            this.evaluate(parent, continuation, scope, operation.index, result);
            return;
          } else {
            return result;
          }
        }
      } else {
        return this.push(result);
      }
    }
    return result;
  };

  Expressions.prototype.skip = function(operation, ascender) {
    var _base;
    if (operation.tail.path === operation.tail.key || (ascender != null)) {
      return (_base = operation.tail).shortcut || (_base.shortcut = this.engine.commands[operation.def.group].perform.call(this.engine, operation));
    } else {
      return operation.tail[1];
    }
  };

  Expressions.prototype.analyze = function(operation, parent) {
    var child, def, func, groupper, index, otherdef, _i, _len, _ref;
    if (typeof operation[0] === 'string') {
      operation.name = operation[0];
    }
    def = this.commands[operation.name];
    if (parent) {
      operation.parent = parent;
      operation.index = parent.indexOf(operation);
      if (parent.bound || ((_ref = parent.def) != null ? _ref.bound : void 0) === operation.index) {
        operation.bound = true;
      }
    }
    operation.arity = operation.length - 1;
    if (def && def.lookup) {
      if (operation.arity > 1) {
        operation.arity--;
        operation.skip = operation.length - operation.arity;
      } else {
        operation.skip = 1;
      }
      operation.name = (def.prefix || '') + operation[operation.skip] + (def.suffix || '');
      otherdef = def;
      switch (typeof def.lookup) {
        case 'function':
          def = def.lookup.call(this, operation);
          break;
        case 'string':
          def = this.commands[def.lookup + operation.name];
          break;
        default:
          def = this.commands[operation.name];
      }
    }
    operation.def = def || (def = {
      noop: true
    });
    for (index = _i = 0, _len = operation.length; _i < _len; index = ++_i) {
      child = operation[index];
      if (child instanceof Array) {
        this.analyze(child, operation);
      }
    }
    if (def.noop) {
      return;
    }
    if (def.serialized) {
      operation.key = this.serialize(operation, otherdef, false);
      operation.path = this.serialize(operation, otherdef);
      if (def.group) {
        operation.groupped = this.serialize(operation, otherdef, def.group);
        if (groupper = this.commands[def.group]) {
          groupper.analyze(operation, false);
        }
      }
    }
    if (typeof def === 'function') {
      func = def;
      operation.offset = 1;
    } else if (func = def[operation.arity]) {
      operation.offset = 1;
    } else {
      func = def.command;
    }
    if (def.offset) {
      if (operation.offset == null) {
        operation.offset = def.offset;
      }
    }
    if (typeof func === 'string') {
      operation.method = func;
    } else {
      operation.func = func;
    }
    return operation;
  };

  Expressions.prototype.serialize = function(operation, otherdef, group) {
    var after, before, def, groupper, index, op, prefix, separator, suffix, tail, _i, _ref;
    def = operation.def;
    prefix = def.prefix || (otherdef && otherdef.prefix) || (operation.def.noop && operation.name) || '';
    suffix = def.suffix || (otherdef && otherdef.suffix) || '';
    separator = operation.def.separator;
    after = before = '';
    for (index = _i = 1, _ref = operation.length; 1 <= _ref ? _i < _ref : _i > _ref; index = 1 <= _ref ? ++_i : --_i) {
      if (op = operation[index]) {
        if (typeof op !== 'object') {
          after += op;
        } else if (op.key && group !== false) {
          if (group && (groupper = this.commands[group])) {
            if (op.def.group === group) {
              if (tail = op.tail || (op.tail = groupper.condition(op) && op)) {
                operation.groupped = groupper.promise(op, operation);
                tail.head = operation;
                operation.tail = tail;
                before += (before && separator || '') + op.groupped || op.key;
              } else {
                continue;
              }
            } else {
              group = false;
              continue;
            }
          } else if (separator) {
            before += (before && separator || '') + op.path;
          } else {
            before += op.path;
          }
        }
      }
    }
    return before + prefix + after + suffix;
  };

  Expressions.prototype.log = function(operation, continuation) {
    if (continuation != null) {
      if (operation.def.serialized && !operation.def.hidden) {
        return continuation + operation.key;
      }
      return continuation;
    } else {
      return operation.path;
    }
  };

  Expressions.prototype.release = function() {
    if (this.engine.expressions.buffer) {
      return this.engine.expressions.flush();
    } else {
      return this.engine.expressions.buffer = void 0;
    }
  };

  Expressions.prototype.capture = function() {
    if (this.buffer === void 0) {
      this.buffer = null;
      return true;
    }
  };

  return Expressions;

})();

this.module || (this.module = {});

module.exports = Expressions;

var Values;

Values = (function() {
  function Values(engine) {
    this.engine = engine;
    this._observers = {};
    this._watchers = {};
  }

  Values.prototype.indexOf = function(array, a, b, c) {
    var index, op, _i, _len;
    if (array) {
      for (index = _i = 0, _len = array.length; _i < _len; index = _i += 3) {
        op = array[index];
        if (op === a && array[index + 1] === b && array[index + 2] === c) {
          return index;
        }
      }
    }
    return -1;
  };

  Values.prototype.watch = function(id, property, operation, continuation, scope) {
    var observers, path, watchers, _base, _base1;
    path = this.engine.getPath(id, property);
    if (this.indexOf(this._watchers[path], operation, continuation, scope) === -1) {
      observers = (_base = this._observers)[continuation] || (_base[continuation] = []);
      observers.push(operation, path, scope);
      watchers = (_base1 = this._watchers)[path] || (_base1[path] = []);
      watchers.push(operation, continuation, scope);
    }
    return this.get(path);
  };

  Values.prototype.unwatch = function(id, property, operation, continuation, scope) {
    var index, observers, path, watchers;
    path = this.engine.getPath(id, property);
    observers = this._observers[continuation];
    index = this.indexOf(observers, operation, path, scope);
    observers.splice(index, 3);
    if (!observers.length) {
      delete this._observers[continuation];
    }
    watchers = this._watchers[path];
    index = this.indexOf(watchers, operation, continuation, scope);
    watchers.splice(index, 3);
    if (!watchers.length) {
      return delete this._watchers[path];
    }
  };

  Values.prototype.clean = function(continuation) {
    var observers, path, _i, _len, _ref;
    _ref = this.engine.getPossibleContinuations(continuation);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      path = _ref[_i];
      if (observers = this._observers[path]) {
        while (observers[0]) {
          this.unwatch(observers[1], void 0, observers[0], path, observers[2]);
        }
      }
    }
    return this;
  };

  Values.prototype.pull = function(object) {
    return this.merge(object);
  };

  Values.prototype.get = function(id, property) {
    return this[this.engine.getPath(id, property)];
  };

  Values.prototype.set = function(id, property, value) {
    var buffer, index, old, path, watcher, watchers, _i, _len, _ref;
    if (arguments.length === 2) {
      value = property;
      property = void 0;
    }
    path = this.engine.getPath(id, property);
    old = this[path];
    if (old === value) {
      return;
    }
    if (value != null) {
      this[path] = value;
    } else {
      delete this[path];
    }
    if (this.engine._onChange) {
      this.engine._onChange(path, value, old);
    }
    if (watchers = (_ref = this._watchers) != null ? _ref[path] : void 0) {
      buffer = this.engine.expressions.capture();
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        if (!watcher) {
          break;
        }
        this.engine.expressions.evaluate(watcher.parent, watchers[index + 1], watchers[index + 2], watcher.index, value);
      }
      if (buffer) {
        this.engine.expressions.flush();
      }
    }
    return value;
  };

  Values.prototype.merge = function(object) {
    var buffer, path, value;
    buffer = this.engine.expressions.capture();
    for (path in object) {
      value = object[path];
      this.set(path, void 0, value);
    }
    if (buffer) {
      this.engine.expressions.release(buffer);
    }
    return this;
  };

  Values.prototype.toObject = function() {
    var object, property, value;
    object = {};
    for (property in this) {
      value = this[property];
      if (this.hasOwnProperty(property)) {
        if (property !== 'engine' && property !== '_observers' && property !== '_watchers') {
          object[property] = value;
        }
      }
    }
    return object;
  };

  return Values;

})();

module.exports = Values;

var Engine;

this.require || (this.require = function(string) {
  var bits;
  bits = string.replace('.js', '').split('/');
  if (string === 'cassowary') {
    return c;
  }
  return this[bits[bits.length - 1]];
});

Engine = (function() {
  Engine.prototype.Expressions = require('./input/Expressions.js');

  Engine.prototype.Values = require('./input/Values.js');

  function Engine(scope, url) {
    var Document, engine, id;
    if (scope && scope.nodeType) {
      if (this.Expressions) {
        if (Document = Engine.Document) {
          if (!(this instanceof Document)) {
            return new Document(scope, url);
          }
        }
        Engine[Engine.identify(scope)] = this;
        this.scope = scope;
        this.all = scope.getElementsByTagName('*');
      } else {
        while (scope) {
          if (id = Engine.recognize(scope)) {
            if (engine = Engine[id]) {
              return engine;
            }
          }
          if (!scope.parentNode) {
            break;
          }
          scope = scope.parentNode;
        }
      }
    }
    if (!scope || typeof scope === 'string') {
      if (Engine.Solver && !(this instanceof Engine.Solver)) {
        return new Engine.Solver(void 0, void 0, scope);
      }
    }
    if (this.Expressions) {
      if (this.Properties) {
        this.properties = new this.Properties(this);
      }
      if (this.Commands) {
        this.commands = new this.Commands(this);
      }
      this.expressions = new this.Expressions(this);
      this.values = new this.Values(this);
      this.events = {};
      return;
    }
    return new (Engine.Document || Engine)(scope, url);
  }

  Engine.prototype.run = function() {
    return this.expressions.pull.apply(this.expressions, arguments);
  };

  Engine.prototype.pull = function() {
    return this.expressions.pull.apply(this.expressions, arguments);
  };

  Engine.prototype["do"] = function() {
    return this.expressions["do"].apply(this.expressions, arguments);
  };

  Engine.prototype.defer = function() {
    var _base;
    if (this.deferred == null) {
      (_base = this.expressions).buffer || (_base.buffer = null);
      this.deferred = (window.setImmediate || window.setTimeout)(this.expressions.flush.bind(this.expressions), 0);
    }
    return this.run.apply(this, arguments);
  };

  Engine.prototype.push = function(data) {
    var id, _i, _len, _ref;
    if (this.removed) {
      _ref = this.removed;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        delete this.engine.elements[id];
      }
      this.removed = void 0;
    }
    this.values.merge(data);
    this.triggerEvent('solved', data);
    if (this.scope) {
      this.dispatchEvent(this.scope, 'solved', data);
    }
    if (this.output) {
      return this.output.pull.apply(this.output, arguments);
    }
  };

  Engine.prototype.isCollection = function(object) {
    if (object && object.length !== void 0 && !object.substring && !object.nodeType) {
      switch (typeof object[0]) {
        case "object":
          return object[0].nodeType;
        case "undefined":
          return object.length === 0;
      }
    }
  };

  Engine.prototype.destroy = function() {
    if (this.scope) {
      return Engine[this.scope._gss_id] = void 0;
    }
  };

  Engine.prototype.getContinuation = function(path, value) {
    if (path) {
      path = path.replace(/[–…]$/, '');
    }
    if (value == null) {
      return path;
    }
    if (typeof value === 'string') {
      return value;
    }
    return path + Engine.identify(value);
  };

  Engine.prototype.getPossibleContinuations = function(path) {
    return [path, path + '–', path + '…'];
  };

  Engine.prototype.getPath = function(id, property) {
    if (!property) {
      property = id;
      id = void 0;
    }
    if (property.indexOf('[') > -1 || !id) {
      return property;
    } else {
      return id + '[' + property + ']';
    }
  };

  Engine.identify = function(object, generate) {
    var id;
    if (!(id = object._gss_id)) {
      if (object === document) {
        object = window;
      }
      if (generate !== false) {
        object._gss_id = id = "$" + (object.id || ++Engine.uid);
      }
      Engine.prototype.elements[id] = object;
    }
    return id;
  };

  Engine.recognize = function(object) {
    return Engine.identify(object, false);
  };

  Engine.prototype.identify = function(object) {
    return Engine.identify(object);
  };

  Engine.prototype.recognize = function(object) {
    return Engine.identify(object, false);
  };

  Engine.uid = 0;

  Engine.prototype.elements = {};

  Engine.prototype.engines = {};

  Engine.prototype.once = function(type, fn) {
    fn.once = true;
    return this.addEventListener(type, fn);
  };

  Engine.prototype.addEventListener = function(type, fn) {
    var _base;
    return ((_base = this.events)[type] || (_base[type] = [])).push(fn);
  };

  Engine.prototype.removeEventListener = function(type, fn) {
    var group, index;
    if (group = this.events && this.events[type]) {
      if ((index = group.indexOf(fn)) > -1) {
        return group.splice(index, 1);
      }
    }
  };

  Engine.prototype.triggerEvent = function(type, a, b, c) {
    var fn, group, index, method, _i;
    if (group = this.events[type]) {
      for (index = _i = group.length - 1; _i >= 0; index = _i += -1) {
        fn = group[index];
        if (fn.once) {
          group.splice(index, 1);
        }
        fn.call(this, a, b, c);
      }
    }
    if (this[method = 'on' + type]) {
      return this[method](a, b, c);
    }
  };

  Engine.prototype.dispatchEvent = function(element, type, detail, bubbles, cancelable) {
    if (!this.scope) {
      return;
    }
    (detail || (detail = {})).engine = this;
    return element.dispatchEvent(new CustomEvent(type, {
      detail: detail,
      bubbles: bubbles,
      cancelable: cancelable
    }));
  };

  Engine.clone = function(object) {
    if (object && object.map) {
      return object.map(this.clone, this);
    }
    return object;
  };

  Engine.include = function() {
    var Context, fn, mixin, name, _i, _len, _ref;
    Context = function(engine) {
      this.engine = engine;
    };
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      mixin = arguments[_i];
      _ref = mixin.prototype;
      for (name in _ref) {
        fn = _ref[name];
        Context.prototype[name] = fn;
      }
    }
    return Context;
  };

  Engine.prototype.handleEvent = function(e) {
    return this.triggerEvent(e.type, e);
  };

  Engine.prototype.start = function() {
    var command, key, property, _ref, _ref1;
    if (this.running) {
      return;
    }
    _ref = this.commands;
    for (key in _ref) {
      command = _ref[key];
      if (command === this) {
        continue;
      }
      command.reference = '_' + key;
      this[command.reference] = Engine.Command(command, command.reference);
    }
    _ref1 = this.properties;
    for (key in _ref1) {
      property = _ref1[key];
      if (property === this) {
        continue;
      }
      Engine.Property(property, key, this.properties);
    }
    return this.running = true;
  };

  Engine.Property = function(property, reference, properties) {
    var key, path, value;
    if (typeof property === 'object') {
      for (key in property) {
        value = property[key];
        if (property === 'shortcut') {

        } else {
          if (reference.match(/^[a-z]/i)) {
            path = reference + '-' + key;
          } else {
            path = reference + key;
          }
          properties[path] = Engine.Property(value, path, properties);
        }
      }
    }
    return property;
  };

  Engine.Command = function(command, reference) {
    var helper, key, value;
    if (typeof command !== 'function') {
      helper = Engine.Helper(command);
      for (key in command) {
        value = command[key];
        helper[key] = value;
      }
      command = helper;
    }
    command.reference = reference;
    return command;
  };

  Engine.Helper = function(command, scoped) {
    var func;
    if (typeof command === 'function') {
      func = command;
    }
    return function(scope) {
      var args, context, fn, length, method;
      args = Array.prototype.slice.call(arguments, 0);
      length = arguments.length;
      if (scoped || command.serialized) {
        if (!(scope && scope.nodeType)) {
          scope = this.scope || document;
          if (typeof command[args.length] === 'string') {
            context = scope;
          } else {
            args.unshift(scope);
          }
        } else {
          if (typeof command[args.length - 1] === 'string') {
            context = scope = args.shift();
          }
        }
      }
      if (!(fn = func)) {
        if (typeof (method = command[args.length]) === 'function') {
          fn = method;
        } else {
          if (!(method && (fn = scope[method]))) {
            if (fn = this.commands[method]) {
              context = this;
            } else {
              fn = command.command;
              args = [null, args[2], null, args[0], args[1]];
            }
          }
        }
      }
      return fn.apply(context || this, args);
    };
  };

  return Engine;

})();

this.GSS = Engine;

module.exports = Engine;

var Equasions;

Equasions = (function() {
  function Equasions() {}

  Equasions.prototype.right = function(scope, path) {
    return this['_+'](this._get(scope, "x", path), this._get(scope, "width", path));
  };

  Equasions.prototype.bottom = function(scope, path) {
    return this['_+'](this._get(scope, "y", path), this._get(scope, "height", path));
  };

  Equasions.prototype.center = {
    x: function(scope, path) {
      return this['_+'](this._get(scope, "x", path), this['_/'](this._get(scope, "width", path), 2));
    },
    y: function(scope, path) {
      return this['_+'](this._get(scope, "y", path), this['_/'](this._get(scope, "height", path), 2));
    }
  };

  return Equasions;

})();

module.exports = Equasions;

var Constraints, method, property, _ref;

Constraints = (function() {
  function Constraints() {}

  Constraints.prototype.onConstraint = function(node, args, result, operation, continuation, scope) {
    var arg, _i, _len;
    if (result instanceof c.Constraint || result instanceof c.Expression) {
      result = [result];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        if (arg instanceof c.Variable) {
          result.push(arg);
        }
        if (arg.paths) {
          result.push.apply(result, arg.paths);
          arg.paths = void 0;
        }
      }
    }
    if (result.length > 0) {
      if (result.length > 1) {
        result[0].paths = result.splice(1);
      }
      return result[0];
    }
    return result;
  };

  Constraints.prototype.get = function(scope, property, path) {
    var variable;
    if (typeof this.properties[property] === 'function' && scope) {
      return this.properties[property].call(this, scope, path);
    } else {
      variable = this._var(this.getPath(scope, property));
    }
    return [variable, path || (property && scope) || ''];
  };

  Constraints.prototype.remove = function() {
    var constrain, constraints, path, _i, _j, _len;
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      path = arguments[_i];
      if (constraints = this.solutions.variables[path]) {
        for (_j = constraints.length - 1; _j >= 0; _j += -1) {
          constrain = constraints[_j];
          this.solutions.remove(constrain, path);
        }
      }
    }
    return this;
  };

  Constraints.prototype["var"] = function(name) {
    var _base;
    return (_base = this.solutions.variables)[name] || (_base[name] = new c.Variable({
      name: name
    }));
  };

  Constraints.prototype.strength = function(strength) {
    return c.Strength[strength];
  };

  Constraints.prototype.weight = function(weight) {
    return weight;
  };

  Constraints.prototype.varexp = function(name) {
    return new c.Expression({
      name: name
    });
  };

  Constraints.prototype['=='] = function(left, right, strength, weight) {
    return new c.Equation(left, right, this._strength(strength), this._weight(weight));
  };

  Constraints.prototype['<='] = function(left, right, strength, weight) {
    return new c.Inequality(left, c.LEQ, right, this._strength(strength), this._weight(weight));
  };

  Constraints.prototype['>='] = function(left, right, strength, weight) {
    return new c.Inequality(left, c.GEQ, right, this._strength(strength), this._weight(weight));
  };

  Constraints.prototype['<'] = function(left, right, strength, weight) {
    return new c.Inequality(left, c.LEQ, right, this._strength(strength), this._weight(weight));
  };

  Constraints.prototype['>'] = function(left, right, strength, weight) {
    return new c.Inequality(left, c.GEQ, right, this._strength(strength), this._weight(weight));
  };

  Constraints.prototype['+'] = function(left, right, strength, weight) {
    return c.plus(left, right);
  };

  Constraints.prototype['-'] = function(left, right, strength, weight) {
    return c.minus(left, right);
  };

  Constraints.prototype['*'] = function(left, right, strength, weight) {
    return c.times(left, right);
  };

  Constraints.prototype['/'] = function(left, right, strength, weight) {
    return c.divide(left, right);
  };

  return Constraints;

})();

_ref = Constraints.prototype;
for (property in _ref) {
  method = _ref[property];
  if (method.length > 3 && property !== 'onConstraint') {
    (function(property, method) {
      return Constraints.prototype[property] = function(left, right, strength, weight) {
        var overloaded, value;
        if (left.push) {
          overloaded = left = this._onConstraint(null, null, left);
        }
        if (right.push) {
          overloaded = right = this._onConstraint(null, null, right);
        }
        value = method.call(this, left, right, strength, weight);
        if (overloaded) {
          return this._onConstraint(null, [left, right], value);
        }
        return value;
      };
    })(property, method);
  }
  Constraints.prototype[property].after = '_onConstraint';
}

module.exports = Constraints;

var Solutions;

Solutions = (function() {
  function Solutions(engine, output) {
    this.engine = engine;
    this.output = output;
    this.solver = new c.SimplexSolver();
    this.solver.autoSolve = false;
    c.debug = true;
    this.variables = {};
  }

  Solutions.prototype.pull = function(commands) {
    var command, property, response, subcommand, value, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    this.response = response = {};
    this.lastInput = commands;
    for (_i = 0, _len = commands.length; _i < _len; _i++) {
      command = commands[_i];
      if (command instanceof Array && typeof command[0] === 'object') {
        for (_j = 0, _len1 = command.length; _j < _len1; _j++) {
          subcommand = command[_j];
          this.add(subcommand);
        }
      } else {
        this.add(command);
      }
    }
    if (this.constrained) {
      this.constrained = void 0;
      this.solver.solve();
    } else {
      this.solver.resolve();
    }
    _ref = this.solver._changed;
    for (property in _ref) {
      value = _ref[property];
      response[property] = value;
    }
    this.solver._changed = void 0;
    if (this.nullified) {
      _ref1 = this.nullified;
      for (property in _ref1) {
        value = _ref1[property];
        if (!this.added || !(this.added[property] != null)) {
          this.nullify(value);
          response[property] = null;
        }
      }
    }
    if (this.added) {
      _ref2 = this.added;
      for (property in _ref2) {
        value = _ref2[property];
        if (!response[property] && (!this.nullified || !this.nullified[property])) {
          response[property] = 0;
        }
      }
    }
    console.error(this.added, this.nullified);
    this.added = this.nullified = void 0;
    this.lastOutput = response;
    console.log('Solutions output', JSON.parse(JSON.stringify(response)));
    this.push(response);
  };

  Solutions.prototype.push = function(results) {
    if (this.output) {
      return this.output.pull(results);
    } else {
      this.engine.values.merge(results);
      return this.engine.push(results);
    }
  };

  Solutions.prototype.remove = function(constrain, path) {
    var group, index, _i, _len, _ref, _results;
    if (constrain instanceof c.Constraint) {
      this.solver.removeConstraint(constrain);
      _ref = constrain.paths;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        if (typeof path === 'string') {
          if (group = this.variables[path]) {
            if ((index = group.indexOf(constrain)) > -1) {
              group.splice(index, 1);
            }
            if (!group.length) {
              _results.push(delete this.variables[path]);
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        } else {
          if (!--path.counter) {
            _results.push((this.nullified || (this.nullified = {}))[path.name] = path);
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    }
  };

  Solutions.prototype.nullify = function(path) {
    var cei, variable;
    variable = this.variables[path.name];
    if (variable.editing) {
      cei = this.solver._editVarMap.get(variable);
      this.solver.removeColumn(cei.editMinus);
      this.solver._editVarMap["delete"](variable);
    }
    delete this.variables[path.name];
    return this.solver._externalParametricVars["delete"](path);
  };

  Solutions.prototype.add = function(command) {
    var path, _base, _i, _len, _ref, _results;
    if (command instanceof c.Constraint) {
      this.constrained = true;
      this.solver.addConstraint(command);
      if (command.paths) {
        _ref = command.paths;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path = _ref[_i];
          if (typeof path === 'string') {
            _results.push(((_base = this.variables)[path] || (_base[path] = [])).push(command));
          } else {
            path.counter = (path.counter || 0) + 1;
            if (path.counter === 1) {
              if (this.nullified && this.nullified[path.name]) {
                _results.push(delete this.nullified[path.name]);
              } else {
                _results.push((this.added || (this.added = {}))[path.name] = 0);
              }
            } else {
              _results.push(void 0);
            }
          }
        }
        return _results;
      }
    } else if (this[command[0]]) {
      return this[command[0]].apply(this, Array.prototype.slice.call(command, 1));
    }
  };

  Solutions.prototype.edit = function(variable, strength, weight) {
    var constraint;
    strength = this.engine._strength(strength);
    weight = this.engine._weight(weight);
    c.trace && c.fnenterprint("addEditVar: " + constraint + " @ " + strength + " {" + weight + "}");
    constraint = new c.EditConstraint(variable, strength || c.Strength.strong, weight);
    this.solver.addConstraint(constraint);
    variable.editing = constraint;
    return constraint;
  };

  Solutions.prototype.suggest = function(path, value, strength, weight) {
    var variable;
    if (typeof path === 'string') {
      if (!(variable = this.variables[path])) {
        return this.response[path] = value;
      }
    } else {
      variable = path;
    }
    if (!variable.editing) {
      this.edit(variable, strength, weight);
    }
    this.solver.suggestValue(variable, value);
    return variable;
  };

  Solutions.prototype.stay = function() {
    var arg, _i, _len;
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      arg = arguments[_i];
      this.solver.addStay(arg);
    }
  };

  return Solutions;

})();

module.exports = Solutions;

var Engine,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Engine = require('./Engine.js');

Engine.Solver = (function(_super) {
  __extends(Solver, _super);

  Solver.prototype.Solutions = require('./output/Solutions.js');

  Solver.prototype.Commands = require('./commands/Constraints.js');

  Solver.prototype.Properties = require('./properties/Equasions.js');

  function Solver(input, output, url) {
    var context;
    this.input = input;
    this.output = output;
    if (context = Solver.__super__.constructor.call(this)) {
      return context;
    }
    if (!this.useWorker(url)) {
      this.solutions = new this.Solutions(this, this.output);
      this.expressions.output = this.solutions;
    }
  }

  Solver.prototype.remove = function(id) {
    return this.solutions.remove(id);
  };

  Solver.prototype.onmessage = function(e) {
    return this.push(e.data);
  };

  Solver.prototype.onerror = function(e) {
    throw new Error("" + e.message + " (" + e.filename + ":" + e.lineno + ")");
  };

  Solver.prototype.useWorker = function(url) {
    var _this = this;
    if (!(typeof url === 'string' && self.onmessage !== void 0)) {
      return;
    }
    this.worker = new this.getWorker(url);
    this.worker.addEventListener('message', this.onmessage.bind(this));
    this.worker.addEventListener('error', this.onerror.bind(this));
    this.pull = this.run = function() {
      return _this.worker.postMessage.apply(_this.worker, arguments);
    };
    return this.worker;
  };

  Solver.prototype.getWorker = function(url) {
    return new Worker(url);
  };

  Solver.prototype.getPath = function(scope, property) {
    if (!(scope && property)) {
      return scope || property;
    }
    return (scope || '') + '[' + (property || '') + ']';
  };

  return Solver;

})(Engine);

Engine.Thread = (function(_super) {
  __extends(Thread, _super);

  function Thread() {
    var context;
    if ((context = Thread.__super__.constructor.call(this)) && context !== this) {
      return context;
    }
    this.solutions.push = function(data) {
      return self.postMessage(data);
    };
  }

  Thread.handleEvent = function(e) {
    this.instance || (this.instance = new Engine.Thread);
    return this.instance.pull(e.data);
  };

  return Thread;

})(Engine.Solver);

if (!self.window && self.onmessage !== void 0) {
  self.addEventListener('message', function(e) {
    return Engine.Thread.handleEvent(e);
  });
}

module.exports = Engine.Solver;
