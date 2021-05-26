var selectrow = null

function onFormSubmit() {
    if (validate()) {
        var fetchdata = getdata();
        if (selectrow == null)
            addrow(fetchdata);
        else
            updateRecord(fetchdata);
        resetForm();
    }
}


function getdata() {
    var fetchdata = {};
    fetchdata["ccode"] = document.getElementById("ccode").value;
    fetchdata["cname"] = document.getElementById("cname").value;
    fetchdata["pcode"] = document.getElementById("pcode").value;
    fetchdata["pname"] = document.getElementById("pname").value;
    fetchdata["punit"] = document.getElementById("punit").value;
    fetchdata["quan"] = document.getElementById("quan").value;
    fetchdata["amount"] = document.getElementById("amount").value;
    return fetchdata;
}

function addrow(data) {
    var table = document.getElementById("productList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.pcode;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.pname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.quan;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.punit;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.amount;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a class='fa fa-pencil-square-o edit_btn' onClick="onEdit(this)"></a>
                       <a class='fa fa-trash-o clricn clricn' onClick="onDelete(this)"></a>`;

    var cid = document.getElementById("ccode").value; // console.log(cid);
    var custname = document.getElementById("cname").value;  // console.log(custname);

    // var table = document.getElementById('protbody').rows(0).length;
    // document.getElementById("rowscount").innerHTML = table;
    
    document.getElementById("cccode").innerHTML = cid ;
    document.getElementById("ccname").innerHTML = custname;

    // document.getElementById('cname').value='';
    document.getElementById("pcode").value = '';
    document.getElementById("pname").value = '';
    document.getElementById("quan").value = '';
    document.getElementById("punit").value = '';
    document.getElementById("amount").value = '';
    totamut();
       
}

function resetForm() {
    document.getElementById("pcode").value = "";
    document.getElementById("pname").value = "";
    document.getElementById("quan").value = "";
    document.getElementById("punit").value = "";
    document.getElementById("amount").value = "";
    selectrow = null;
}

function onEdit(td) {
    selectrow = td.parentElement.parentElement;
    document.getElementById("pcode").value = selectrow.cells[0].innerHTML;
    document.getElementById("pname").value = selectrow.cells[1].innerHTML;
    document.getElementById("quan").value = selectrow.cells[2].innerHTML;
    document.getElementById("punit").value = selectrow.cells[3].innerHTML;
    document.getElementById("amount").value = selectrow.cells[4].innerHTML;
}

function updateRecord(fetchdata) {
    selectrow.cells[0].innerHTML = fetchdata.pcode;
    selectrow.cells[1].innerHTML = fetchdata.pname;
    selectrow.cells[2].innerHTML = fetchdata.quan;
    selectrow.cells[3].innerHTML = fetchdata.punit;
    selectrow.cells[4].innerHTML = fetchdata.amount;
    totamut();    
}

function onDelete(td) {
    
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("productList").deleteRow(row.rowIndex);
        resetForm();  
        totamut();  
        
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("pname").value == "") {
        isValid = false;
        document.getElementById("pnameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("pnameValidationError").classList.contains("hide"))
            document.getElementById("pnameValidationError").classList.add("hide");
    }
    return isValid;
}

function pointfun(evt)
{
   var char1 = (evt.char2) ? evt.char2 : evt.keyCode;
   if (char1 != 46 && char1 > 31 
     && (char1 < 48 || char1 > 57))
      return false;

   return true;
}

// -------------   Amount Calculation  --------------------------

function mulqun(){
    var qun = document.getElementById("quan").value; //    console.log(qun);
    var unitprc = document.getElementById("punit").value; //    console.log(unitprc);
    var total = qun * unitprc; 
    var n = total.toFixed(2);  //    console.log(total);
     document.getElementById("amount").value=n;

}

function totamut(){
    var table = document.getElementById("productList"), sumVal = 0;
            
    for(var i = 1; i < table.rows.length; i++)
    {
        sumVal = sumVal + parseInt(table.rows[i].cells[4].innerHTML);
    }
    
    document.getElementById("val").innerHTML = sumVal; // console.log(sumVal);

    const gstAmount = document.getElementById('gst-amount').innerHTML = (sumVal / 100 * 12).toFixed(2); // console.log(gstAmount);

    const totamt = document.getElementById('total-amount').innerHTML = parseInt(sumVal) + parseInt(gstAmount); // console.log(totamt);
}

function numvalidate(evt)
{
    var numcode1 = (evt.which) ? evt.which : evt.numcode1
    if ((numcode1 < 65 || numcode1 > 90) && (numcode1 < 97 || numcode1 > 123) && numcode1 != 32)
                
    return false;
    return true;
}



function printval() {

    var tbl = document.getElementById("protbody").rows.length;
     if (tbl == ""){
         alert("Empty Row");
         return false;
     }

     var divToPrint=document.getElementById("totlist");
    newWin= window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
    
    document.getElementById('cccode').innerHTML='';
    document.getElementById('ccname').innerHTML='';
    document.getElementById('cname').value='';
    document.getElementById('val').innerHTML='';
    // document.getElementById('rowscount').innerHTML='';
    document.getElementById('gst-amount').innerHTML='';
    document.getElementById('total-amount').innerHTML='';
    document.getElementById('protbody').innerHTML='';

    var value = parseInt(document.getElementById('ccode').value, 10); 
    value = isNaN(value) ? 1 : value;
    value++;
    document.getElementById('ccode').value = value;

}