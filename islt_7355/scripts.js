// jQuery listener and onload functions
$(document).ready(function(){

    // Hide the welcome text
    $("#welcomeText").hide();

    // Check what the user preference is
    checkConsent();

    // Check and add the user name
    checkName();

    // After user submits preference, save it locally
    $("#submitConsent").click(function(){
       
        // Vars for yes and no radio buttons
        var yesChecked = $('input[id="yesConsent"]:checked').val();
        var noChecked = $('input[id="noConsent"]:checked').val();

        // If statement for yes / no radio button
        if (yesChecked != null){
            localStorage.setItem("consent","yes");

        } else if ( noChecked != null) {
            localStorage.setItem("consent","no");

        } else {
            window.alert("Please select your preference before closing the window");
        }

        // Close the modal
        $("#myModal").modal("hide");
    });

    // Submit the user name 
    $("#submitName").click(function(){
        // Get the user name
        var userName = $("#usr").val();

        // Get the consent preference
        var nuConsent = localStorage.getItem("consent");

        // Store the user name in either local storage or session storage
        if (nuConsent == "yes") {
            localStorage.setItem("userLocalName",userName);
            // reload the window to show
            location.reload(); 

        } else if ( nuConsent == "no") {
            sessionStorage.setItem("userSessionName",userName);
            // reload the window to show
            location.reload(); 

        } else {
            window.alert("An error has occurred. Please enter your cookie preference and try again.")
        }
    });

    // Open the preferences modal for any changes
    $("#preferences").click(function(){
        $("#myModal").modal();
    });

    // Clear user data from local storage
    $("#clearData").click(function(){
        localStorage.clear();
        // Reload Page
        location.reload();
    });
    
});

// Function to check for consent
function checkConsent(){
    // Local storage variable for website cookie consent
    var consent = localStorage.getItem("consent");

    // Open the modal if consent has not been given
    if (consent == null){
        $("#myModal").modal();
    }
}

// Check for the user name and append
function checkName(){
    // Var for the user name from local
    var localName = localStorage.getItem("userLocalName");

    // Var for the user name from session storage
    var sessionName = sessionStorage.getItem("userSessionName");

    // Set the name to local or session name if available
    if (localName != null ) {
        $("#usr").val(localName);

        // Show the welcome text
        $("#welcomeText").show();

        // Prepend the name
        $("#welcomeText").prepend("Hi there " + localName);

    } else if (sessionName != null) {
        $("#usr").val(sessionName);

        // Show the welcome text
        $("#welcomeText").show();

        // Prepend the name
        $("#welcomeText").prepend("Hi there " + sessionName);
    }

}