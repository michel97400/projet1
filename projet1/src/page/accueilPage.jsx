import { useNavigate } from "react-router";
import Boutique from "./boutiquePage";

function Accueil() {
    const navigate = useNavigate();

    function redirectBoutique() {
        
        return navigate("/boutique")
    }

    return (
        <main className="main" role="main">
            <section className="main-text" aria-labelledby="accueil-heading">
                <h1 id="accueil-heading" className="sr-only">
                    Bienvenue sur notre boutique
                </h1>
                
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, sapiente debitis eos voluptates quasi excepturi reprehenderit, aspernatur, assumenda facere molestias labore incidunt possimus fugit pariatur at quibusdam deserunt dolores velit.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate quis dignissimos repudiandae soluta fuga aut tempore, molestiae tempora ea accusamus. Commodi tempora exercitationem vitae, quod rerum asperiores dolorum a! Ducimus!
                </p>

                <button
                    onClick={redirectBoutique}
                    role="boutique"
                    className="buttonexplorer bg-primary text-white"
                    aria-label="Explorer la boutique en ligne"
                >
                    Explorer la boutique
                </button>
            </section>
        </main>
    );
}

export default Accueil;
