import React, { Component } from 'react'
import '../FormCliente/formCliente.css'
import Swal from 'sweetalert2';
import axios from 'axios';

let dadosUsuario = JSON.parse(localStorage.getItem('usuario'));
export default class FormCliente extends Component {


componentDidMount(){
    this.recuperaDados();
    this.atualizaDados();
}


recuperaDados = () => {

    let nome = document.getElementById('nome');
    let sobrenome = document.getElementById('sobrenome');
    let CPF = document.getElementById('cpf');
    let cbbGenero = document.getElementById('cbbGenero');
    let txtDataNascimento = document.getElementById('dataNascimento');
    let txtCelular = document.getElementById('txtCelular');
    let txtEmail = document.getElementById('txtEmail');
    let txtSenha = document.getElementById('txtSenha');
    let txtConfSenha = document.getElementById('txtConfSenha');

    cbbGenero.value = dadosUsuario.genero;
    txtCelular.value = dadosUsuario.telefone;
    txtEmail.value = dadosUsuario.email;
    sobrenome.value = dadosUsuario.sobrenome;
    /* txtSenha.value = dadosUsuario.senha;
    txtConfSenha.value = dadosUsuario.senha; */
    
    CPF.value = dadosUsuario.CPF;
    CPF.disabled = true;

    nome.value = dadosUsuario.nome;
    nome.disabled = true;

    txtDataNascimento.value = dadosUsuario.data_nascimento;
    txtDataNascimento.disabled = true;
}

montaJSON = (sobrenome, genero, telefone, email, senha) => {

    let JSONDados = {
        "sobrenome":`${sobrenome}`,
        "genero":`${genero}`,
        "telefone":`${telefone}`,
        "email":`${email}`,
        "senha":`${senha}`
    }

    return JSONDados;
}

atualizaDados = () =>{

    let sobrenome = document.getElementById('sobrenome');
    let cbbGenero = document.getElementById('cbbGenero');
    let txtCelular = document.getElementById('txtCelular');
    let txtEmail = document.getElementById('txtEmail');
    let txtSenha = document.getElementById('txtSenha');

    let btnSalvar = document.getElementById('btnSalvar');
    let self = this;

    btnSalvar.addEventListener('click',function(event){

        event.preventDefault();

        let senha;
        let URL = 'http://patanajanta.test/api';
        let endPoint = `/usuario/atualizar/${dadosUsuario.id}`
        URL+=endPoint;

        if(txtSenha.value.length == 0 ? senha = dadosUsuario.senha : senha = txtSenha.value);

        if(self.validaCampos()){

                Swal.fire({
                    title: 'Aguarde um momento...',
                    text: 'Seus dados estão sendo atualizados.',
                    icon: 'info',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showConfirmButton: false
                });
            
            axios({
                method: 'put',
                url: URL,
                timeout: 20000,
                data: self.montaJSON(sobrenome.value, cbbGenero.options[cbbGenero.selectedIndex].value,
                    txtCelular.value, txtEmail.value, senha)
            })
            .then((resp)=>{

                //REALIZA GET NO BANCO DE DADOS PARA ATUALIZAR LOCAL STORAGE COM NOVOS DADOS DO USUARIO
                let URLDados = `http://patanajanta.test/api/login/${dadosUsuario.CPF}/${senha}`

                axios({
                    method: 'get',
                    url: URLDados,
                    timeout: 20000
                })
                .then((resp)=>{
                    localStorage.setItem('usuario', JSON.stringify(resp.data[0]));

                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Dados atualizados com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                    let currentURL = window.location.href;
                    let domain = currentURL.split("/");

                    window.location.replace(domain[0] + '#/seuespaco');
                })
                
                
            }).catch((error)=>{

                if (error.toString().includes('Network Error') || error.toString().includes('timeout of')) {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'O banco de dados demorou muito para responder. Por favor, tente novamente mais tarde!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }

                Swal.fire({
                    title: 'Erro!',
                    text: error.data.erro,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            })
        }

    });
}

swall = (mensagem) =>{
    Swal.fire({
        title: 'Atenção!',
        text: mensagem,
        icon: 'warning',
        confirmButtonText: 'OK'
    });
}

validaCampos = () => {

    let sobrenome = document.getElementById('sobrenome');
    let cbbGenero = document.getElementById('cbbGenero');
    let txtCelular = document.getElementById('txtCelular');
    let txtEmail = document.getElementById('txtEmail');
    let txtSenha = document.getElementById('txtSenha');
    let txtConfSenha = document.getElementById('txtConfSenha');
    let self = this


    //validação campo sobrenome
    const nomeRegex = /^[a-zA-Z\s]*$/;

    if (sobrenome.value.length == 0) {

        self.swall('O campo indicado não pode ser vazio');
        sobrenome.style.borderColor = "red";
        return false

    } else if (nomeRegex.test(sobrenome.value) == false) {

        self.swall('O campo indicado só aceita letras');
        sobrenome.style.borderColor = "red";
        return false

    } else {
        sobrenome.style.borderColor = "#ced4da"
    }


    // validação genero
    if (cbbGenero.options[cbbGenero.selectedIndex].value == "NULL") {

        self.swall('Selecione uma opção válida no campo indicado');
        cbbGenero.style.borderColor = "red";
        return false

    } else {
        cbbGenero.style.borderColor = "#ced4da"
    }


    // validação celular
    const regexCelular = /^(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})$/;

    if (txtCelular.value.length == 0) {

        self.swall('O campo indicado não pode ser vazio');
        txtCelular.style.borderColor = "red";
        return false

    } else if (regexCelular.test(txtCelular.value) == false) {

        self.swall('Celular inválido');
        txtCelular.style.borderColor = "red";
        return false

    } else {
        txtCelular.style.borderColor = "#ced4da"
    }


    // validação de email
    const regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

    if (txtEmail.value.length == 0) {
        
        self.swall('O campo indicado não pode ser vazio');
        txtEmail.style.borderColor = "red";
        return false

    } else if (regexEmail.test(txtEmail.value) == false) {

        self.swall('Email inválido');
        txtEmail.style.borderColor = "red";
        return false

    } else {
        txtEmail.style.borderColor = "#ced4da"
    }


    //validação senha
    let regexSenha = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

    if (txtSenha.value.length != 0) {
        
        if (regexSenha.test(txtSenha.value) == false) {

            self.swall('A senha deve ter no mínimo 8 digitos, uma letra maiúscula e um número');
            txtSenha.style.borderColor = "red";
            return false
    
        } else {
            txtSenha.style.borderColor = "#ced4da"
        }
    }


    // validação senha
    if (txtConfSenha.value != txtSenha.value) {

        self.swall('As senhas não conferem');
        txtConfSenha.style.borderColor = "red";
        return false

    } else {
        txtConfSenha.style.borderColor = "#ced4da"
    }

    return true
}


    render() {

        return (

            <div className="container formulario-cliente mt-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="titulo-cliente">Editar Cadastro Cliente</h2>
                        <form className='label-form'>
                            <div class="form-group row text-center">
                                <label className="col-2" for="nome">Nome</label>
                                <input name="nome" type="text" className="form-control col-8" id="nome" />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="sobrenome">Sobrenome</label>
                                <input name="sobrenome" type="text" className="form-control col-8" id="sobrenome" />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="cpf">CPF</label>
                                <input name="cpf" type="text" className="form-control col-8" id="cpf" />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="genero">Gênero</label>
                                <select name="genero" className="form-control col-8" id="cbbGenero">
                                    <option value="NULL">Selecione uma opçao</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="dtnasc">Data de Nasc</label>
                                <input name="dataNasc" type="date" className={`form-control dtNascimento-form col-8`}
                                    placeholder="Digite sua data de nascimento" required id='dataNascimento' />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="tel">Telefone</label>
                                <input name="telefone" type="tel" className="form-control tel-form col-8"
                                    placeholder="(00) 00000-0000" required id='txtCelular' />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="email">E-mail</label>
                                <input name="email" type="email" className="form-control email-form col-8" placeholder="Digite um email válido"
                                    required id='txtEmail' />
                            </div>
                            <div class="form-group row text-center">
                                <label className="col-2" for="senha">Senha Nova</label>
                                <input name="senha" type="password" className={`form-control col-8`} name="senha"
                                    placeholder="Digite uma nova senha" required id='txtSenha' />
                            </div>

                            <div class="form-group row text-center">
                                <label className="col-2" for="senha">Confirme Senha</label>
                            <input name="confirmSenha" type="password" className={`form-control confsenha-form col-8`} name="senha1"
                                placeholder="Confirme a senha" required id='txtConfSenha' />
                                </div>
                            <div className="col text-center">
                                <input type="submit" className='btn btn-padrao' id='btnSalvar' value="Salvar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}




