
export default function Footer() {
    return (
    <>
    <footer class="footer main">
            <div class="contact">
                <details>
                <summary> <strong style="line-height: 140%;">Mon Adresse:</strong> </summary>
                <p>Kheireddine</p>
                <p>7 Run Générale Kheireddine</p>
                </details>
                            
                <details>
                <summary> <strong style="line-height: 140%;">E-mail:</strong> </summary>
                <p>jomnihamza@gmail.com</p>		  	
                </details>
                            
                <details>
                <summary> <strong style="line-height: 140%;">Téléphone:</strong> </summary>
                <p>+216 54 739 279</p>
                </details>  
            </div>
        
            <div class="footertab">   
            <center>   
                <table border="1" cellpadding="6" cellspacing="4">
                    <tr>
                        <td>
                            <nav>
                                <a href="#accueil">Accueil</a>
                                <a href="#a propos">À propos</a>
                                <a href="#experience">Expériences</a>
                                <a href="#education">Éducation</a>
                                <a href="#contact">Contact</a>									
                            </nav> 
                        </td>
                        
                        <td>
                            <address id="contact">
                            <a href="mailto:jomnihamza@gmail.com">contactez-moi</a>
                            <a href="tel:21654739279">(216)54 739 279</a>
                            </address>
                        </td>
                        
                        <td>Date de dernière modification 12/07/2022</td>
                    </tr>
                </table>
            </center>
            </div> 
    </footer>     
</>

)
}