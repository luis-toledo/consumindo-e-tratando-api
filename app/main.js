const inputCep = document.getElementById("cep");

inputCep.addEventListener("focusout", () =>  buscaEndereco(inputCep.value));

async function buscaEndereco(cep){
    const mensagemDeErro = document.getElementById('erro');
    mensagemDeErro.innerHTML = '';
    try{
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro){
            throw Error('CEP não existente!');
        }
        preencheCampos(consultaCepConvertida);
    }catch (erro){
        mensagemDeErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`;
        console.log(erro);
    }
}

function preencheCampos(data) {
  const bairro = document.getElementById('bairro');
  const rua = document.getElementById('endereco');
  const complemento = document.getElementById('complemento');
  const cidade = document.getElementById('cidade');
  const estado = document.getElementById('estado');

  bairro.value = data.bairro;
  rua.value = data.logradouro;
  complemento.value = data.complemento;
  cidade.value = data.localidade;
  estado.value = data.uf;
}
