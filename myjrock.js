
function $$$(cid)
{
let element = document.getElementById(cid);
if(!element) throw "Invalid id: "+cid;
return new MyjrockElement(element);
}

$$$.model ={
"onStartup":[],
"accordians":[],
"modals":[]
};

$$$.modals = {};
$$$.modals.show = function(mid)
{
var modal = null;
for(var i=0; i<$$$.model.modals.length; i++)
{
if($$$.model.modals[i].getContentId()==mid)
{
modal = $$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
}
function Modal(cref)
{
var objectAddress = this;
this.afterOpening = null;
this.beforeOpening = null;
this.afterClosing= null;
this.beforeClosing = null;
var contentReference = cref;
this.getContentId = function()
{
return contentReference.id;
}
var modalMaskDivision = document.createElement("div");
modalMaskDivision.style.display = "none";
modalMaskDivision.classList.add("myjrock_modalMask");
var modalDivision = document.createElement("div");
modalDivision.style.display = "none";
modalDivision.classList.add("myjrock_modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);
var headerDivision = document.createElement("div");
headerDivision.style.background = "#e9e9e9";
headerDivision.style.width = modalDivision.width;
headerDivision.style.height = "30px";
headerDivision.style.padding = "5px";
headerDivision.style.borderRadius="5px";
modalDivision.appendChild(headerDivision);
if(contentReference.hasAttribute("size"))
{
var sz = contentReference.getAttribute("size");
var xpos = sz.indexOf("x");
if(xpos==-1) throw "in case of modal size should be specified as widthxheight";
if(xpos==0 || xpos==sz.length-1) throw "in case of modal size should be specified as widthxheight";
let width = sz.substring(0,xpos);
let height = sz.substring(xpos+1);
modalDivision.style.width= width+"px";
modalDivision.style.height = height+"px";
}
else
{
modalDivision.style.width="300px";
modalDivision.style.height= "300px";
}

if(contentReference.hasAttribute("header"))
{
var hd = contentReference.getAttribute("header");
headerDivision.innerHTML = hd;
}
if(contentReference.hasAttribute("maskColor"))
{
var mc = contentReference.getAttribute("maskColor");
modalMaskDivision.style.background = mc;
}
if(contentReference.hasAttribute("modalBackgroundColor"))
{
var mbg = contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background = mbg;
}
var contentDivision = document.createElement("div");
contentDivision.style.overflow = "auto";
contentDivision.style.padding = "5px";
var contentReferenceHeight  = parseInt(modalDivision.style.height)-92;
contentDivision.style.height = contentReferenceHeight+"px";
contentReference.remove();
contentDivision.appendChild(contentReference);
contentReference.style.display = "block";
contentReference.style.visibility = "visible";
modalDivision.appendChild(contentDivision);
var footerDivision = document.createElement("div");
footerDivision.style.width = modalDivision.width;
footerDivision.style.height = "30px";
footerDivision.style.backgroundColor = "#e9e9e9";
footerDivision.style.position = "absolute";
footerDivision.style.bottom  = "0";
footerDivision.style.left  = "0";
footerDivision.style.right  = "0";
footerDivision.style.padding = "5px";
footerDivision.style.borderRadius="5px";
modalDivision.appendChild(footerDivision);

if(contentReference.hasAttribute("footer"))
{
var ft = contentReference.getAttribute("footer");
footerDivision.innerHTML = ft;
}
var closeButtonSpan =null;
if(contentReference.hasAttribute("closeButton"))
{
var cb = contentReference.getAttribute("closeButton");
if(cb.toUpperCase()=="TRUE")
{
closeButtonSpan = document.createElement("span");
closeButtonSpan.classList.add("myjrock_closeButton");
var closeButtonMaker = document.createElement("img");
closeButtonMaker.src="icons/crossIcon.png";
closeButtonMaker.width="12";
closeButtonMaker.height="12";
closeButtonSpan.appendChild(closeButtonMaker);
headerDivision.appendChild(closeButtonSpan);
}
}
if(contentReference.hasAttribute("afterOpening"))
{
var oo = contentReference.getAttribute("afterOpening");
this.afterOpening = oo;
}
if(contentReference.hasAttribute("beforeOpening"))
{
var bc = contentReference.getAttribute("beforeOpening");
this.beforeOpening = bc;
}
if(contentReference.hasAttribute("afterClosing"))
{
var oc = contentReference.getAttribute("afterClosing");
this.afterClosing = oc;
}
if(contentReference.hasAttribute("beforeClosing"))
{
var bc = contentReference.getAttribute("beforeClosing");
this.beforeClosing = bc;
}
this.show = function()
{
let openModal = true;
if(this.beforeOpening)
{
openModal = eval(objectAddress.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display = "block";
modalDivision.style.display = "block";
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
};
if(closeButtonSpan!=null)
{
closeButtonSpan.onclick = function()
{
let closeModal = true;
if(objectAddress.beforeClosing)
{
closeModal = eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalMaskDivision.style.display = "none";
modalDivision.style.display = "none";
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
};
}
}

//modal specific code ends here

$$$.accordianHeadingClicked = function(accordianIndex,panelIndex)
{
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display='none';
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display = $$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex = panelIndex+1;
}
$$$.toAccordian = function(accord)
{
let panels=[];
let expandedIndex = -1;
let children = accord.childNodes;
let x;
for(x=0; x<children.length; x++)
{
if(children[x].nodeName =="H3")
{
panels[panels.length]=children[x];
}
if(children[x].nodeName=="DIV")
{
panels[panels.length]=children[x];
}
}

if(panels.length%2!=0) throw "Heading and division malformed to create accordian";
for(x=0;x<panels.length; x+=2)
{
if(panels[x].nodeName!="H3") throw "Heading and division malformed to create accordian";
if(panels[x+1].nodeName!="DIV") throw "Heading and division malformed to create accordian";
}
function createClickHandler(accordianIndex,panelIndex)
{
return function()
{
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}
let accordianIndex = $$$.model.accordians.length;
for(x=0; x<panels.length; x+=2)
{
panels[x].onclick = createClickHandler(accordianIndex,x);
panels[x].style.cursor = "pointer";
panels[x+1].oldDisplay = panels[x+1].style.display;
panels[x+1].style.display = "none";
}
$$$.model.accordians[accordianIndex]  = {
"panels":panels,
"expandedIndex":-1
};
}
$$$.onDocumentLoaded = function(func)
{
if(typeof func!="function") throw "Expected function,found "+(typeof func)+" in call to on documentLoaded";
$$$.model.onStartup[$$$.model.onStartup.length] = func;
}

$$$.initFramework = function()
{
let allTags = document.getElementsByTagName("*");
let t = null;
let i=0;
let a = null;
for(i=0; i<allTags.length; i++)
{
t = allTags[i];
if(t.hasAttribute("accordian"))
{
a = t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}
let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}
//setting up modal part starts here 
var all = document.getElementsByTagName("*");
for( i=0; i<all.length; i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length] = new Modal(all[i]);
i--;
}
}
}
} 
function MyjrockElement(element)
{
this.element = element;
this.html = function(content)
{
if(typeof this.element.innerHTML=="string")
{
if(typeof content=="string")
{
this.element.innerHTML =content;
}
return this.element.innerHTML;
}
return null;
}// html function ands here
this.value = function(content)
{
if(typeof this.element.value)
{
if((typeof content)=="string")
{
this.element.value = content;
}
return this.element.value;
}
return null; 
}
this.isValid = function(someObj) 
{
var isrequiredNm = someObj.nm.required;
var nmmxLength = someObj.nm.max_length;
var nmErrorSectionId = someObj.nm.error_pane;
var nmErrorType1 = someObj.nm.error.required;
var nmErrorType2 = someObj.nm.error.max_length;
var isrequiredAdd = someObj.ad.required;
var addErrorSectionId = someObj.ad.error_pane;
var addErrorType = someObj.ad.errors.required;
var ctInvalidVal = someObj.ct.invalid.toString();
var ctErrorSectionId = someObj.ct.error_pane;
var ctErrorSectionType = someObj.ct.errors.invalid;
var isrequiredg = someObj.gender.required;
var genderErrorSectionId = someObj.gender.error_pane;
var genderErrorType = someObj.gender.errors.required;
var isrequiredagree = someObj.agree.required_state;
var agreedisplayAlert = someObj.agree.display_alert;
var agreeErrorMessage = someObj.agree.errors.required_state;
var nm = element.nm.value.trim();
var ad = element.ad.value.trim();
var ctval = element.ct.value;
var gender = element.gender.value;
var agreeCheckbox = element.agree;
var nmErrorSection = document.getElementById(nmErrorSectionId);
var addErrorSection = document.getElementById(addErrorSectionId);
var ctErrorSection = document.getElementById(ctErrorSectionId);
var genderErrorSection = document.getElementById(genderErrorSectionId);
if (nmErrorSection) nmErrorSection.innerHTML = "";
if (addErrorSection) addErrorSection.innerHTML = "";
if (ctErrorSection) ctErrorSection.innerHTML = "";
if (genderErrorSection) genderErrorSection.innerHTML = "";
var isvalid = true;
if (nm.length === 0)
{
nmErrorSection.innerHTML = nmErrorType1;
isvalid = false;
}else if(nm.length > nmmxLength) 
{
nmErrorSection.innerHTML = nmErrorType2;
isvalid = false;
}
if (isrequiredAdd && ad.length === 0)
{
addErrorSection.innerHTML = addErrorType;
isvalid = false;
}
if (ctval === ctInvalidVal)
{
ctErrorSection.innerHTML = ctErrorSectionType;
isvalid = false;
}
if (isrequiredg && gender.length === 0)
{
genderErrorSection.innerHTML = genderErrorType;
isvalid = false;
}
if (isrequiredagree && !agreeCheckbox.checked)
{
if(agreedisplayAlert)
{
alert(agreeErrorMessage);
}
isvalid = false;
}
return isvalid;
}
this.fillComboBox = function(jsonObject)
{
if(this.element.nodeName!="SELECT") throw "fillComboBox can be called on SELECT type object only";
var dataSource = jsonObject["dataSource"];
if(!dataSource) throw "data source should be exists";
if(!Array.isArray(dataSource)) throw "data source should be of array type";
if(!jsonObject["text"]) throw "should have text Property";
var text = jsonObject["text"];
if(!(typeof text)==="string") throw "text should be of string type";
let keys = Object.keys(dataSource[0]);
if(!keys.includes(text)) throw "there is no property to set title";
if(!jsonObject["value"]) throw "should have value Property";
var value = jsonObject["value"];
if(!(typeof value==="string")) throw "value propery should be of string type";
if(!keys.includes(value)) throw "there is no property to set value";
if(this.element.hasChildNodes())
{
var options = this.element.querySelectorAll("option");
for(var i=0; i<options.length; i++)
{
this.element.remove(options[i]);
}
}
for(var i=0; i<dataSource.length; i++)
{
var obj =  document.createElement("option");
obj.text = dataSource[i].title;
obj.value = dataSource[i].code;
this.element.appendChild(obj);
}
} 
}
$$$.ajax = function(jsonObject)
{
if(!jsonObject["url"] ) throw "url property is missing in call to ajax";
let url = jsonObject["url"];
if((typeof url)!="string") throw "url property should be of string type in call to ajax";
let methodType;
if(jsonObject["methodType"])
{
methodType = jsonObject["methodType"];
if(typeof methodType!="string") throw "methodType property should be of string type in call to ajax";
methodType = methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
}
let onSuccess = null;
if(jsonObject["success"])
{
onSuccess = jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be a function in call to ajax";
}
let onFailure =null;
if(jsonObject["failure"])
{
onFailure = jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be a function in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.onreadystatechange = function()
{
if(this.readyState==4)
{
if(this.status==200)
{
var responseData = this.responseText;
if(onSuccess) onSuccess(responseData);
}else
{
if(onFailure) onFailure();
}
}
};
if(jsonObject["data"])
{
let jsonData = jsonObject["data"];
let queryString = "";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0) queryString ="?";
if(xx>0) queryString +="&";
xx++;
qsName = encodeURI(k);
qsValue = encodeURI(jsonData[k]);
queryString = queryString+qsName+"="+qsValue;
}
url+=queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
} //get part ends here
if (methodType === "POST") 
{
const xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.onreadystatechange = function () {
if (this.readyState === 4) 
{
if (this.status === 200) 
{
let responseData = this.responseText;
let contentType = this.getResponseHeader("Content-Type");
if(onSuccess) onSuccess(responseData,contentType);
}else 
{
if (onFailure) onFailure();
}
}
};
let jsonData ={};
let sendJSON = jsonObject["sendJSON"];
if(!sendJSON) sendJSON = false;
if((typeof sendJSON)!="boolean") throw "sendJson property should be of boolean type in call to ajax";
let queryString="";
if(jsonObject["data"])
{
jsonData =jsonObject["data"];
let qsName;
let qsValue;
let xx=0;
//we will change to code to traverse the jsonData
for(k in jsonData)
{
if(xx>0) queryString+="&";
xx++;
qsName = encodeURI(k);
qsValue  =encodeURI(jsonData[k]);
queryString = queryString+qsName+"="+qsValue;
}
}
xmlHttpRequest.open("POST", url, true);
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xmlHttpRequest.send(queryString);
}
}
}
window.addEventListener('load',function()
{
$$$.initFramework();
});

