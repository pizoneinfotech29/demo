const uniqueEmails = [];
  const uniquePhoneNumbers = [];

  function showPopup() {
    document.getElementById("userPopup").style.display = "block";
  }

  function hidePopup() {
    document.getElementById("userPopup").style.display = "none";
    resetForm();
  }

  function resetForm() {
    document.getElementById("fname").value = "";
    document.getElementById("mname").value = "";
    document.getElementById("lname").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("mno").value = "";
    document.getElementById("email").value = "";
    document.getElementById("category").value = "";
    document.getElementById("subcategory").value = "";
    document.getElementById("submitButton").innerHTML = "Add User";
    document.getElementById("submitButton").onclick = function (event) {
      addUser(event);
    };
  }

  function showSubcategory() {
    const category = document.getElementById("category").value;
    const subcategoryContainer = document.getElementById("subcategoryContainer");

    if (category === "student" || category === "job") {
      subcategoryContainer.style.display = "block";
      const subcategorySelect = document.getElementById("subcategory");
      subcategorySelect.innerHTML = "";

      if (category === "student") {
        subcategorySelect.innerHTML =
          '<option value="10th">10th</option><option value="12th">12th</option><option value="graduation">Graduation</option><option value="postgraduation">Post Graduation</option>';
      } else if (category === "job") {
        subcategorySelect.innerHTML =
          '<option value="it">IT</option><option value="govt">Government</option><option value="others">Others</option>';
      }
    } else {
      subcategoryContainer.style.display = "none";
    }
  }

  function addUser(event) {
    event.preventDefault();

    const fname = document.getElementById("fname").value;
    const mname = document.getElementById("mname").value;
    const lname = document.getElementById("lname").value;
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '';
    const mno = document.getElementById("mno").value;
    const email = document.getElementById("email").value;
    const category = document.getElementById("category").value;
    const subcategory = document.getElementById("subcategory").value;

    if (uniqueEmails.includes(email)) {
      alert("Email id is already exists. Please provide a unique email-id.");
      return;
    }

    if (uniquePhoneNumbers.includes(mno)) {
      alert("Phone number is already exists. Please provide a unique Phone-number.");
      return;
    }

    const table = document.getElementById("userTable").getElementsByTagName("tbody")[0];
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
    data8.innerHTML = subcategory || "";

    const cellEdit = newRow.insertCell(-1);
    cellEdit.innerHTML = '<button onclick="editRow(this)">Edit</button>';

    const cellDelete = newRow.insertCell(-1);
    cellDelete.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

    uniqueEmails.push(email);
    uniquePhoneNumbers.push(mno);

    hidePopup();
    
  }

  function editRow(button) {
    const row = button.parentNode.parentNode;

    const fname = row.cells[0].innerHTML;
    const mname = row.cells[1].innerHTML;
    const lname = row.cells[2].innerHTML;
    const gender = row.cells[3].innerHTML;
    const mno = row.cells[4].innerHTML;
    const email = row.cells[5].innerHTML;
    const category = row.cells[6].innerHTML;
    const subcategory = row.cells[7].innerHTML;

    document.getElementById("fname").value = fname;
    document.getElementById("mname").value = mname;
    document.getElementById("lname").value = lname;
    //document.querySelector('input[name="gender"][value="' + gender + '"]').checked = true;
    document.getElementById("mno").value = mno;
    document.getElementById("email").value = email;
    document.getElementById("category").value = category;
    showSubcategory();

    if (subcategory) {
      document.getElementById("subcategory").value = subcategory;
    }

    const submitButton = document.getElementById("submitButton");
    submitButton.innerHTML = "Update User";
    submitButton.onclick = function (event) {
      updateRow(event, row);
    };

    showPopup();
  }

 function updateRow(event, row) {
  event.preventDefault();

  const fname = document.getElementById("fname").value;
  const mname = document.getElementById("mname").value;
  const lname = document.getElementById("lname").value;
  //const gender = document.querySelector('input[name="gender"]:checked').value;
  const mno = document.getElementById("mno").value;
  const email = document.getElementById("email").value;
  const category = document.getElementById("category").value;
  const subcategory = document.getElementById("subcategory").value;

  if (uniquePhoneNumbers.includes(mno) && mno !== row.cells[4].innerHTML) {
    alert("Phone number is already exists. Please provide a unique Phone-number.");
    return;
  }

  if (uniqueEmails.includes(email) && email !== row.cells[5].innerHTML) {
    alert("Email id is already exists. Please provide a unique email-id.");
    return;
  }

  // Remove the old email and phone number before updating
  const oldEmail = row.cells[5].innerHTML;
  const oldMno = row.cells[4].innerHTML;
  const oldEmailIndex = uniqueEmails.indexOf(oldEmail);
  const oldMnoIndex = uniquePhoneNumbers.indexOf(oldMno);

  if (oldEmailIndex !== -1) {
    uniqueEmails.splice(oldEmailIndex, 1);
  }

  if (oldMnoIndex !== -1) {
    uniquePhoneNumbers.splice(oldMnoIndex, 1);
  }

  // Add the new email and phone number
  uniqueEmails.push(email);
  uniquePhoneNumbers.push(mno);

  // Update the row data
  row.cells[0].innerHTML = fname;
  row.cells[1].innerHTML = mname;
  row.cells[2].innerHTML = lname;
 // row.cells[3].innerHTML = gender;
  row.cells[4].innerHTML = mno;
  row.cells[5].innerHTML = email;
  row.cells[6].innerHTML = category;
  row.cells[7].innerHTML = subcategory || "";

  const submitButton = document.getElementById("submitButton");
  submitButton.innerHTML = "Add User";
  submitButton.onclick = function (event) {
    addUser(event);
  };

  hidePopup();
}

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

  function validateForm(fname, lname, gender, mno, email, category) {
    if (!fname || !lname || !gender || !mno || !email || !category) {
      alert("All fields are required");
      return false;
    }

    return true;
  }
