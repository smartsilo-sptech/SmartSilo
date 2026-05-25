<<<<<<< Updated upstream
function entrar() {
    aguardar();
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    } else {
        setInterval(sumirMensagem, 5000);
    }
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);
    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
        }),
    })
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!");
            console.log(resposta.status);
            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then((json) => {
=======
    function entrar() {
        aguardar();

        var emailVar = email_input.value;
        var senhaVar = senha_input.value;

        if (emailVar == "" || senhaVar == "") {
            cardErro.style.display = "block"
            mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
            finalizarAguardar();
            return false;
        }
        else {
            setInterval(sumirMensagem, 5000)
        }

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
>>>>>>> Stashed changes
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;
<<<<<<< Updated upstream
                    setTimeout(function () {
                        window.location = "../../dashboard/dash-visao-geral.html";
                    }, 1000); // apenas para exibir o loading
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then((texto) => {
=======

                    setTimeout(function () {
                        window.location = "./dashboard/cards.html";
                    }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
>>>>>>> Stashed changes
                    console.error(texto);
                    finalizarAguardar(texto);
                });
            }
<<<<<<< Updated upstream
        })
        .catch(function (erro) {
            console.log(erro);
        });
    return false;
}
function sumirMensagem() {
    cardErro.style.display = "none";
}
=======

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }

    function sumirMensagem() {
        cardErro.style.display = "none"
    }
>>>>>>> Stashed changes
