const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000;
const session = require('express-session'); // Gerenciamento de sessões
const methodOverride = require('method-override');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs'); // Criptografia de senhas
// Middleware para processar dados JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Middleware para suportar métodos HTTP alternativos
app.use(express.static(path.join(__dirname, 'public')));
// Configuração da URL de conexão com o MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'cursos';
const collectionName = 'aulas';
const urlMongo = 'mongodb://localhost:27017'; // Conexão com MongoDB local

app.use(session({
    secret: 'secretBabbuns', // Defina uma chave secreta para segurança
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Coloque 'true' se estiver usando HTTPS
}));
// Rota para exibir a página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/homepage.html');
});
app.get('/aulasEconomia', (req, res) => {
    res.sendFile(__dirname + '/views/aulasEconomia.html');
});
app.get('/aulasInvestimentos', (req, res) => {
    res.sendFile(__dirname + '/views/aulasInvestimentos.html');
});
app.get('/aulasPlanejamento', (req, res) => {
    res.sendFile(__dirname + '/views/aulasPlanejamento.html');
});
app.get('/aulasFinancas', (req, res) => {
    res.sendFile(__dirname + '/views/aulasFinancas.html');
});
app.get('/confirmacao', (req, res) => {
    res.sendFile(__dirname + '/confirmacao.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/contato', (req, res) => {
    res.sendFile(__dirname + '/contato.html');
});
app.get('/termo', (req, res) => {
    res.sendFile(__dirname + '/termo.html');
});
app.get('/planos', (req, res) => {
    res.sendFile(__dirname + '/planos.html');
});

app.get('/registroplus', (req, res) => {
    res.sendFile(__dirname + '/views/registroplus.html');
});
app.get('/registropro', (req, res) => {
    res.sendFile(__dirname + '/views/registropro.html');
});

app.get('/registroultra', (req, res) => {
    res.sendFile(__dirname + '/views/registroultra.html');
});

app.get('/erro', (req, res) => {
    res.sendFile(__dirname + '/views/erro.html');
});
app.get('/cursos', (req, res) => {
    res.sendFile(__dirname + '/cursos.html');
});

app.get('/cursos', (req, res) => {
    res.sendFile(__dirname + '/cursos.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/views/admin.html');
});


app.get('/bemvindo', (req, res) => {
    const nomeUsuario = req.session.usuario;  // Recupera o nome do usuário da sessão
    const plano = req.session.plano;  // Recupera o plano do usuário da sessão

    if (!nomeUsuario) {
        return res.redirect('/login');  // Se o nomeUsuario não existir, redireciona para o login
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Babbun's Finances</title>
            <style>
                body {
                    background-color: #0E122A;
                    color: #fff;
                    font-family: Arial, sans-serif;
                }
            </style>
        </head>
        <body>
            
            <script>
                // Passa as variáveis nomeUsuario e plano para o JavaScript do cliente
                const nomeUsuario = "${nomeUsuario}";
                const plano = "${plano}";

                // Exibe o alerta com o nome do usuário e o plano escolhido
                alert('Bem-vindo, ' + nomeUsuario + '! Parabéns, aproveite o seu plano ' + plano + '!');

                // Redireciona para a página com base no plano do usuário
                document.addEventListener('DOMContentLoaded', () => {
                    switch (plano) {
                        case 'plus':
                            window.location.href = '/bemvindoplus';
                            break;
                        case 'pro':
                            window.location.href = '/bemvindopro';
                            break;
                        case 'ultra':
                            window.location.href = '/bemvindoultra';
                            break;
                        default:
                            window.location.href = '/bemvindo';
                            break;
                    }
                });
            </script>
        </body>
        </html>
    `);
});
app.get('/api/total-alunos', async (req, res) => {
    try {
        const totalAlunos = await db.collection('usuarios').countDocuments();
        res.json({ total: totalAlunos });
    } catch (error) {
        console.error('Erro ao obter o total de alunos:', error);
        res.status(500).json({ error: 'Erro ao obter o total de alunos' });
    }
});
app.get('/api/alunos-plano', async (req, res) => {
    try {
        const colecaoUsuarios = db.collection('usuarios');
        const planos = ['plus', 'pro', 'ultra'];

        // Cria um objeto para armazenar a contagem de alunos por plano
        const contagemPlanos = {};

        // Conta o número de alunos de cada plano
        for (let plano of planos) {
            const count = await colecaoUsuarios.countDocuments({ plano: plano });
            contagemPlanos[plano] = count;
        }

        res.json(contagemPlanos);
    } catch (error) {
        console.error('Erro ao contar alunos por plano:', error);
        res.status(500).json({ error: 'Erro ao contar alunos por plano' });
    }
});



const nomeBanco = 'sistemaLogin';

let clienteMongo; // Conexão MongoDB global

// Configurações do Express e da sessão
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'segredo-super-seguro',
    resave: false,
    saveUninitialized: true,
}));



// Configuração da sessão
app.use(session({
    secret: 'suaChaveSecreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
(async () => {
    const clienteMongo = new MongoClient(url, { useUnifiedTopology: true });
    try {
        await clienteMongo.connect();
        console.log('Conectado ao MongoDB!');
        db = clienteMongo.db(nomeBanco);
        await criarAdministradorUnico(); // Criar admin se não existir

        // Garantir que a função criarUsuariosPlanos seja aguardada
        await criarUsuariosPlanos();
        console.log('Registro no MongoDB concluído!');
    } catch (erro) {
        console.error('Erro ao conectar ao MongoDB:', erro);
    }
})();

// Função para garantir a criação de um administrador
async function criarAdministradorUnico() {
    try {
        const colecaoAdmins = db.collection('usuarios');

        const adminExistente = await colecaoAdmins.findOne({ usuario: 'admin', Perfil: 'Adm' });
        if (!adminExistente) {
            const senhaCriptografada = await bcrypt.hash('senhaAdmin123', 10);
            await colecaoAdmins.insertOne({
                usuario: 'admin',
                senha: senhaCriptografada,
                Perfil: 'Adm',
                plano: 'adm'  // Define o plano como 'adm' para o administrador
            });
            console.log('Administrador criado com sucesso!');
        } else {
            console.log('Administrador já existente.');
        }
    } catch (erro) {
        console.error('Erro ao verificar/criar administrador:', erro);
    }
}

async function criarUsuariosPlanos() {
    try {
        const colecaoUsuarios = db.collection('usuarios');

        const usuarios = [
            { usuario: 'plus', senha: 'plus', plano: 'plus' },
            { usuario: 'pro', senha: 'pro', plano: 'pro' },
            { usuario: 'ultra', senha: 'ultra', plano: 'ultra' }
        ];

        for (let usuario of usuarios) {
            // Verifica se o usuário já existe
            const usuarioExistente = await colecaoUsuarios.findOne({ usuario: usuario.usuario });
            if (!usuarioExistente) {
                const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
                await colecaoUsuarios.insertOne({
                    usuario: usuario.usuario,
                    senha: senhaCriptografada,
                    Perfil: 'User',
                    plano: usuario.plano
                });
                console.log(`Usuário ${usuario.usuario} criado com sucesso no plano ${usuario.plano}!`);
            } else {
                console.log(`Usuário ${usuario.usuario} já existe.`);
            }
        }
    } catch (erro) {
        console.error('Erro ao criar os usuários dos planos:', erro);
    }
}


app.post('/registroplus', async (req, res) => {
    try {
        const { usuario, senha } = req.body;

        // Verifica se o usuário já existe no MongoDB
        const colecaoUsuarios = db.collection('usuarios');
        const usuarioExistente = await colecaoUsuarios.findOne({ usuario });

        if (usuarioExistente) {
            return res.send(`
                <script>
                    alert('Erro ao registrar: usuário já existente. Escolha outro nome de usuário.');
                    window.location.href = '/registroplus';
                </script>
            `);
        }

        // Definindo o plano como 'plus'
        const plano = 'plus';

        // Verifica se o pagamento está pendente no MongoDB
        const colecaoPagamentos = db.collection('pagamentos');
        const pagamento = await colecaoPagamentos.findOne({ statusPagamento: 'pendente' });

        if (!pagamento) {
            return res.send(`
                <script>
                    alert('Erro ao registrar o usuário: pagamento não realizado ou ainda não confirmado. Complete o pagamento antes de registrar.');
                    window.location.href = '/registroplus';
                </script>
            `);
        }

        // Criptografa a senha do usuário
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = {
            usuario,
            senha: senhaCriptografada,
            Perfil: "User",
            paymentId: pagamento._id,
            plano
        };

        // Salva o nome do usuário na sessão
        req.session.usuario = usuario;

        // Insere o novo usuário no MongoDB
        const resultado = await colecaoUsuarios.insertOne(novoUsuario);
        const userId = resultado.insertedId;

        // Atualiza o status do pagamento para 'completo' e associa o pagamento ao ID do usuário
        await colecaoPagamentos.updateOne(
            { _id: pagamento._id },
            { $set: { statusPagamento: 'completo', userId } }
        );

        // Redireciona para a página de confirmação
        res.redirect('/confirmacao');
    } catch (erro) {
        console.error('Erro ao registrar o usuário:', erro);
        return res.status(500).send('Erro ao registrar o usuário: ocorreu um erro interno no servidor.');
    }
});
app.post('/registropro', async (req, res) => {
    try {
        const { usuario, senha } = req.body;



        // Definindo o plano como 'pro'
        const plano = 'pro';

        // O restante do código é igual ao da rota '/registroplus'
        // Verifica se o pagamento está pendente no MongoDB
        const colecaoPagamentos = db.collection('pagamentos');
        const pagamento = await colecaoPagamentos.findOne({ statusPagamento: 'pendente' });

        if (!pagamento) {
            return res.send(`
                <script>
                    alert('Erro ao registrar o usuário: pagamento não realizado ou ainda não confirmado. Complete o pagamento antes de registrar.');
                    window.location.href = '/registropro';
                </script>
            `);
        }

        // Criptografa a senha do usuário
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const colecaoUsuarios = db.collection('usuarios');
        const novoUsuario = {
            usuario,
            senha: senhaCriptografada,
            Perfil: "User",
            paymentId: pagamento._id,
            plano
        };

        // Salva o nome do usuário na sessão
        req.session.usuario = usuario;

        // Insere o novo usuário no MongoDB
        const resultado = await colecaoUsuarios.insertOne(novoUsuario);
        const userId = resultado.insertedId;

        // Atualiza o status do pagamento para 'completo' e associa o pagamento ao ID do usuário
        await colecaoPagamentos.updateOne(
            { _id: pagamento._id },
            { $set: { statusPagamento: 'completo', userId } }
        );

        // Redireciona para a página de confirmação
        res.redirect('/confirmacao');

    } catch (erro) {
        console.error('Erro ao registrar o usuário:', erro);
        return res.status(500).send('Erro ao registrar o usuário: ocorreu um erro interno no servidor.');
    }
});

// Rota para o plano ULTRA
app.post('/registroultra', async (req, res) => {
    try {
        const { usuario, senha } = req.body;

        // Definindo o plano como 'ultra'
        const plano = 'ultra';

        // O restante do código é igual ao da rota '/registroplus'
        // Verifica se o pagamento está pendente no MongoDB
        const colecaoPagamentos = db.collection('pagamentos');
        const pagamento = await colecaoPagamentos.findOne({ statusPagamento: 'pendente' });

        if (!pagamento) {
            return res.send(`
                    <script>
                        alert('Erro ao registrar o usuário: pagamento não realizado ou ainda não confirmado. Complete o pagamento antes de registrar.');
                        window.location.href = '/registroultra';
                    </script>
                `);
        }

        // Criptografa a senha do usuário
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const colecaoUsuarios = db.collection('usuarios');
        const novoUsuario = {
            usuario,
            senha: senhaCriptografada,
            Perfil: "User",
            paymentId: pagamento._id,
            plano
        };

        // Salva o nome do usuário na sessão
        req.session.usuario = usuario;

        // Insere o novo usuário no MongoDB
        const resultado = await colecaoUsuarios.insertOne(novoUsuario);
        const userId = resultado.insertedId;

        // Atualiza o status do pagamento para 'completo' e associa o pagamento ao ID do usuário
        await colecaoPagamentos.updateOne(
            { _id: pagamento._id },
            { $set: { statusPagamento: 'completo', userId } }
        );

        // Redireciona para a página de confirmação
        res.redirect('/confirmacao');

    } catch (erro) {
        console.error('Erro ao registrar o usuário:', erro);
        return res.status(500).send('Erro ao registrar o usuário: ocorreu um erro interno no servidor.');
    }
});



app.get('/verificarPagamento', async (req, res) => {
    const { usuarioId } = req.query; // Id do usuário passado como parâmetro

    try {
        // Verifica se o pagamento está completo e associado ao usuário
        const pagamento = await db.collection('pagamentos').findOne({ userId: usuarioId, statusPagamento: 'completo' });

        if (pagamento) {
            res.json({ pagamentoCompleto: true });
        } else {
            res.json({ pagamentoCompleto: false });
        }
    } catch (error) {
        res.status(500).send('Erro ao verificar pagamento');
    }
});




app.post('/salvarPagamento', async (req, res) => {
    try {
        const { nomeCompleto, numeroCartao, dataValidade, cvv, payment } = req.body;

        // Criptografa o número do cartão antes de salvar
        const numeroCartaoCriptografado = await bcrypt.hash(numeroCartao, 10); // 10 é o número de saltos (você pode ajustar)

        // Salva o pagamento no banco de dados
        const pagamentosCollection = db.collection('pagamentos');
        const novoPagamento = {
            nomeCompleto,
            numeroCartao: numeroCartaoCriptografado, // Salva o número criptografado
            dataValidade,
            cvv, // O CVV não deve ser salvo, é altamente sensível. Se necessário, aplique criptografia também
            payment,
            statusPagamento: 'pendente', // O pagamento está pendente até a confirmação
        };

        const resultadoPagamento = await pagamentosCollection.insertOne(novoPagamento);

        // Retorna a confirmação que o pagamento foi salvo com sucesso
        res.status(200).json({
            message: 'Pagamento salvo com sucesso! Agora complete o registro.',
            pagamentoId: resultadoPagamento.insertedId // Passa o ID do pagamento de volta
        });
    } catch (error) {
        console.error('Erro ao salvar o pagamento:', error);
        res.status(500).json({ message: 'Erro ao salvar o pagamento.', error });
    }
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const colecaoUsuarios = db.collection('usuarios');
        const usuarioEncontrado = await colecaoUsuarios.findOne({ usuario: usuario });

        if (usuarioEncontrado && await bcrypt.compare(senha, usuarioEncontrado.senha)) {
            // Armazena o nome do usuário e perfil na sessão
            req.session.usuario = usuario;
            req.session.Perfil = usuarioEncontrado.Perfil;
            req.session.plano = usuarioEncontrado.plano;
            req.session.loggedIn = true;

            // Verifica se o usuário é administrador
            if (usuarioEncontrado.Perfil === 'Adm') {
                return res.redirect('/admin');  // Redireciona para página de admin
            }

            // Redireciona para a página de boas-vindas com base no plano
            const plano = usuarioEncontrado.plano;
            switch (plano) {
                case 'plus':
                    return res.redirect('/bemvindo');
                case 'pro':
                    return res.redirect('/bemvindo');
                case 'ultra':
                    return res.redirect('/bemvindo');
                default:
                    return res.redirect('/bemvindo');
            }
        } else {
            res.redirect('/erro');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login');
    }
});


// Middleware para proteger rotas
function protegerRotaUsuario(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
}

function protegerRotaAdm(req, res, next) {
    if (req.session.Perfil === 'Adm') {
        next();
    } else {
        res.redirect('/login');
    }
}

// Rota protegida para usuário comum
app.get('/bemvindoplus', protegerRotaUsuario, (req, res) => {
    res.sendFile(__dirname + '/views/bemvindoplus.html');
});
app.get('/bemvindopro', protegerRotaUsuario, (req, res) => {
    res.sendFile(__dirname + '/views/bemvindopro.html');
});

app.get('/bemvindoultra', protegerRotaUsuario, (req, res) => {
    res.sendFile(__dirname + '/views/bemvindoultra.html');
});


// Rota protegida para administrador
app.get('/admin', protegerRotaAdm, (req, res) => {
    res.sendFile(__dirname + '/views/admin.html');
});

// Rota de logout
app.get('/sair', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Erro ao sair!');
        }
        res.redirect('/login');
    });
});



//tabela mongoDB

// Rota para exibir a página inicial


// Rota para exibir o formulário de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
});

app.get('/atualizar', (req, res) => {
    res.sendFile(__dirname + '/atualizar.html');
});

// cadastrar medicamento
app.post('/cadastro', async (req, res) => {
    const novoMedicamento = req.body;
    // Conectar ao MongoDB
    const client = new MongoClient(url);



    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Inserir o novo medicamento no banco de dados
        const result = await collection.insertOne(novoMedicamento);
        console.log(`Comentario cadastrado com sucesso. ID: ${result.insertedId}`);

        // Redirecionar para a página inicial após o cadastro
        res.redirect('/bemvindo');
    } catch (err) {
        console.error('Erro ao cadastrar o Comentario:', err);
        res.status(500).send('Erro ao cadastrar o Comentario. Por favor, tente novamente mais tarde.');
    } finally {
        client.close();
    }
});


// Rota para exibir o formulário de atualização


// Rota para lidar com a submissão do formulário de atualização
app.post('/atualizar', async (req, res) => {
    const { id, NomeDoMedicamento, codigo, Dosagem, disponivel } = req.body;

    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Atualizar o medicamento no banco de dados
        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Utilize o ObjectId importado
            {
                $set: {
                    NomeDoMedicamento, codigo, Dosagem, disponivel: disponivel === "true"
                }
            }
        );

        if (result.modifiedCount > 0) {
            console.log(`Comentario com ID: ${id} atualizado com sucesso.`);
            res.redirect('/medicamento');
        } else {
            res.status(404).send('Medicamento não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao atualizar o Comentario:', err);
        res.status(500).send('Erro ao atualizar o Comentario. Por favor, tente novamente mais tarde.');
    } finally {
        client.close();
    }
});


// Rota para lidar com a submissão do formulário de deleção
app.post('/deletar', async (req, res) => {
    const { id } = req.body;

    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Deletar o medicamento no banco de dados
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            console.log(`Comentario com ID: ${id} deletado com sucesso.`);
            res.redirect('/admin'); // Redirecionar para a página inicial após a exclusão
        } else {
            res.status(404).send('Comentario não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao deletar o Comentario:', err);
        res.status(500).send('Erro ao deletar o Comentario. Por favor, tente novamente mais tarde.');
    } finally {
        client.close();
    }
});


// Rota para obter todos os medicamentos

// Rota para exibir o formulário de cadastro

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor Node.js em execução em http://localhost:${port}`);
});