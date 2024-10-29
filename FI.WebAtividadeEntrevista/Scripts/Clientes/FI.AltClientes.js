
$(document).ready(function () {
    $("#CPF").on("keyup", function () {
        $('#CPF').val(MascaraCPF($('#CPF').val()));
    });

    $(".btnBeneficiario").on("click", function (e) {
        e.preventDefault();
        openModalBeneficiario();
    });

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(MascaraCPF(obj.CPF));

        obj.Beneficiarios.forEach(function (beneficiario) {
            listaBeneficiarios.push({ id: beneficiario.Id, nome: beneficiario.Nome, cpf: beneficiario.CPF });
        });
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        if (!CPFValido(RemoveCaractereNaoNumerico($(this).find("#CPF").val()))) {
            ErrorAlert('CPF Inválido!');
            return;
        } else {
            document.getElementById("errorNotify").innerHTML = "";
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": RemoveCaractereNaoNumerico($(this).find("#CPF").val()),
                "Beneficiarios": listaBeneficiarios,
                "BeneficiariosIdList": listaBeneficiariosParaRemover
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
                listaBeneficiarios = [];
                listaBeneficiariosParaRemover = [];
                window.location.href = urlRetorno;
            }
        });
    })    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function ErrorAlert(errorMessage, beneficiario = false) {
    var textHtml = '<div class="alert alert-danger" role="alert">' + errorMessage + '</div>';

    if (beneficiario) {
        document.getElementById("errorNotifyCPFBeneficiario").innerHTML = textHtml;
        $('#CPFBeneficiario').focus();
    } else {
        document.getElementById("errorNotify").innerHTML = textHtml;
        $('#CPF').focus();
    }
}

function openModalBeneficiario() {
    let titulo = "Beneficiario";

    $.ajax({
        url: urlBeneficiario,
        method: "GET",
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                $('#divModalBeneficiario').append(ModalBeneficiario(titulo, r));
                $('#modalBeneficiario').modal('show');

                CarregarTabelaBeneficiarios();
                ModalBeneficiarioEventos();
            }
    });
}

function ModalBeneficiario(titulo, texto) {
    var texto = '<div id="modalBeneficiario" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    return texto;
}

function ModalBeneficiarioEventos() {
    $("#CPFBeneficiario").off('keyup').on("keyup", function (e) {
        e.preventDefault();
        $('#CPFBeneficiario').val(MascaraCPF($('#CPFBeneficiario').val()));
    });

    $('#btnIncluirBeneficiario').off('click').on("click", function (e) {
        e.preventDefault();

        if ($("#NomeBeneficiario").val() === "") {
            ErrorAlert('Campo Nome não pode estar vazio!', true);
            return;
        } else {
            document.getElementById("errorNotifyCPFBeneficiario").innerHTML = "";
        }

        if (!CPFValido(RemoveCaractereNaoNumerico($('#CPFBeneficiario').val()))) {
            ErrorAlert('CPF Inválido!', true);
            return;
        } else {
            document.getElementById("errorNotifyCPFBeneficiario").innerHTML = "";
        }

        const beneficiario = listaBeneficiarios.find(ben => ben.cpf === ultimoCPFBeneficiario)

        if (beneficiario) {
            const existeBeneficiario = listaBeneficiarios.filter(ben => ben.cpf === RemoveCaractereNaoNumerico($("#CPFBeneficiario").val()));

            if (existeBeneficiario.length > 0 && ultimoCPFBeneficiario !== RemoveCaractereNaoNumerico($("#CPFBeneficiario").val())) {
                ErrorAlert('Não é possível adicionar um novo beneficiario com um CPF já existente.', true);
                return;
            }

            beneficiario.nome = $("#NomeBeneficiario").val();
            beneficiario.cpf = RemoveCaractereNaoNumerico($("#CPFBeneficiario").val());

            ultimoCPFBeneficiario = null;

            CarregarTabelaBeneficiarios();
        } else {
            const existeBeneficiario = listaBeneficiarios.find(ben => ben.cpf === RemoveCaractereNaoNumerico($("#CPFBeneficiario").val()));
            if (existeBeneficiario) {
                ErrorAlert('Não é possível adicionar um novo beneficiario com um CPF já existente.', true);
                return;
            }
            document.getElementById("errorNotifyCPFBeneficiario").innerHTML = "";
            listaBeneficiarios.push({ id: null, nome: $("#NomeBeneficiario").val(), cpf: RemoveCaractereNaoNumerico($("#CPFBeneficiario").val()) });
        }

        $("#formCadastroBeneficiario")[0].reset();
        document.getElementById("errorNotifyCPFBeneficiario").innerHTML = "";

        CarregarTabelaBeneficiarios();
    });

    $('#modalBeneficiario').on('hidden.bs.modal', function (e) {
        $("#formCadastroBeneficiario")[0].reset();
        document.getElementById("errorNotifyCPFBeneficiario").innerHTML = "";
    })
}