function cadastrar() {
    // aguardar();
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;
    var codigoVar = codigo_input.value;
    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == "" ||
        codigoVar == ""
    ) {
        cardSucesso.style.display = 'none';
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            codigoServer: codigoVar,
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                cardErro.style.display = 'none';
                cardSucesso.style.display = "block";
                cardSucesso.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
                setTimeout(() => {
                    window.location = "./login.html";
                }, 2000);
                finalizarAguardar();
                return;
            }
            return resposta.text().then(function (texto) {
                throw texto || "Houve um erro ao tentar realizar o cadastro!";
            });
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            cardSucesso.style.display = 'none';
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = erro;
            finalizarAguardar();
        });
    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none";
    cardSucesso.style.display = 'none';
}
