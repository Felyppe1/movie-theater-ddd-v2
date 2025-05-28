# Rodar o projeto localmente:

## Dependências:
- Ter um projeto GCP

## Passo a passo:
1. Criar arquivo `terraform.tfvars` na pasta `terraform/` e preencher as variáveis necessárias
2. Exportar a chave da Service Account com o comando `export GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json`
3. `docker compose up`
4. Executar generate e migrate


## Rodar cloud functions:
Executar o comando:
- `functions-framework --target=main --debug` para http
- `functions-framework --target=main --signature-type=cloudevent` para pubsub
