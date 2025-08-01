import { useState } from 'react'
import { Link } from "react-router-dom";
import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';


function HeaderComposant() {
    return (
        <div className='headernav'>
            <div>
                <h1>MarketPlace</h1>
            </div>
            
            <div>
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Accueil</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/boutique">Boutique</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Rechercher un produit</a>
                    </li>
                    <div className='connect m-2'>
                        <Link to="" className=''><User /></Link>
                    </div>
                    
                    
                </ul>
                
            </div>
                
            
        </div>
    )
}

export default HeaderComposant;