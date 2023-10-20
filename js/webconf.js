window.onload = function () {
  //codigo para manipiçar o DOM
  const url_base = "https://budgetE3.herokuapp.com";
  const btnRegister = document.getElementById("btnRegister");
  btnRegister.addEventListener("click", function () {
    swal({
      title: "Budget E3 SignUp",
      html:
        '<input id="txtName" class="swal2-input" placeholder="name">' +
        '<input id="txtEmail" class="swal2-input" placeholder="e-mail">',
      showCancelButton: true,
      confirmButtonText: "SignUp",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const name = document.getElementById("txtName").value;
        const email = document.getElementById("txtEmail").value;

        return fetch(`${url_base}/conderences/1/participants/${email}`, {
          headers: { "Content-Type": "application/x-www-form-urlcoded" },
          method: "POST",
          body: `participantName=${name}`,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            swal.showValidationError(`Failed Reques: ${error}`);
          });
      },
      allowOutsideCheck: () => !swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        if (!result.value.err_code) {
          swal({
            title: "SignUp Successful",
          });
        } else {
          swal({
            title: `${result.value.err_message}`,
          });
        }
      }
    });
  });
};
