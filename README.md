# ProjetoCadastro

## Visão geral

A atividade consiste em adicionar o campo de CPF ao formulário de cliente, formatação e validação.

Solicita também a adição de um modal para adição de Beneficiário com os campos Nome e CPF, onde é possível adicionar, alterar e remover.

## Features adicionadas

O formulário de cadastro/alteração de cliente não permite a adição de um CPF já existente no banco.

Ex.:
![Tela cadastro](readme/cadastro_erro_CPF_Existente.png)

O campo de CPF possui as seguintes regras:

- Máscara para formatação do CPF tem o seguinte padrão (###.###.###-##)
- A validação do CPF é com base em algoritmo que valida o dígito verificador.

Ex.:
![Tela cadastro](readme/campo_CPF_Erro.png)

O modal de beneficiário possui algumas regras.

- Não é possível adicionar mais de um Beneficiário com o mesmo para um mesmo cliente.

Ex.:
![Tela cadastro](readme/beneficiario_CPF_existente.png)

- É possível adicionar, alterar e remover os beneficiários.

Ex.:
![Tela cadastro](readme/beneficiario_CPF_invalido.png)
