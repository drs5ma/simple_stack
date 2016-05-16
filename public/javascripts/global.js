
//Userlist data array for filling in info box

//var userListData = [];
//$(document).ready(function() {



    // Populate the user table on initial page load
    //populateTable();


      // Username link click
    //$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);


    // Add User button click
    //$('#btnAddUser').on('click', addUser);



    // Delete User link click
    //$('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);



//});

// Functions =============================================================
var userListData = [];
var daha = "greetings from the make file";


function writetodb(){
var i;
for(i=0;i<newlistdata.length;i+=1){

$.ajax({
            type: 'POST',
            data: userListData[i],
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {


            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }

});


}

}



// Fill table with data
function movefunc(ev, x, y){
        
if(  (!isNaN(x)) &&  (!isNaN(y))   ){

        
        newuser = {
	      timestamp: Date.now(),
              cx: x,
              cy: y,
              r: 24,
              fill: 'coral',
              stroke: 'coral',
              strokeOpacity: .3,
              strokeWidth: 10
            };
            var circle = paper.circle(newuser.cx,newuser.cy,newuser.r);

            // circle.mouseup(function(){

            //     console.log(this.attr("timestamp"));



            // });

            circle.attr(newuser);

            $.ajax({
            type: 'POST',
            data: newuser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {


            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }

});


        


    }
}
function populateTable() {

    // Empty content string
    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {
           // Stick our user data array into a userlist variable in the global object
        userListData = data;
      

	var i;
    for(i=0;i<userListData.length;i+=1){

            var dbentry = userListData[i];

	//console.log(dbentry);
        //delete dbentry["_id"];
	//console.log(dbentry);


        // Circle with 80px radius
            var circle = paper.circle(dbentry.cx,dbentry.cy,dbentry.r);
            
	    
	       var t = dbentry.timestamp;
	       delete dbentry['timestamp'];

            circle.attr(dbentry);

    	    circle.attr({
    		    id:"timestamp"+String(t)
    		});


	  //   circle.attr({
		 //    id:String(t)
			// });
   //      }



        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
	

        });
    }
        // Inject the whole content string into our existing HTML table
        //$('#userList table tbody').html(tableContent);
    // });

});
};


    



// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};


// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};


