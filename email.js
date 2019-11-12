var emailList = [];
class EmailId {
  constructor(name) {
    this.name = name;
    this.enabled = "checked";
  }
}
var enable = x => {
  for (let i = 0; i < emailList.length; i++) {
    if (emailList[i].name == x) {
      if (emailList[i].enabled == "checked") emailList[i].enabled = "";
      else {
        emailList[i].enabled = "checked";
      }
    }
  }
};
var tableHeader = `<th>isEnabled</th>
<th>Email</th>
<th>Delete</th>`;

var deleted = x => {
  for (let i = 0; i < emailList.length; i++) {
    if (emailList[i].name == x) {
      emailList.splice(i, 1);
      break;
    }
  }
  display(emailList, "list");
};
var showEnabled = () => {
  if (document.getElementById("enable").checked) {
    var enableList = emailList.filter(email => {
      return email.enabled == "checked";
    });

    display(enableList, "list");
  } else {
    display(emailList, "list");
  }
};
var display = (displayList, show) => {
  var list = displayList.map(email => {
    return `<tr><td style="display:"block"><input type="checkbox" id="${email.name}" ${email.enabled} onClick="enable(id)"/></td>
                                         <td>${email.name}</td>
                                         <td><button name="${email.name}" onClick="deleted(name)">Delete</button></td></tr>`;
  });
  document.getElementById(show).innerHTML = tableHeader;
  for (let i = 0; i < list.length; i++)
    document.getElementById(show).innerHTML += list[i];
};
var existing = email => {
  for (let i = 0; i < emailList.length; i++) {
    if (emailList[i].name == email) {
      return true;
    }
  }
};
var addToList = () => {
  var email = document.getElementById("email").value;
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let valid = reg.test(email);
  let exist = existing(email);

  if (valid && !exist) {
    var emailid = new EmailId(email);
    document.getElementById("error").setAttribute("style", "display : none;");
    emailList.push(emailid);

    display(emailList, "list");
  } else {
    document.getElementById("error").setAttribute("style", "display : block;");
  }
};

var searchInList = () => {
  var searchText = document.getElementById("email").value;
  var searchList = emailList.filter(
    email => email.name.indexOf(searchText) !== -1
  );
  display(searchList, "list");
};
