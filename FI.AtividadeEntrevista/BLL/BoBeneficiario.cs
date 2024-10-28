using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            daoBeneficiario.Alterar(beneficiario);
        }

        /// <summary>
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            daoBeneficiario.Excluir(id);
        }

        /// <summary>
        /// Lista os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Listar()
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.Listar();
        }

        /// <summary>
        /// Consulta os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Consultar(long id)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.Consultar(id);
        }
    }
}
