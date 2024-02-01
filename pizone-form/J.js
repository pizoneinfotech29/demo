  const uniqueEmails = [];
  const uniquePhoneNumbers = [];

  //jab hm add button pe click krnge tb popup show hoga form ka
  function showPopup() {
    document.getElementById("userPopup").style.display = "block";
  }

  //yeh automatic hai mtlb jab koi add user pe click krega tb user add hone ke baad kudh se bnd ho jyaiga
  function hidePopup() {
    document.getElementById('userPopup').style.display = 'none';
  }
  //yeh category option hai
  function showSubcategory() {
    const category = document.getElementById('category').value;
    const subcategoryContainer = document.getElementById('subcategoryContainer');

    if (category === 'student') {
      subcategoryContainer.style.display = 'block';
      const subcategorySelect = document.getElementById('subcategory');
      subcategorySelect.innerHTML = '<option value="10th">10th</option><option value="12th">12th</option><option value="graduation">Graduation</option><option value="postgraduation">Post Graduation</option>';
    } 
    else if (category === 'job') {
      subcategoryContainer.style.display = 'block';
      const subcategorySelect = document.getElementById('subcategory');
      subcategorySelect.innerHTML = '<option value="it">IT</option><option value="govt">Government</option><option value="others">Others</option>';
    } 
    else {
      subcategoryContainer.style.display = 'none';
    }
  }
  //user add krne ka function
  function addUser(event) {
    event.preventDefault();

    const fname = document.getElementById('fname').value;
    const mname = document.getElementById('mname').value;
    const lname = document.getElementById('lname').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const mno = document.getElementById('mno').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const subcategory = document.getElementById('subcategory').value;

    // check kro ke email id phle se exits krta hai ya nhi
    if (uniqueEmails.includes(email)) {
      alert('Email id is already exists. Please provide unique email-id.');
      return;
    }

    // check kro ke phone number phle se exits krta hai ya nhi
    if (uniquePhoneNumbers.includes(mno)) {
      alert('Phone number is already exists. Please provide unique Phone-number.');
      return;
    }

//dynamic user data
    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);

    const data1 = newRow.insertCell(0);
    data1.innerHTML = fname;

    const data2 = newRow.insertCell(1);
    data2.innerHTML = mname;

    const data3 = newRow.insertCell(2);
    data3.innerHTML = lname;

    const data4 = newRow.insertCell(3);
    data4.innerHTML = gender;

    const data5 = newRow.insertCell(4);
    data5.innerHTML = mno;

    const data6 = newRow.insertCell(5);
    data6.innerHTML = email;

    const data7 = newRow.insertCell(6);
    data7.innerHTML = category;

    const data8 = newRow.insertCell(7);
    data8.innerHTML = subcategory || '';

    const cellAction = newRow.insertCell(-1);
    cellAction.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

    // Update unique email and phone number lists
    uniqueEmails.push(email);
    uniquePhoneNumbers.push(mno);

    hidePopup();
    console.log(addUser);
    event.preventDefault();
  }
  //row ko delete krne ke liye use kr rhe h yeh function
  function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const emailToDelete = row.cells[5].innerHTML; 
    const mnoToDelete = row.cells[4].innerHTML;

    const emailIndex = uniqueEmails.indexOf(emailToDelete);
    if (emailIndex !== -1) {
        uniqueEmails.splice(emailIndex, 1);
    }

    const mnoIndex = uniquePhoneNumbers.indexOf(mnoToDelete);
    if (mnoIndex !== -1) {
        uniquePhoneNumbers.splice(mnoIndex, 1);
    }

    row.parentNode.removeChild(row);
    
}


