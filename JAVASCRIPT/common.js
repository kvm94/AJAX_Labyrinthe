function $(elem) {
    var type=typeof(elem);
    if (type=="string") {
        return document.getElementById(elem);
    }
    return elem;
}

function getXHR() {
    var xhr = null;
    try {
	xhr=new XMLHttpRequest();
    } catch (e) {
	try {
	    xhr=new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e) {
	    try {
		xhr= new ActiveXObject('Microsoft.XMLHTTP');
	    } catch (e) {
		xhr = null;
	    }
	}
    }
    return xhr;
}

function hide(elem) {
    var el=$(elem);
    el.style.display='none';
    return el;
}

function show(elem) {
    var el=$(elem);
    el.style.display='block';
    return el;
}

function toggle(elem) {
    var el=$(elem);
    if (el.style.display == 'block') {
	el.style.display='none';
    } else {
	el.style.display='block';
    }
}

function clearselect(tag) {
    var el=$(tag);
    while (el.length > 0) {
	el.remove(0);
    }
}

function appendselect(tag,text,value) {
    var el=$(tag);
    var opt=document.createElement('option');
    opt.text=text;
    opt.value=value;
    try {
	el.add(opt,null);
    } catch (e) {
	el.add(opt); /* IE Bug */
    }
}

function selectgetval(tag) {
    var el=$(tag);
    var idx=el.selectedIndex;
    if (el.options[idx]) {
	return el.options[idx].value;
    } else {
	return "";
    }
}

function selectgetname(tag) {
    var el=$(tag);
    var idx=el.selectedIndex;
    if (el.options[idx]) {
	return el.options[idx].text;
    } else {
	return "";
    }
}

/* Function to add an event at runtime */
function addevent(obj,event,fn) {
    if (obj.addEventListener) {
	obj.addEventListener(event,fn,false);
    } else {
	obj.attachEvent("on"+event,fn);
    }
}
