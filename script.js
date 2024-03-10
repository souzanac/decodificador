document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("encriptador").addEventListener("click", criptografarMensagem);
    document.getElementById("descriptador").addEventListener("click", descriptografarMensagem);
    document.getElementById("copiar").addEventListener("click", copiarMensagem);
});

const regexCaractereEspecial = /[A-Z]/;
const regexAcentuacao = /[áàãâéèêíïóôõöúüç]/i;

function verificarCaracteres(texto) {
    return regexCaractereEspecial.test(texto) || regexAcentuacao.test(texto);
}

function criptografarMensagem() {
    const textoOriginal = document.getElementById("mensagem").value;

    if (verificarCaracteres(textoOriginal)) {
        alert("❌ Não são permitidas letras maiúsculas e acentuadas!");
        return;
    }

    if (textoOriginal.trim() === "") {
        return;
    }

    const mapaSubstituicao = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
    };

    const mensagemCriptografada = textoOriginal
        .split("")
        .map(letra => mapaSubstituicao[letra] || letra)
        .join("");

    atualizaResultado(mensagemCriptografada);
}

function descriptografarMensagem() {
    const textoCriptografado = document.getElementById("resultado").value;

    if (verificarCaracteres(textoCriptografado)) {
        alert("❌ Não são permitidas letras maiúsculas e acentuadas!");
        return;
    }

    const mapaDescriptografia = new Map([
        ["ai", "a"],
        ["enter", "e"],
        ["imes", "i"],
        ["ober", "o"],
        ["ufat", "u"],
    ]);

    const mensagemDescriptografada = textoCriptografado
        .match(/(ai|enter|imes|ober|ufat)|./gi)
        .map(sequencia => mapaDescriptografia.get(sequencia) || sequencia)
        .join("");

    document.getElementById("resultado").value = mensagemDescriptografada;
}

function copiarMensagem() {
    const textoParaCopiar = document.getElementById("resultado").value;

    navigator.clipboard
        .writeText(textoParaCopiar)
        .then(() => {
            alert("Mensagem copiada para a área de transferência!");
        })
        .catch(error => {
            console.error(`Erro ao copiar a mensagem: ${error}`);
        });
}

function atualizaResultado(resultado) {
    document.getElementById("resultado").value = resultado;
}
