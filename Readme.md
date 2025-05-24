# Rodar o projeto localmente:

## Dependências:
- Ter um projeto GCP

## Passo a passo:
1. Criar arquivo `terraform.tfvars` na pasta `terraform/` e preencher as variáveis necessárias
2. Exportar a chave da Service Account com o comando `export GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json`

## Rodar cloud functions:
1. Executar o comando `functions-framework --target=main --debug`
