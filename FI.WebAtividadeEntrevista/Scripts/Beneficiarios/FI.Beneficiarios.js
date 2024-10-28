var ultimoCPFBeneficiario = null;

$(document).ready(function () {
    
})

function AlterarBeneficiario(cpf, nome) {
    ultimoCPFBeneficiario = cpf;
    $("#NomeBeneficiario").val(nome);
    $("#CPFBeneficiario").val(MascaraCPF(cpf));
}

function RemoverBeneficiario(cpf) {
    const indexBeneficiario = listaBeneficiarios.findIndex(ben => ben.cpf = cpf);

    listaBeneficiarios.splice(indexBeneficiario, 1);

    CarregarTabelaBeneficiarios();
}

function CarregarTabelaBeneficiarios() {
    $('#tabelaBeneficiario tbody tr').remove();

    listaBeneficiarios.forEach(function (beneficiario) {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td>' + beneficiario.cpf + '</td>';
        cols += '<td>' + beneficiario.nome + '</td>';
        cols += '<td class="actions">';
        cols += '<button class="btn btn-primary" onclick="AlterarBeneficiario(\'' + beneficiario.cpf + '\', \'' + beneficiario.nome + '\')" type="button" style="width:47%; margin-right: 10px">Alterar</button>';
        cols += '<button class="btn btn-primary" onclick="RemoverBeneficiario(\'' + beneficiario.cpf + '\')" type="button" style="width:47%">Remover</button>';
        cols += '</td>';

        newRow.append(cols);

        $("#tabelaBeneficiario").append(newRow);
    });
}