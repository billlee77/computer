
function showhide(id)
{	if (document.getElementById)
	 {
	     obj = document.getElementById(id);
	     obj.style.display = (obj.style.display == "none") ? "" : "none";
	 }
}

<!-- For now disable the mail form -->

function disablemailform()
{
	var limit = mailForm.elements.length;
	for (i=0;i<limit;i++) {
		mailForm.elements[i].disabled = true;
	}
}

function checkEmail(emailField) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField.value))
	{
		return (true)
	}
	alert("Invalid E-mail Address! Please re-enter.")
	return (false)
}

