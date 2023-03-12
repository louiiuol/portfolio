import { Home, Presentation, Projects } from "./views";
import { Profil, Experiences, Skills } from "./views/presentation";

export const Routes = {
    accueil: {name: 'Accueil', url: '/', exact: true, component: Home, routes: []},
    presentation: { name: 'Présentation', url: '/presentation', component: Presentation, exact: false, routes: [
            { name: 'Profil', url: 'profil', component: Profil, exact: false },
            { name: 'Expériences', url: 'experiences', component: Experiences, exact: false },
            { name: 'Compétences', url: 'competences', component: Skills, exact: false }
    ]},
    works: {name: 'Projets', url: '/projets', component: Projects, exact: false, routes: []}
}