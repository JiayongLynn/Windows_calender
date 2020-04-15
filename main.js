var transformAttr = [
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "skewX",
    "skewY"
];
var normalAttr = [
    "width",
    "height",
    "left",
    "top",
    "right",
    "bottom",
    "marginBottom",
    "marginleft",
    "marginRight",
    "marginTop",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom"
];
function css(el,attr,val){
    if(typeof attr == "object"){
        for(var s in attr){
            css(el,s,attr[s]);
        }
        return ;
    }
    if(transformAttr.indexOf(attr) >= 0){
        return setTransform(el,attr,val);
    }
    if(val === undefined){
        val = getComputedStyle(el)[attr]; 
        return normalAttr.indexOf(attr)>=0||!isNaN(val)?parseFloat(val):val;
    } else {
        if(attr == "opacity"){
            el.style[attr] = val;
            el.style.filter = "alpha(opacity="+(val*100)+")";
        } else if(normalAttr.indexOf(attr)>=0) {
            el.style[attr] = val + "px";
        } else if(attr == "zIndex") {
            el.style[attr] = Math.round(val);
        } else {
            el.style[attr] = val;
        }
    }
}
function setTransform(el,attr,val){
    el.transform = el.transform||{};
    if(val === undefined){
        return  el.transform[attr];
    }
    el.transform[attr] = val;
    var transformVal = "";
    for(var s in  el.transform){
        switch(s){
            case "rotate":
            case "rotateX":
            case "rotateY":
            case "rotateZ":
            case "skewX":
            case "skewY":
                transformVal += s+'('+ el.transform[s]+'deg) ';
                break;
            case "translateX":
            case "translateY":
            case "translateZ":
                transformVal += s+'('+ el.transform[s]+'px) ';
                break;
            case "scale":
            case "scaleX":
            case "scaleY":
                transformVal += s+'('+ el.transform[s]+') ';
                break;       
        }
    }
    el.style.WebkitTransform = el.style.transform = transformVal.trim();
}