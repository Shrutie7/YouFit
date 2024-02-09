

// regex function only alphabets without spaces
function customfun(data){
  return {data:data.replace(/[^\w\d&/\(\)\_\-]+/g, ""),errCode:"wrng025"};
}
function Alphabets(data) {
  return {data:data.replace(/[^A-Za-z]+/g, ""),errCode:"wrng003"};
}

// regex function only alphabets with spaces
function Alphabetswithspace(data) {
  return {data:data.replace(/[^A-Z a-z]+/g, ""),errCode:"wrng003"};
}

// regex function only alphabets and numbers with spaces
function AplhaNumericwithspace(data) {
  return {data:data.replace(/[^A-Z a-z 0-9]+/g, ""),errCode:"wrng006"};
}

// regex function only alphabets and numbers without spaces
function AplhaNumeric(data) {
  return {data:data.replace(/[^A-Za-z0-9]+/g, ""),errCode:"wrng006"};
}

// regex function  numbers without spaces
function Numbers(data) {
  console.log(data)
  return {data:data.replace(/[^0-9]+/g, ""),errCode:"wrng004"};
}

// regex function for password
function Password(data) {
  return {data:data.replace(/[^0-9a-zA-Z!@#$%^&*_+\-=;':"\\|,./?\b]+/g, ""),errCode:"wrng005"};
}

// regex function for email
function Email(data) {
  let beforeind = data.indexOf("@");
  let dot = data.lastIndexOf(".");
  let beforstr = "";
  let beforedot = "";
  let afterdot = "";
  if (beforeind > 0) {
    beforstr = data.slice(0, beforeind); //0 to @
  }
  if (beforeind > 0 && dot > 0) {
    beforedot = data.slice(beforeind + 1, dot); //@to .
    beforedot = beforedot.toLowerCase();
  }
  if (dot > 0) {
    afterdot = data.slice(dot + 1, data.length); //.toend
    afterdot = afterdot.substring(0, 3);
  }

  if (dot >= 0 && beforeind >= 0) {
    let data1 = beforstr.replace(/[^a-zA-Z0-9]+/g, "");
    let data2 = beforedot.replace(/[^a-z]+/g, "");
    let data3 = afterdot.replace(/[^a-z]+/g, "");
    return {data:`${data1}@${data2}.${data3}`,errCode:"wrng003"};
  } else if (beforeind >= 0) {
    let data5 = beforstr.replace(/[^a-zA-Z0-9]+/g, "");
    let data6 = data.slice(beforeind + 1, data.length).replace(/[^a-z.]+/g, "");
    data6 = data6.toLowerCase();
    return {data:`${data5}@${data6}`,errCode:"wrng003"};
  } else {
    return {data:data.replace(/[^a-zA-Z0-9.@]+/g, ""),errCode:"wrng005"};
  }
}
// // regex function for characters along with , . ( )
function Characters(data) {
  return {data:data.replace(/[^. , ) (]+/g, ""),errCode:"wrng005"};
}
// regex function for all characters without any spaces
function Nospace(data) {
  return {data:data.replace(/[^a-zA-Z0-9!@#$%^&*_+\-=;':"\\|,./?]+/g, ""),errCode:"wrng005"};
}

//regex function for all characters with spaces (no regex)
function Noregex(data) {
  return {data:data,errCode:"wrng005"};
}
//=================>>> Main Function need to Called <<==============
function regexData(data, regexType) {
  var json={data:"",errCode:""}
  console.log(regexType)
  switch (regexType) {
    case "Noregex":
      json={...Noregex(data)}
      break;
    case "Alphabets":
      json={...Alphabets(data)}
      break;
    case "Alphabetswithspace":
      json={...Alphabetswithspace(data)}
      break;
    case "AplhaNumericwithspace":
      json={...AplhaNumericwithspace(data)}
      break;
    case "AplhaNumeric":
      json={...AplhaNumeric(data)}
      break;
    case "Numbers":
      json={...Numbers(data)}
      break;
    case "Email":
      json={...Email(data)}
      break;
    case "Password":
      json={...Password(data)}
      break;
    case "Characters":
      json={...Characters(data)}
      break;
    case "Nospace":
      json={...Nospace(data)}
      break;
      case "custom":
        json={...customfun(data)}
        break;
      
    default:
      json={...Alphabets(data)}
      break;
  }
  if (json.data.length === data.length) return {updateState:true,"errCode":""};
  else return {updateState:false,"errCode":json.errCode};
}

export default regexData;
