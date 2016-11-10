/**************************************
 TITLE: validation.js				
 AUTHOR: Mohammad Hamad	 (mzh)	
 CREATE DATE: 9 November 2016
 PURPOSE: Validating registration input
 Original Build ON: 9 November 2016


Notes about validation rules:
FName, MiddleName, LName - Must be non-numerical
Password - The user's password. Must be greater than 8 characters long and contain at least one special character (!, @, #, $, etc).
ConfirmPassword - must match password
***************************************/
$(document).ready(function() {
	
    
    //quick example to see if including the file works
    
    
	var pass = document.getElementById("password")
	var confirmPass = document.getElementById("comfirmPassword")
	
	$("#submit").click(function(){
   		If (confirmPass == pass)
   			return true;
   		else
   			alert("Passwords do not match!");
}

		
				
				
				
				
				
				
				
				
				
	

});