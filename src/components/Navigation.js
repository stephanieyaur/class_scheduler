import { signInWithGoogle, signOut, useAuthState } from '../utility/firebase';
import '../styles/Navigation.css';

const terms = ['Fall', 'Winter', 'Spring'];

const SignInButton = () => (
    <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);
  
const SignOutButton = () => (
    <button className="ms-auto btn btn-dark" onClick={signOut}>Sign out</button>
);

const Navigation = ({ title, selectedTerm, setSelectedTerm, profile }) => {
    return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light nav">
        <a class="navbar-brand" id="title">{title}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            {
                terms.map(term => 
                (
                    <a class={`nav-item nav-link navlink ${selectedTerm === term ? 'active' : ''}`} onClick={() => setSelectedTerm(term)}>{term}</a>
                )
                )
            }
            </div>
        </div>
        {profile?.user ? <p class="ms-auto" id="welcome">Welcome, {profile.user.displayName}</p> : null}
        {profile.user ? <SignOutButton /> : <SignInButton />}
    </nav>
)}   

export default Navigation;