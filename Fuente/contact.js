$(function () {

    let PAT = (window.location.search).slice(1);// Captura el id de la direccion http y se guarda en PAT
    let edit = false;
    fetchContacts();
    $('#contact-result').hide();
    $('#form-id-contact').hide();
    //función que busca contactos
    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            if (search) {
                $.ajax({
                    url: 'contact-search.php',
                    type: 'POST',
                    data: { search },
                    success: function (response) {
                       
                        let contacts = JSON.parse(response, null);
                        let template = '';
                        if(response){
                            
                            contacts.forEach(contact => {
                            template +=
                                `
                        <tr userId="${contact.contact_number}">
                            <td>${contact.contact_name}</td>
                            <td>${contact.contact_number}</td>
                            <td>${contact.contact_type}</td>
                            <td>${contact.contact_relationship}</td>
                            <td>
                                <button class= "contact-delete btn btn-danger">
                                    Borrar
                                </button>
                                <button class= "contact-edit btn btn-info">
                                    Editar
                                </button>
                            </td>
                         </tr>
                        `
                        });
                        $('#container').html(template);
                        $('#contact-result').show();
                        }else{
                           console.log('noooo');
                        }
                        
                    }
                })
            }
        } else {
            $('#contact-result').hide();
            
        }
    });


    $('#contact-form').submit(function (e) {
        const postData = {
            contact_id: $('#contact-id').val(),
            contact_name: $('#contact-name').val(),
            contact_number: $('#contact-number').val(),
            contact_type: $('#contac-type').val(),
            contact_relationship: $('#contac-relationship').val(),
            user_id: PAT,
            
        }
        console.log(postData);
        let url = edit === false ? 'contact-add.php' : 'contact-edit.php';
        console.log(postData);
        e.preventDefault();

        $.post(url, postData, function (response) {
            $('#contact-form').trigger('reset');
            $('#contact-name').removeClass("is-valid");
            $('#contact-number').removeClass("is-valid");
            fetchContacts();
            edit = false;
            // console.log(response);
        });
    });



    function fetchContacts() {
        $.ajax({

            url: 'contact-list.php',
            type: 'POST',
            data: { PAT },
            success: function (response) {


                let contacts = JSON.parse(response, null);
                let template = '';
                //console.log(contacts);
                contacts.forEach(contact => {
                    template += `
                <tr userId="${contact.contact_id}">
                     <td>${contact.contact_name}</td>
                    <td>${contact.contact_number}</td>
                    <td>${contact.contact_type}</td>
                    <td>${contact.contact_relationship}</td>
                    <td>
                    <button class= "contact-delete btn btn-danger">
                       Borrar
                    </button>
                    <button class= "contact-edit btn btn-info">
                       Editar
                    </button>
                    </td>
                </tr>
                `
                });
                $('#contact').html(template);


            }
        });
    }
    $(document).on('click', '.contact-delete', function () {
        if (confirm('¿Esta seguro que desea borrar este contact?')) {
            const element = $(this)[0].parentElement.parentElement;
            const id = $(element).attr('userId');

            console.log(id);
            $.post('contact-delete.php', { id }, function (response) {
                fetchContacts();
            });
        }
    });

    $(document).on('click', '.contact-edit', function () {
        const element = $(this)[0].parentElement.parentElement;
        const id = $(element).attr('userId');
        $.post('contact-form.php', { id }, (response) => {
            
            const contac = JSON.parse(response, null);
            $('#contact-id').val(contac.contact_id);
            $('#contact-name').val(contac.contact_name);
            $('#contact-number').val(contac.contact_number);
            $('#contac-type').val(contac.contact_type);
            $('#contac-relationship').val(contac.contact_relationship);
            edit = true;
        });

    });
    //validacion de formulario
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#contact-form input');


    const validateForm = function (e) {
        switch (e.target.name) {
            case "contact-name":
                if (expresiones.nombre.test(e.target.value)) {
                    $(this).addClass("is-valid");
                    $(this).removeClass("is-invalid");
                } else {
                    $(this).addClass("is-invalid");
                    $(this).removeClass("is-valid");
                }
                break;
            case "contact-number":
                if (expresiones.id.test(e.target.value)) {
                    $(this).addClass("is-valid");
                    $(this).removeClass("is-invalid");
                } else {
                    $(this).addClass("is-invalid");
                    $(this).removeClass("is-valid");

                }

                break;

        }
    }


    inputs.forEach(function (input) {
        input.addEventListener('keyup', validateForm);
        input.addEventListener('blur', validateForm);
    }

    );



    const expresiones = {
        id: /^\d{3,14}$/,
        nombre: /^[a-zA-ZÀ-ÿ\s]{2,20}$/, // Letras y espacios, pueden llevar acentos.

    }


});



