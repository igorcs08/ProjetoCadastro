using FI.AtividadeEntrevista.DML;
using FI.WebAtividadeEntrevista.Models;

namespace FI.WebAtividadeEntrevista.Mapper
{
    public static class Mapper
    {
        public static BeneficiarioModel BeneficiarioToBeneficiarioModel(Beneficiario beneficiario)
        {
            BeneficiarioModel model = new BeneficiarioModel();

            model.Id = beneficiario.Id;
            model.CPF = beneficiario.CPF;
            model.Nome = beneficiario.Nome;
            model.IdCliente = beneficiario.IdCliente;

            return model;
        }
    }
}