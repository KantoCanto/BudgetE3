window.onload = function () {
  //codigo para manipiçar o DOM
  const url_base = "https://budgetE3.herokuapp.com";
  const btnRegister = document.getElementById("btnRegister");

  //Reggister Participants
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

  //Get speakers from server
  (async () => {
    const renderSpeakers = document.getElementById("renderSpeakers");
    let txtSpeakers = "";
    const response = await fetch(`${urlBase}/conferences/1/speakers`);
    const speakers = await response.json();

    for (const speaker of speakers) {
      let socialLinks = ""; // Store social media links

      if (speaker.twitter !== null) {
        socialLinks += `
                <li class="list-inline-item">
                    <a href="${speaker.twitter}" target="_blank">
                        <i class="fab fa-twitter"></i>
                    </a>
                </li>`;
      }
      if (speaker.facebook !== null) {
        socialLinks += `
                <li class="list-inline-item">
                    <a href="${speaker.facebook}" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                </li>`;
      }
      if (speaker.linkedin !== null) {
        socialLinks += `
                <li class="list-inline-item">
                    <a href="${speaker.linkedin}" target="_blank">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </li>`;
      }

      txtSpeakers += `
            <div class="col-sm-4">
                <div class="team-member">
                    <img class="mx-auto rounded-circle viewSpeaker" id="${speaker.idSpeaker}" src="${speaker.photo}" alt="">
                    <h4>${speaker.name}</h4>
                    <p class="text-muted">${speaker.role}</p>
                    <ul class="list-inline social-buttons">
                        ${socialLinks}
                    </ul>
                </div>
            </div>`;

      //manage image click
      const btnView = document.getElementsByClassName("viewSpeaker");
      for (let i = 0; i < btnView.length; i++) {
        btnView[i].addEventListener("click", () => {
          for (const speaker of speakers) {
            if (speaker.idSpeaker == btnView[i].getAttribute("id")) {
              //modal window
              swal({
                title: speaker.name,
                text: speaker.bio,
                imageUrl: speaker.photo,
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: "Speaker Photo",
                animation: false,
              });
            }
          }
        });
      }
    }
    renderSpeakers.innerHTML = txtSpeakers;
  })();
};
