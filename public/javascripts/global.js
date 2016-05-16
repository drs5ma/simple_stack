


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

            circle.mouseup(function(){


                 console.log(this.attr("cx"),this.attr("cy") );
                this.remove();

                $.ajax({
            type: 'DELETE',data: {"cx":this.attr("cx"),"cy":this.attr("cy")},
            url: '/users/deleteuser'
        });


            });

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


//
function populateTable() {

    // Empty content string
    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {
           // Stick our user data array into a userlist variable in the global object
        userListData = data;
      

	var i;
    for(i=0;i<userListData.length;i+=1){

            var dbentry = userListData[i];



        // Circle with 80px radius
            var circle = paper.circle(dbentry.cx,dbentry.cy,dbentry.r);
            
	       circle.mouseup(function(){


                 console.log(this.attr("cx"),this.attr("cy") );
                 this.remove();

                 $.ajax({
            type: 'DELETE',data: {"cx":this.attr("cx"),"cy":this.attr("cy")},
            url: '/users/deleteuser'
        });



            });
	       var t = dbentry.timestamp;
	       delete dbentry['timestamp'];

            circle.attr(dbentry);

    	    circle.attr({
    		    id:"timestamp"+String(t)
    		});




        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
	

        });
    }


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
// function addUser(event) {
//     event.preventDefault();

//     // Super basic validation - increase errorCount variable if any fields are blank
//     var errorCount = 0;
//     $('#addUser input').each(function(index, val) {
//         if($(this).val() === '') { errorCount++; }
//     });

//     // Check and make sure errorCount's still at zero
//     if(errorCount === 0) {

//         // If it is, compile all user info into one object
//         var newUser = {
//             'username': $('#addUser fieldset input#inputUserName').val(),
//             'email': $('#addUser fieldset input#inputUserEmail').val(),
//             'fullname': $('#addUser fieldset input#inputUserFullname').val(),
//             'age': $('#addUser fieldset input#inputUserAge').val(),
//             'location': $('#addUser fieldset input#inputUserLocation').val(),
//             'gender': $('#addUser fieldset input#inputUserGender').val()
//         }

//         // Use AJAX to post the object to our adduser service
//         $.ajax({
//             type: 'POST',
//             data: newUser,
//             url: '/users/adduser',
//             dataType: 'JSON'
//         }).done(function( response ) {

//             // Check for successful (blank) response
//             if (response.msg === '') {

//                 // Clear the form inputs
//                 $('#addUser fieldset input').val('');

//                 // Update the table
//                 populateTable();

//             }
//             else {

//                 // If something goes wrong, alert the error message that our service returned
//                 alert('Error: ' + response.msg);

//             }
//         });
//     }
//     else {
//         // If errorCount is more than 0, error out
//         alert('Please fill in all fields');
//         return false;
//     }
// };


// // Delete User
// function deleteUser(event) {

//     event.preventDefault();

//     // Pop up a confirmation dialog
//     var confirmation = confirm('Are you sure you want to delete this user?');

//     // Check and make sure the user confirmed
//     if (confirmation === true) {

//         // If they did, do our delete
//         $.ajax({
//             type: 'DELETE',
//             url: '/users/deleteuser/' + $(this).attr('rel')
//         }).done(function( response ) {

//             // Check for a successful (blank) response
//             if (response.msg === '') {
//             }
//             else {
//                 alert('Error: ' + response.msg);
//             }

//             // Update the table
//             populateTable();

//         });

//     }
//     else {

//         // If they said no to the confirm, do nothing
//         return false;

//     }

// };


