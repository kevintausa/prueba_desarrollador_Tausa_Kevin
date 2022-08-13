$(function () {
    //console.log('jquery is working!');
    let edit = false;
    fetchUsers();

    $('#user-result').hide();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            if (search) {
                $.ajax({
                    url: 'user-search.php',
                    type: 'POST',
                    data: { search },
                    success: function (response) {
                        let users = JSON.parse(response, null);

                        let template = '';
                        users.forEach(user => {
                            template += 
                        `
                        <tr userId="${user.id}">
                            <td>${user.id}</td>
                            <td>${user.name + " " + user.lastName} </td>
                            <td>${user.date}</td>
                            <td>${user.gender}</td>
                        
                            <td>
                                <button class= "user-delete btn btn-danger">
                                Borrar
                                </button>
                                <button class= "user-edit btn btn-info">
                                Editar
                                </button>
                                <button class= "user-view btn btn-success" >
                                ver
                                </button>
                            </td>
                         </tr>
                        `
                        });
                        $('#container').html(template);
                        $('#user-result').show();
                        console.log(users);
                    }
                })
            }
        } else {
            $('#user-result').hide();
        }
    });

    $('#user-form').submit(function (e) {

        const postData = {
            id: $('#id').val(),
            name: $('#name').val(),
            lastName: $('#lastName').val(),
            date: $('#date').val(),
            gender: $('#gender').val()
        }
        let url = edit === false ? 'user-add.php' : 'user-edit.php';

        e.preventDefault();

        $.post(url, postData, function (response) {
            console.log(response);
            $('#user-form').trigger('reset');
            $('#name').removeClass("is-valid");
            $('#lastName').removeClass("is-valid");
            fetchUsers();
            edit = false;
        });
    });

    function fetchUsers() {
        $.ajax({
            url: 'user-list.php',
            type: 'GET',
            success: function (response) {
                let users = JSON.parse(response, null);
                let template = '';

                console.log(users);
                users.forEach(user => {
                    template += `
                    <tr userId="${user.id}">
                        <td>${user.id}</td>
                        <td>${user.name + " " + user.lastName} </td>
                        <td>${user.date}</td>
                        <td>${user.gender}</td>
                    
                        <td>
                            <button class= "user-delete btn btn-danger">
                               Borrar
                            </button>
                        
                    
                    
                            <button class= "user-edit btn btn-info">
                               Editar
                            </button>
                    
                            <button class= "user-view btn btn-success" >
                               ver
                            </button>
                         </td>
                    </tr>
                    `
                });
                $('#users').html(template);
            }
        });
    }

    $(document).on('click', '.user-delete', function () {
        if (confirm('¿Esta seguro que desea borrar este usuario?')) {

            const element = $(this)[0].parentElement.parentElement;
            const id = $(element).attr('userId');


            $.post('user-delete.php', { id }, function (response) {
                fetchUsers();
            });
        }
    });

    $(document).on('click', '.user-edit', function () {

        const element = $(this)[0].parentElement.parentElement;
        const id = $(element).attr('userId');
        $.post('user-form.php', { id }, function (response) {
            const user = JSON.parse(response, null);
            $('#name').val(user.name);
            $('#lastName').val(user.lastName);
            $('#id').val(user.id);
            $('#date').val(user.date);
            edit = true;
        })

    });

    $(document).on('click', '.user-view', function () {
        const element = $(this)[0].parentElement.parentElement;
        const id = $(element).attr('userId');
        raiz=window.location.href="contacs.html";
        console.log(raiz);
        url = raiz+'?'+ id;
       // url = 'http://localhost/prueba_desarrollador_Kevin_Tausa/Fuente/contacs.html?' + id;
       http://localhost/prueba_desarrollador_Kevin_Tausa/Fuente/contacts.html?1069750564
        $(location).attr('href', url);

    });

    //validacion de formulario
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#user-form input');


    const validateForm = function (e) {
        switch (e.target.name) {
            case "name":
                if (expresiones.nombre.test(e.target.value)) {
                    $(this).addClass("is-valid");
                    $(this).removeClass("is-invalid");
                } else {
                    $(this).addClass("is-invalid");
                    $(this).removeClass("is-valid");
                }
                break;
            case "lastName":
                if (expresiones.nombre.test(e.target.value)) {
                    $(this).addClass("is-valid");
                    $(this).removeClass("is-invalid");
                } else {
                    $(this).addClass("is-invalid");
                    $(this).removeClass("is-valid");

                }

                break;
            case "id":
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