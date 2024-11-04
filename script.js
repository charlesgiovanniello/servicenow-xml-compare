const form = document.getElementById('form');
const baseXML = document.getElementById("baseXML");
const customXML = document.getElementById("customXML");
var xpathValue;

//HTML fields to write back to
const uniqueToBaseText = document.getElementById("uniqueToBase");
const uniqueToCustomText = document.getElementById("uniqueToCustom");
const similarText = document.getElementById("similar");

//RETURNS ARRAY OF ALL FIELDS WITH "\\element" XPATH
function parseXML(string){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(string, "text/xml");
    var arr = [];
    var elements = xmlDoc.getElementsByTagName(xpathValue);
    for(i=0;i<elements.length;i++){
        try {
            arr.push(elements[i].childNodes[0].nodeValue);
          } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
          }
    }
    arr.sort();
    return arr;
}


function uniqueToBase(arr1,arr2){
    return arr1.filter(n=>!arr2.includes(n))
}

function uniqueToCustom(arr1,arr2){
    return arr2.filter(n=>!arr1.includes(n));  
}

function matching(arr1,arr2){
    return arr1.filter(n=>arr2.includes(n));  
}

function formatString(arr){
    var returnString = "";
    arr.forEach(element => {
        returnString += (element + "<br>");
    });
    return returnString;
}

function logSubmit(event) {
    xpathValue = document.getElementById("xpath").value;
    console.log(xpathValue.value)
    baseFields = parseXML(baseXML.value);
    customFields = parseXML(customXML.value);

    uniqueToBaseText.innerHTML = "<strong>Fields unique to Base System: </strong><br>"+formatString(uniqueToBase(baseFields,customFields));
    uniqueToCustomText.innerHTML = "<strong>Fields unique to Customize Version: </strong><br>"+formatString(uniqueToCustom(baseFields,customFields));
    similarText.innerHTML = "<strong>Fields that match between Base and Customized: </strong><br>" + formatString(matching(baseFields,customFields));
    event.preventDefault();
}

function reset(event){
    uniqueToBaseText.innerHTML = ""
    uniqueToCustomText.innerHTML = ""
    similarText.innerHTML = ""
    form.reset()
    
    event.preventDefault();
}


form.addEventListener('submit', logSubmit);
//form.addEventListener('click',reset)

//Example Record: https://northwelltest.service-now.com/merge_form_upgrade.do?sysparm_upgrade_history_log_id=9a266094dbb2011084a5d9d96896196c&sysparm_referring_url=