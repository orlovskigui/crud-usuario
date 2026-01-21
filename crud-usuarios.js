const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let usuarios = [];
let proximoID = 1;

function perguntar(texto, callback) {
    rl.question(texto, (resposta) => {
        callback(resposta);
    })
}
function acharIndicePorId(id){
    for(let i =0; i < usuarios.length; i++) {
        if (usuarios[i].id === id) {
            return i;
        }
    }
    return -1
}

function cadastrarUsuario () {
    console.log("\n Cadastrar usuario");
    perguntar("Nome: ", (nome) => {
        perguntar("Senha: ", (senha) => {
            perguntar("Idade: ", (idadeStr) => {
                nome = nome.trim();
                senha = senha.trim();
                const idade = Number(idadeStr);

                if (!nome || !senha || Number.isNaN(idade)) {
                    console.log("ERRO: Dados errados");
                    return menu();
                }

                const usuario = {
                    id: proximoID,
                    nome: nome,
                    idade: idade,
                    senha: senha,
                }

                usuarios.push(usuario)
                proximoID++

                console.log("Usuario cadastrado com sucesso!!! ID: ", usuario.id);

                menu()
            })
        })
    })
}
        function listarUsarios(){
    console.log("LISTAR USUARIOS");
    if(usuarios.length === 0) {
        console.log("Nenhum Usuario cadastrado.");
        return menu()
    }
    for (let i = 0; i < usuarios.length; i++) {
        console.log("Usuario cadastrado.");
       
        const l = usuarios[i];
        console.log(
            "ID: ", l.id,
            "| Nome: ", l.nome,
            "| Senha: ", l.senha,
            "| Idade: ", l.idade,
        )
    }
    menu()
}
function deletarUsuario() {
    console.log("Deletar usuario")
    perguntar("Digite o ID: ", (idStr) => {
        const id = Number(idStr);
        if (Number.isNaN(id)) {
            console.log("Erro: ID invalido")
            return menu();
        }

        const posicao = acharIndicePorId(id);

        if (posicao === -1) {
            console.log("Usuario não encontrado");
            return menu();
        }

        usuarios.splice(posicao, 1);


        console.log("Deletado com sucesso");
        menu();

    });
}
function editarUsuario() {
    console.log("editar Usuario");

    perguntar("Digite o ID: ", (idStr) => {
        const id = Number(idStr);
        if (Number.isNaN(id)) {
            console.log("Erro: ID invalido")
            return menu();
        }

        const posicao = acharIndicePorId(id);

        if(posicao === -1) {
            console.log("Usuarios não encontrado");
            return menu();
        }

        const usuario = usuarios[posicao];

        perguntar(`Novo Nome(${usuario.nome})`, (novoNome) => {
            perguntar(`Nova Senha(${usuario.senha})`, (novaSenha) => {
                perguntar(`Nova Idade(${usuario.idade})`, (novaIdade) => {
                        novoNome.trim();
                        if (novoNome) {
                            usuario.nome = novoNome;
                        }

                        novaSenha = novaSenha.trim();
                        if (novaSenha) {
                            usuario.senha = novaSenha;
                        }

                        novaIdade = novaIdade.trim();
                        if (novaIdade) {
                            const nIdade = Number(novaIdade);

                            if (Number.isNaN(novaSenha)) {
                                console.log("ERRO: Valor Errado");
                            }

                            usuario.Idade = novaIdade;
                        }

                        console.log("Usuario atualizado com sucesso!");
                        menu();
                })
            })
        })
    })
}
function vizualizarUsuario() {
    console.log("Vizualizar Usuario")
    perguntar("Digite o ID: ", (idStr) => {
        const id = Number(idStr);
        if (Number.isNaN(id)) {
            console.log("Erro: ID invalido")
            return menu();
        }

        const posicao = acharIndicePorId(id);

        if (posicao === -1) {
            console.log("Usuario não encontrado");
            return menu();
        }

        const usuario = usuarios[posicao];


        console.log(
            'ID: ', usuario.id,
            '| Nome: ', usuario.nome,
            '| Senha: ', usuario.senha,
            '| Idade: ', usuario.idade
        )

        menu();

    });
}

function mostrarMenu() {
    console.log("\n=========");
    console.log("   CRUD USUÁRIOS");
    console.log("===========")
    console.log("1) Cadastrar usuário");
    console.log("2) Listar usuário");
    console.log("3) Visualizar usuário (por ID)");
    console.log("4) Editar usuário");
    console.log("5) Deletar usuário");
    console.log("0) Sair");
    console.log("===========");
}

function menu() {
    mostrarMenu();
    perguntar("Escolha uma opção: ", (opcao) => {
        opcao = opcao.trim();
        switch (opcao) {
            case "1":
             cadastrarUsuario();
                break;
            case "2":
                 listarUsarios();
                 break;
            case "3":
                 vizualizarUsuario();
                 break;
            case "4":
                 editarUsuario();
                 break;
            case "5":
                 deletarUsuario();
                 break 
            case "0":
                console.log("Saindo...");
                rl.close();
                break;
            default:
                console.log("Opção inválida!");
                 menu();
                 break;
        }
    }
    )
}

menu();
