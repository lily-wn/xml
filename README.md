#/
 5 function loadXMLDoc(dname) {
 6   let xhttp
 7   if (window.XMLHttpRequest) {
 8     xhttp = new XMLHttpRequest();
 9   } else {
10     xhttp = new ActiveXObject("Microsoft.XMLHTTP");
11   }
12   xhttp.open("GET", dname, false);
13   xhttp.send();
14   return xhttp.responseXML;
15 }
16 
17 /**
18  * xml字符串转换xml对象数据
19  * @param {Object} xmlStr
20  */
21 function xmlStr2XmlObj(xmlStr) {
22   var xmlObj = {};
23   if (document.all) {
24     var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
25     xmlDom.loadXML(xmlStr);
26     xmlObj = xmlDom;
27   } else {
28     xmlObj = new DOMParser().parseFromString(xmlStr, "text/xml");
29   }
30   return xmlObj;
31 }
32 
33 /**
34  * xml直接转换json数据
35  * @param {Object} xml
36  */
37 function xmlObj2json(xml) {
38   try {
39     var obj = {};
40     if (xml.children.length > 0) {
41       for (var i = 0; i < xml.children.length; i++) {
42         var item = xml.children.item(i);
43         var nodeName = item.nodeName;
44         if (typeof(obj[nodeName]) == "undefined") {
45           obj[nodeName] = xmlObj2json(item);
46         } else {
47           if (typeof(obj[nodeName].push) == "undefined") {
48             var old = obj[nodeName];
49             obj[nodeName] = [];
50             obj[nodeName].push(old);
51           }
52           obj[nodeName].push(xmlObj2json(item));
53         }
54       }
55     } else {
56       obj = xml.textContent;
57     }
58     return obj;
59   } catch (e) {
60     console.log(e.message);
61   }
62 }
63 
64 /**
65  * xml字符串转换json数据
66  * @param {Object} xml
67  */
68 function xmlStr2json(xml) {
69   var xmlObj = xmlStr2XmlObj(xml);
70   var jsonObj = {};
71   if (xmlObj.childNodes.length > 0) {
72     jsonObj = xmlObj2json(xmlObj);
73   }
74   return jsonObj;
75 }
76 
77 export default {
78   loadXMLDoc,
79   xmlStr2XmlObj,  
80   xmlObj2json,
81   xmlStr2json
82 }
