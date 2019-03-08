// JavaScript Document
loadCustomerList();
loadCustomerDetails('Jacob');

function loadCustomerList() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var customersObj = JSON.parse(this.responseText);

            var headerHTMLMarkup = '<div class="container" ><table class="table" id="customersTable" ><thead class="thead-dark"><tr><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Address</th><th scope="col">Phone </th><th scope="col">&nbsp;</th></tr></thead><tbody>';
            var footerHTMLMarkup = '</tbody></table></div>';

            var HTMLMarkup = '';

            HTMLMarkup += headerHTMLMarkup;

            var i;
            //  var j;
            for (i in customersObj.customers) {
                var firstName = customersObj.customers[i].firstName;
                var lastName = customersObj.customers[i].lastName;
                var address = customersObj.customers[i].address;
                var phoneNo = customersObj.customers[i].phoneNo;


                var trHTMLMark = '<tr><td>' + firstName + '</td><td>' + lastName + '</td><td>' + address + '</td><td>' + phoneNo + '</td><td><a href="dashboard.html?name=' + firstName + '" class="btn btn-info btn-sm">View </a></td></tr>';

                HTMLMarkup += trHTMLMark;

                // for (j in customersObj.customers[i].accounts) {
                //  HTMLMarkup += customersObj.customers[i].accounts[j].accountsNo + "<br>";
                // }
            }
            HTMLMarkup += footerHTMLMarkup;
            document.getElementById("customerList").innerHTML = HTMLMarkup;
        }

    };

    xmlhttp.open("GET", "customers4.json", true);
    xmlhttp.send(); // JavaScript Document


    $("#txtSearchCustomer").on("keyup", function () {
        //alert('00');
        searchCustomer();
    });
    $("#btnSearchCustomer").on('click', function (e) {
        e.preventDefault();
        searchCustomer();
    });

    function searchCustomer() {

        //alert('00');
        var value = $("#txtSearchCustomer").val().toLowerCase();
        $("#customersTable tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    }
}

function loadCustomerDetails(name) {
    if (name != null) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var customerObj = JSON.parse(this.responseText);
                var i;
                for (i in customerObj.customers) {
                    var firstName = customerObj.customers[i].firstName;


                    if (firstName.toLowerCase() == name.toLowerCase()) {
                        var lastName = customerObj.customers[i].lastName;
                        var address = customerObj.customers[i].address;
                        var phoneNo = customerObj.customers[i].phoneNo;
                        var accountObj = customerObj.customers[i].accounts;
                        $("#customerFullName").text(firstName+" "+lastName);
                        $("#customerAddress").text(address);
                        $("#customerPhoneNo").text(phoneNo);

                        var j;
                        var accountHTMLMarkup = '';
                        var accountHeaderHTMLMarkup='<table cellpadding="0" width="100%" class="table" ><tr class="thead-dark"><th > Account Number</th><th> Account Type</th><th class="text-right"> Created Date </th><th class="text-right">status</th><th class="text-right"> Balance</th><th class="text-right">&nbsp;</th></tr><tbody>';
                        var accountFooterHTMLMarkup='</tbody></table>';
                        accountHTMLMarkup+=accountHeaderHTMLMarkup;
                        for (j in accountObj) {
                            var accountsNo = accountObj[j].accountsNo;
                            var accountsName = accountObj[j].accountsName;
                            var createDate = accountObj[j].createDate;
                            var balance = accountObj[j].balance;
                            
                            accountHTMLMarkup += '<tr><td class="text-left">' +accountsNo+'</td><td class="text-left "><a href="#">' +accountsName+'</a></td><td class="text-right">' +createDate+'</td><td class="text-right"><select name="selectStatus" class="form-control" id="selectStatus"><option selected="selected">Open</option><option>Closed</option><option>On Hold</option>	              </select></td><td class="text-right">' +balance+' </td><td class="text-right"><button type="button" class="btn btn-info btn-md"  data-toggle="collapse" data-target="#customer'+j+'" aria-expanded="true" aria-controls="customer'+j+'">View </button></td></tr>'                           
                            var transactionObj=accountObj[j].transaction;
                            var transactionHTMLMarkup='';
                            var l;
                            var transactionHeaderHTMLMarkup='<tr><td colspan="6" class="td-close"><div id="customer'+j+'" class="collapse" aria-labelledby="heading'+j+'" data-parent="#accordionAccountDetails">	              <table id="statementTable" width="100%" cellspacing="0px" cellpadding="0px">	                <tbody><tr><th>Date</th><th>Description</th><th>Amount</th></tr>';
                            var transactionFooterHTMLMarkup=' </tbody></table></div></td></tr>';
                            transactionHTMLMarkup+=transactionHeaderHTMLMarkup;
                            for(l in transactionObj){
                                var transactionDate=transactionObj[l].transactionDate;
                                var transactionDescription=transactionObj[l].transactionDescription;
                                var transactionAmount=transactionObj[l].transactionAmount;
                                transactionHTMLMarkup+='<tr><td>'+transactionDate+'</td><td>'+transactionDescription+'</td>	                    <td>'+transactionAmount+'</td></tr>';
                            }
                            transactionHTMLMarkup+=transactionFooterHTMLMarkup;
                            accountHTMLMarkup+=transactionHTMLMarkup;
                        }
                        accountHTMLMarkup+=accountFooterHTMLMarkup;
                       // alert(accountHTMLMarkup);
                    }
                }
             //   document.getElementById("dvCustomerInfo").innerHTML = customerInfoHTMLMarkup;
                document.getElementById("accordionAccountDetails").innerHTML = accountHTMLMarkup;
            }

        };
        xmlhttp.open("GET", "customers4.json", true);
        xmlhttp.send(); // JavaScript Document
    }

}
