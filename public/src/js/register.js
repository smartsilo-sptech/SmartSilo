<<<<<<< Updated upstream
function cadastrar() {
    // aguardar();
=======
  let listaEmpresasCadastradas = [];

  function cadastrar() {
    // aguardar();

>>>>>>> Stashed changes
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;
    var codigoVar = codigo_input.value;
<<<<<<< Updated upstream
    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == "" ||
        codigoVar == ""
    ) {
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
                cardErro.style.display = "block";
                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
                setTimeout(() => {
                    window.location = "./login.html";
                }, 2000);
                limparFormulario();
                finalizarAguardar();
                return;
            }
            return resposta.text().then(function (texto) {
                throw texto || "Houve um erro ao tentar realizar o cadastro!";
            });
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = erro;
            finalizarAguardar();
        });
    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none";
}
=======
    var idEmpresaVincular

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == "" ||
      codigoVar == ""
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;
    } else if (nomeVar.length < 1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "O campo nome deve conter mais de 1 caractere";

      finalizarAguardar();
      return false;
    } else if (!(emailVar.includes('@') || emailVar.includes('.'))) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "O E-mail deve conter '@' e '.'";

      finalizarAguardar();
      return false;
    } else if (senhaVar.length <= 8 ||
      !(senhaVar.includes('@') || 
        senhaVar.includes('!') ||
        senhaVar.includes('#') ||
        senhaVar.includes('%') ||
        senhaVar.includes('&') ||
        senhaVar.includes('*'))
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "A senha deve conter pelo menos 8 caracteres e pelo menos 1 caractere especial!";
      finalizarAguardar();
      return false;
    } else if (senhaVar != confirmacaoSenhaVar) 
      {
       cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "As senhas devem ser iguais";

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    // Verificando se o código de ativação é de alguma empresa cadastrada
    for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
      if (listaEmpresasCadastradas[i].codigo_ativacao == codigoVar) {
        idEmpresaVincular = listaEmpresasCadastradas[i].id
        console.log("Código de ativação válido.");
        break;
      } else {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "(Mensagem de erro para código inválido)";
        finalizarAguardar();
      }
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        idEmpresaVincularServer: idEmpresaVincular
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

  // Listando empresas cadastradas 
  function listar() {
    fetch("/empresas/listar", {
      method: "GET",
    })
      .then(function (resposta) {
        resposta.json().then((empresas) => {
          empresas.forEach((empresa) => {
            listaEmpresasCadastradas.push(empresa);

            console.log("listaEmpresasCadastradas")
            console.log(listaEmpresasCadastradas[0].codigo_ativacao)
          });
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }
>>>>>>> Stashed changes
