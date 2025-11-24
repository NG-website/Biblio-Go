import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

function Footer() {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const accordionSx = {
        mb: 2,
        boxShadow: 2,
        '& .MuiAccordionSummary-root': {
            bgcolor: 'white',
            transition: 'all 0.3s',
            '&:hover': {
                bgcolor: 'orange',
                py:1,
            },
        },
        '&:hover .MuiTypography-root': {
            color: 'white',
        },
        '&:hover .MuiSvgIcon-root':{
            fill:"white"
        },
        '&.Mui-expanded': {
            '& .MuiTypography-root': { color: 'black' },
            '& .MuiSvgIcon-root': { fill: 'white' },
            '& .MuiAccordionSummary-root': { bgcolor: 'orange', py:0 }
        }
    };

    return (
        <Box sx={{ width: '80%', mx: 'auto', p: 2 }}>
            <Typography
                variant="h2"
                align="center"
                sx={{ mb: 4, mt: 3, fontWeight: 600 }}
            >
                Informations et ressources légales
            </Typography>


            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={accordionSx}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    aria-label="Mentions légales"
                >
                    <Typography component="h3" >
                        Mentions légales
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
                        <h3>1. Présentation du site</h3>
                        <p>
                            Le présent site est édité par la <strong>Bibliothèque Municipale de Montfleury</strong> afin de permettre
                            aux usagers de consulter le catalogue en ligne et de réserver des ouvrages.
                        </p>
                        <h3>2. Direction de la publication</h3>
                        <p>
                            <strong>Responsable de la publication :</strong> Mme Claire Dupont, Directrice de la Bibliothèque Municipale de Montfleury.<br />
                            <strong>Webmestre :</strong> Service communication de la Mairie de Montfleury – web@montfleury.fr
                        </p>
                        <h3>3. Hébergement du site</h3>
                        <p>
                            <strong>Hébergeur :</strong> OVH SAS<br />
                            2 rue Kellermann – 59100 Roubaix – France<br />
                            Site web : <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer">www.ovh.com</a>
                        </p>
                        <h3>4. Propriété intellectuelle</h3>
                        <p>
                            Le contenu du site (textes, images, logos, bases de données, etc.) est la propriété exclusive
                            de la Bibliothèque Municipale de Montfleury, sauf mention contraire.
                        </p>
                        <h3>5. Responsabilité</h3>
                        <p>
                            La Bibliothèque s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées sur ce site.
                            Cependant, elle ne peut garantir l’absence totale d’erreurs ou d’omissions et décline toute responsabilité
                            en cas de dommages directs ou indirects résultant de son utilisation.
                        </p>
                        <p><em>Dernière mise à jour : 13 octobre 2025</em></p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Panel 2 : Politique de confidentialité & cookies */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={accordionSx}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    aria-label="Politique de confidentialité et cookies"
                >
                    <Typography component="h3" sx={{ width: '100%', flexShrink: 0, fontWeight: 500 }}>
                        Politique de confidentialité & cookies
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
           
                        <p>
                            La Bibliothèque Municipale de Montfleury s’engage à protéger la vie privée de ses usagers.
                            La présente politique explique comment nous collectons, utilisons et protégeons les informations personnelles,
                            y compris celles liées aux cookies utilisés sur notre site.
                        </p>
                        <h3>1. Données personnelles collectées</h3>
                        <ul>
                            <li>Nom et prénom</li>
                            <li>Adresse e-mail</li>
                            <li>Numéro de lecteur ou identifiant</li>
                            <li>Historique de réservation</li>
                            <li>Données techniques de connexion (adresse IP, navigateur, appareil utilisé)</li>
                        </ul>
                        <h3>2. Finalité de la collecte</h3>
                        <ul>
                            <li>Gérer les réservations et prêts de livres</li>
                            <li>Assurer le suivi des comptes lecteurs</li>
                            <li>Répondre aux demandes d’information</li>
                            <li>Améliorer le fonctionnement du site</li>
                            <li>Garantir la sécurité du service</li>
                        </ul>
                        <h3>3. Destinataires des données</h3>
                        <p>Les données personnelles sont exclusivement destinées à la Bibliothèque Municipale de Montfleury.</p>
                        <h3>4. Durée de conservation</h3>
                        <p>Les données liées aux comptes lecteurs sont conservées pendant la durée d’inscription active, puis supprimées après 12 mois d’inactivité. Les cookies sont conservés jusqu’à 13 mois.</p>
                        <h3>5. Vos droits (RGPD)</h3>
                        <ul>
                            <li>Droit d’accès, de rectification et de suppression de vos données</li>
                            <li>Droit de limitation et d’opposition au traitement</li>
                            <li>Droit de retirer votre consentement à tout moment</li>
                        </ul>
                        <p>Pour exercer vos droits : <strong>Email :</strong> dpo@biblio-montfleury.fr</p>
                        <h3>6. Utilisation des cookies</h3>
                        <ul>
                            <li><strong>Techniques :</strong> fonctionnement du site</li>
                            <li><strong>Audience :</strong> mesure de fréquentation</li>
                            <li><strong>Tiers :</strong> contenus externes (YouTube, Google Maps…)</li>
                        </ul>
                        <p>Gérer vos choix via <a href="/parametres-cookies">Gérer mes cookies</a></p>
                        <p><em>Dernière mise à jour : 13 octobre 2025</em></p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Panel 3 : FAQ */}
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={accordionSx}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    aria-label="FAQ"
                >
                    <Typography component="h3" sx={{ width: '100%', flexShrink: 0, fontWeight: 500 }}>
                        FAQ
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
                    
                        <h3>1. Comment puis-je m'inscrire à la bibliothèque ?</h3>
                        <p>L’inscription est gratuite pour les habitants de Montfleury. Présentez-vous à l’accueil avec pièce d’identité et justificatif de domicile.</p>
                        <h3>2. Comment réserver un livre en ligne ?</h3>
                        <p>Connectez-vous à votre compte, recherchez le livre et cliquez sur “Réserver”.</p>
                        <h3>3. Combien de livres puis-je emprunter ?</h3>
                        <p>5 livres maximum pour 3 semaines, prolongation possible une fois.</p>
                        <h3>4. Comment prolonger un emprunt ?</h3>
                        <p>Via la section “Mes prêts” de votre compte ou à l’accueil / par téléphone.</p>
                        <h3>5. Que faire si j’ai perdu un livre ?</h3>
                        <p>Signalez-le à la bibliothèque. Remboursement ou remplacement possible selon la situation.</p>
                        <h3>6. Puis-je m’inscrire si je n’habite pas Montfleury ?</h3>
                        <p>Oui, avec des frais annuels symboliques (5€ par an).</p>
                        <h3>7. Horaires d’ouverture</h3>
                        <p>
                            <strong>Lundi :</strong> Fermé<br />
                            <strong>Mardi – Vendredi :</strong> 10h – 18h30<br />
                            <strong>Samedi :</strong> 10h – 17h<br />
                            <strong>Dimanche :</strong> Fermé
                        </p>
                        <h3>8. Activités proposées</h3>
                        <p>Ateliers de lecture, clubs jeunesse et expositions. Voir <a href="/evenements">Événements</a>.</p>
                        <h3>9. Contact</h3>
                        <p>Email : contact@biblio-montfleury.fr – Téléphone : 01 23 45 67 89</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Panel 4 : Conditions d’utilisation */}
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={accordionSx}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                    aria-label="Conditions d’utilisation"
                >
                    <Typography component="h3" sx={{ width: '100%', flexShrink: 0, fontWeight: 500 }}>
                        Conditions d’utilisation
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
                     
                        <p>L’accès au site implique l’acceptation de ces conditions.</p>
                        <p>Usage personnel uniquement, pas de perturbation du site.</p>
                        <p>La bibliothèque peut modifier, suspendre ou interrompre le site pour maintenance.</p>
                        <p>Tout usage frauduleux pourra entraîner des poursuites.</p>
                        <p><em>Dernière mise à jour : 13 octobre 2025</em></p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} 
            sx={accordionSx}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5bh-header"
                    aria-label="Accessibilité du site"
                >
                    <Typography component="h3" >
                        Accessibilité du site
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
                        <p>Le site est conçu pour être accessible à tous, compatible avec les technologies d’assistance.</p>
                        <p>Pour signaler un problème d’accessibilité : <a href="mailto:accessibilite@biblio-montfleury.fr">accessibilite@biblio-montfleury.fr</a></p>
                        <p><em>Dernière mise à jour : 13 octobre 2025</em></p>
                    </Typography>
                </AccordionDetails>
            </Accordion>


            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} sx={accordionSx}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6bh-content"
                    id="panel6bh-header"
                    aria-label="Nos engagements"
                >
                    <Typography component="h3" >
                        Nos engagements
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component="div">
                        <ul>
                            <li>📚 Accès libre à la culture pour tous</li>
                            <li>🌿 Respect de l’environnement</li>
                            <li>🤝 Inclusion numérique et sociale</li>
                            <li>🎓 Soutien à l’éducation et à la lecture publique</li>
                        </ul>
                        <p><em>Dernière mise à jour : 13 octobre 2025</em></p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </Box>
    );
}

export default Footer;
