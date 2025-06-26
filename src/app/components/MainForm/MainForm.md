README do Componente MainForm
Visão Geral
O componente MainForm (localizado em components/MainForm/MainForm.tsx) é o formulário de contato do site da Isoart, responsável por coletar informações como nome, e-mail, telefone, solução desejada e cidade, salvando-as em um banco de dados. Além disso, exibe contatos e endereços das fábricas, com estilização aplicada via MainForm.module.css.
Cenário Atual

O arquivo MainForm.tsx exibe os campos do formulário, mas não possui lógica para gerenciar entradas, validar dados ou enviá-los.
O site utiliza um banco MySQL gerenciado via phpMyAdmin, porém o esquema da base de dados é desconhecido.
Não há integração com o banco para salvar os envios do formulário.

Cenário Desejado

Conectar o MainForm ao banco MySQL existente para salvar solicitações em uma tabela (ex.: contact_requests).
Adicionar validação para os campos nome e e-mail, com exibição de mensagens de sucesso ou erro.
Planejar futura migração para o Supabase.
Documentar o processo neste README.

Requisitos

Acesso ao phpMyAdmin (credenciais fornecidas pelo provedor de hospedagem).
Projeto Next.js configurado.
Biblioteca MySQL para Node.js: npm install mysql2.
Editor de texto (ex.: VS Code).
Navegador para testes.

Passo a Passo
Etapa 1: Configurar o Banco MySQL

Acesse o phpMyAdmin e verifique se existe uma tabela para formulários (ex.: contacts). Caso não exista, crie uma:
Nome: contact_requests
Colunas: 
id (int, auto_increment, primary key)
name (varchar 255, not null)
email (varchar 255, not null)
phone (varchar 20)
solution (varchar 255)
city (varchar 255)
created_at (datetime)




Anote as credenciais do banco: host, usuário, senha, nome do banco.

Etapa 2: Configurar Conexão no Next.js

Instale a biblioteca mysql2: npm install mysql2.
Adicione as credenciais do banco ao arquivo .env.local:
DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE.


Crie um arquivo para gerenciar a conexão com o MySQL (ex.: lib/db.js).

Etapa 3: Atualizar o MainForm

Adicione lógica ao MainForm.tsx para gerenciar as entradas dos campos.
Implemente validação para os campos nome e e-mail.
Configure o envio de dados para a tabela contact_requests no MySQL.
Adicione mensagens de sucesso ou erro após o envio.
Atualize MainForm.module.css com estilos para as mensagens de sucesso e erro.

Etapa 4: Testar

Inicie o servidor Next.js: npm run dev.
Acesse a página do formulário (ex.: http://localhost:3000).
Preencha e envie o formulário, verificando os dados salvos no phpMyAdmin.
Teste cenários de erro: campos vazios, e-mail inválido, ausência de conexão com o banco.
Verifique a responsividade em dispositivos móveis e desktop.

Etapa 5: Implantar

Gere o build: npm run build.
Envie as alterações para o repositório Git e realize a implantação (ex.: Vercel).
Configure as variáveis de ambiente no provedor de hospedagem.
Teste o formulário no site publicado, confirmando os dados no phpMyAdmin.

Notas Adicionais

Os arquivos JSON da exportação das tabelas serão adicionados assim que fornecidos.
