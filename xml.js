
 
 function loadXMLDoc(dname) {
     
     let xhttp
     7
     if (window.XMLHttpRequest) {
         xhttp = new XMLHttpRequest();
         
     } else {
          xhttp = new ActiveXObject("Microsoft.XMLHTTP");
         
     }
      xhttp.open("GET", dname, false);
      xhttp.send();
     
     return xhttp.responseXML;
     
 }
 
 
 /**
18  * xml字符串转换xml对象数据
19  * @param {Object} xmlStr
20  */
 21
 function xmlStr2XmlObj(xmlStr) {
     
     var xmlObj = {};
     
     if (document.all) {
         
         var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
          xmlDom.loadXML(xmlStr);
          xmlObj = xmlDom;
         
     } else {
          xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
         
     }
     
     return xmlObj;
     
 }
 
 
 /**
34  * xml直接转换json数据
35  * @param {Object} xml
36  */
 
 function xmlObj2json(xml) {
     
     try {
         
         var obj = {};
         
         if (xml.children.length > 0) {
             
             for (var i = 0; i < xml.children.length; i++) {
                 
                 var item = xml.children.item(i);
                 
                 var nodeName = item.nodeName;
                 
                 if (typeof (obj[nodeName]) == "undefined") {
                      obj[nodeName] = xmlObj2json(item);
                     
                 } else {
                     
                     if (typeof (obj[nodeName].push) == "undefined") {
                         
                         var old = obj[nodeName];
                          obj[nodeName] = [];
                          obj[nodeName].push(old);
                         
                     }
                      obj[nodeName].push(xmlObj2json(item));
                     
                 }
                 
             }
             
         } else {
              obj = xml.textContent;
             
         }
         
         return obj;
         
     } catch (e) {
          console.log(e.message);
         
     }
    
 }
 
 
 /**
65  * xml字符串转换json数据
66  * @param {Object} xml
67  */
 
 function xmlStr2json(xml) {
     
     var xmlObj = xmlStr2XmlObj(xml);
     
     var jsonObj = {};
     
     if (xmlObj.childNodes.length > 0) {
          jsonObj = xmlObj2json(xmlObj);
         
     }
     
     return jsonObj;
     
 }
 function xmlListToArr(xmlList) {
      let targetArr = []
       if (xmlList.constructor == Array) {
         targetArr = xmlList
    } else {
       targetArr[0] = xmlList
      }
     return targetArr
   }
 
 
 export default {
      loadXMLDoc,
      xmlStr2XmlObj,
      xmlObj2json,
      xmlStr2json,
      xmlListToArr
 }