import React from 'react'
import '../Header/header.css'
import Logo from '../../images/logo.png'
import Lupa from '../../images/lupa.png'
import Cart from '../../images/cart.png'
import User from '../../images/user.png'

export default props =>
<div className='row header'>
    <div className="col-12 col-sm-2 text-center mt-2">
        <a href="home.html"><img src={Logo} width="170px"/></a>
    </div>
    <div className="col-12 col-sm-7 text-center">
        <form className="form">
            <input className="form-control mr-2 mb-1 mt-4 searchBox" type="search" placeholder="Procure produtos para seu cachorro ou gato" aria-label="Search"/>
            <button className="btn btn-search" type="submit">
                <img src={Lupa} width="22px"/>
            </button>
        </form>
    </div>
    <div class="col-12 col-sm-3">
        <div class="row">
            <div className="col-6 text-center carrinho mt-3">
                <a href="carrinho.html" style={{color: '#b7773f'}}><img src={Cart} className="img-fluid" width="33px"/>
                <h6 className='titulo-carrinho'>Meu carrinho</h6></a>
            </div>
            <div class="col-6 text-center mt-4">
                <a href="login.html">
                    <img src={User} width="30px"/>
                </a>
                <div class="container-fluid" style={{display: 'block'}}>
                    <ul class="nav d-flex justify-content-center">
                        <li class="nav-item dropdown">
                            <a class="nav-link linksNavTitulo" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                <small style={{display: 'inline-block'}}>Entre ou Cadastre-se</small>
                            </a>
                            <div class="dropdown-menu mr-2">
                                <a class="dropdown-item linkNav" href="historico-pedido.html">Pedidos</a>
                                <a class="dropdown-item linkNav" href="#">Sair</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>