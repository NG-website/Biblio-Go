-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 25 nov. 2025 à 00:54
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_bibliotheque`
--

-- --------------------------------------------------------

--
-- Structure de la table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `authors`
--

INSERT INTO `authors` (`id`, `firstname`, `lastname`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Arthur', 'Conan Doyle', 'Auteur britannique, créateur de Sherlock Holmes.', '2025-10-17 10:43:59', '2025-11-24 12:11:34'),
(2, 'Agatha', 'Christie', 'Auteure britannique, reine du roman policier.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(3, 'Stieg', 'Larsson', 'Auteur suédois, connu pour la trilogie Millénium.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(4, 'Joël', 'Dicker', 'Écrivain suisse contemporain, auteur de romans policiers.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(5, 'Harlan', 'Coben', 'Auteur américain de thrillers et romans policiers.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(6, 'Bernard', 'Minier', 'Auteur français de romans policiers et thrillers.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(7, 'Pierre', 'Lemaitre', 'Écrivain français, prix Goncourt, spécialiste du polar.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(8, 'Stanislas-André', 'Steeman', 'Auteur belge de romans policiers.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(9, 'Friedrich', 'Dürrenmatt', 'Écrivain suisse, connu pour ses thrillers et pièces.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(10, 'Frank', 'Herbert', 'Auteur américain, célèbre pour son cycle Dune.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(11, 'Isaac', 'Asimov', 'Auteur américain, pionnier de la science-fiction et des robots.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(12, 'William', 'Gibson', 'Écrivain américain, inventeur du cyberpunk.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(13, 'René', 'Barjavel', 'Écrivain français, maître de la science-fiction.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(14, 'George', 'Orwell', 'Auteur britannique, connu pour 1984 et La Ferme des animaux.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(15, 'Aldous', 'Huxley', 'Écrivain britannique, auteur du Meilleur des mondes.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(16, 'Dan', 'Simmons', 'Auteur américain de science-fiction et fantasy.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(17, 'Philip K.', 'Dick', 'Auteur américain, maître de la SF philosophique et dystopique.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(18, 'Stanislas', 'Lem', 'Écrivain polonais, auteur de Solaris.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(19, 'Hergé', NULL, 'Auteur belge, créateur des aventures de Tintin.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(20, 'René', 'Goscinny', 'Scénariste français, co-créateur d’Astérix et Lucky Luke.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(21, 'Albert', 'Uderzo', 'Dessinateur français, co-créateur d’Astérix.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(22, 'Morris', NULL, 'Dessinateur belge, créateur de Lucky Luke.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(23, 'Hugo', 'Pratt', 'Auteur italien, créateur de Corto Maltese.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(24, 'Art', 'Spiegelman', 'Auteur américain, créateur de Maus.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(25, 'Marjane', 'Satrapi', 'Auteure iranienne, créatrice de Persepolis.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(26, 'François', 'Schuiten', 'Dessinateur belge, co-créateur des Cités Obscures.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(27, 'Benoît', 'Peeters', 'Scénariste français, co-créateur des Cités Obscures.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(28, 'Jean-Michel', 'Charlier', 'Scénariste belge, co-créateur de Blueberry.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(29, 'Jean', 'Giraud', 'Dessinateur français, connu sous le nom de Moebius.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(30, 'Christophe', 'Arleston', 'Scénariste français, créateur de Lanfeust de Troy.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(31, 'Didier', 'Tarquin', 'Dessinateur français, illustrateur de Lanfeust de Troy.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(32, 'Zep', NULL, 'Auteur suisse, créateur de Titeuf.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(33, 'J.K.', 'Rowling', 'Auteure britannique, créatrice de la saga Harry Potter.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(34, 'Antoine de', 'Saint-Exupéry', 'Écrivain et aviateur français, auteur du Petit Prince.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(35, 'Roald', 'Dahl', 'Auteur britannique de littérature jeunesse et fantastique.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(36, 'Philip', 'Pullman', 'Écrivain britannique, auteur de la trilogie À la croisée des mondes.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(37, 'Lemony', 'Snicket', 'Nom de plume de Daniel Handler, auteur jeunesse.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(38, 'Christopher', 'Paolini', 'Auteur américain, créateur de la série Eragon.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(39, 'Eoin', 'Colfer', 'Auteur irlandais, créateur de la série Artemis Fowl.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(40, 'Rudyard', 'Kipling', 'Écrivain britannique, auteur du Livre de la jungle.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(41, 'Neil', 'Gaiman', 'Auteur britannique de fantasy et littérature jeunesse.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(42, 'Ken', 'Follett', 'Auteur britannique, spécialisé dans les romans historiques.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(43, 'Alexandre', 'Dumas', 'Écrivain français, auteur de La Reine Margot et Les Trois Mousquetaires.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(44, 'Émile', 'Zola', 'Écrivain français, chef de file du naturalisme.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(45, 'Henryk', 'Sienkiewicz', 'Écrivain polonais, prix Nobel, auteur de Quo Vadis ?', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(46, 'Léon', 'Tolstoï', 'Écrivain russe, auteur de Guerre et Paix.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(47, 'Victor', 'Hugo', 'Écrivain français, auteur de Notre-Dame de Paris et Les Misérables.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(48, 'Jean', 'Giono', 'Écrivain français, auteur du Hussard sur le toit.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(49, 'Michel', 'Peyramaure', 'Écrivain français, spécialiste du roman historique.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(50, 'Marcel', 'Proust', 'Écrivain français, auteur de À l’ombre des jeunes filles en fleurs.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(51, 'Stephen', 'Hawking', 'Physicien théoricien britannique, auteur de vulgarisation scientifique.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(52, 'Carl', 'Sagan', 'Astronome américain, vulgarisateur scientifique.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(53, 'Richard', 'Dawkins', 'Biologiste britannique et auteur scientifique.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(54, 'Brian', 'Greene', 'Physicien américain, spécialiste de la théorie des cordes.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(55, 'Jacques', 'Monod', 'Biologiste français, prix Nobel, auteur scientifique.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(56, 'Thomas S.', 'Kuhn', 'Philosophe des sciences américain, auteur de La Structure des révolutions scientifiques.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(57, 'Nassim Nicholas', 'Taleb', 'Essayiste et statisticien, auteur de Le Cygne noir.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(58, 'Carlo', 'Rovelli', 'Physicien théoricien italien, auteur de vulgarisation scientifique.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(59, 'Yuval Noah', 'Harari', 'Historien israélien, auteur de Sapiens.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(60, 'Ernst', 'Gombrich', 'Historien de l’art autrichien, auteur de Histoire de l’art et Art et illusion.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(61, 'Giorgio', 'Vasari', 'Peintre et historien italien, auteur de La Vie des artistes.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(62, 'Johannes', 'Itten', 'Peintre et théoricien de l’art suisse, auteur de L’art de la couleur.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(63, 'André', 'Malraux', 'Écrivain et ministre français, auteur de Le Musée imaginaire.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(64, 'Paul', 'Klee', 'Peintre et théoricien suisse-allemand.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(65, 'Henri', 'Focillon', 'Historien de l’art français, auteur de L’esprit des formes.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(66, 'John', 'Berger', 'Critique d’art britannique, auteur de Ways of Seeing.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(67, 'Georges', 'Didi-Huberman', 'Historien de l’art et philosophe français.', '2025-10-17 10:43:59', '2025-10-17 10:43:59'),
(69, 'Nicolas', 'GERARD', 'aaaaaaaaaaaaaaaaaaaaa', '2025-11-24 12:06:58', '2025-11-24 12:06:58');

-- --------------------------------------------------------

--
-- Structure de la table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `stock` bigint(20) DEFAULT NULL,
  `note` float DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `borrow` bigint(20) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `books`
--

INSERT INTO `books` (`id`, `name`, `stock`, `note`, `description`, `borrow`, `createdAt`, `updatedAt`, `authorId`, `categoryId`) VALUES
(1, 'Le Chien des Baskerville', 9, 4.4, 'Dans cette enquête emblématique de Sherlock Holmes, le détective doit élucider la mort mystérieuse de Sir Charles Baskerville, retrouvée sans vie dans la lande du Devon. Une légende familiale parle d’un chien démoniaque rôdant autour du manoir, mais Holmes soupçonne une explication plus rationnelle. Entre brumes inquiétantes, héritages troubles et manipulations savamment orchestrées, l’enquête plonge le lecteur dans une atmosphère gothique où la frontière entre superstition et réalité semble se brouiller.', 420, '2022-01-15 10:30:00', '2025-11-24 12:17:24', 1, 1),
(2, 'Le Crime de l’Orient-Express', 8, 4.4, 'Hercule Poirot se retrouve contraint de mener l’une de ses enquêtes les plus célèbres lorsque le prestigieux train Orient-Express est immobilisé par la neige et qu’un voyageur est découvert assassiné. Confronté à un groupe de passagers aux identités et aux témoignages contradictoires, le détective doit déjouer mensonges, faux-semblants et secrets enfouis. Avec un décor confiné et une tension croissante, Agatha Christie tisse un huis clos d’une précision redoutable qui explore la justice, la vengeance et la morale.', 480, '2021-07-10 09:00:00', '2025-11-24 11:07:18', 2, 1),
(3, 'Dix petits nègres', 12, 4.6, 'Dix personnes, invitées sous de faux prétextes sur une île isolée, se retrouvent accusées de crimes passés par une voix mystérieuse. Rapidement, elles comprennent qu’un tueur se cache parmi elles, appliquant méthodiquement les vers d’une comptine macabre. Agatha Christie orchestre un suspense implacable où la paranoïa monte et où chacun devient suspect et victime potentielle. Ce roman, considéré comme son chef-d’œuvre, explore la culpabilité, la justice personnelle et la fatalité d’une manière terrifiante et inoubliable.', 520, '2020-11-25 14:15:00', '2021-03-10 16:20:00', 2, 1),
(4, 'Millenium Les hommes qui n aimaient pas les femmes', 5, 4.2, 'Le journaliste Mikael Blomkvist accepte de rouvrir une affaire vieille de plusieurs décennies : la disparition d’Harriet Vanger, héritière d’une riche famille industrielle. Il collabore avec Lisbeth Salander, hackeuse brillante au passé traumatique, dont l’intelligence et la rage contenue bouleversent l’enquête. Ensemble, ils mettent au jour une histoire de violences, de corruption et de secrets enfouis. Le roman mêle thriller politique, enquête criminelle et drame social tout en dressant le portrait saisissant d’une héroïne devenue emblématique.', 320, '2019-05-12 08:45:00', '2025-11-11 10:30:48', 3, 1),
(5, 'La Vérité sur l’Affaire Harry Quebert', 7, 4.3, 'Lorsqu’un célèbre écrivain est accusé du meurtre d’une adolescente disparue depuis plus de trente ans, son ancien élève Marcus Goldman décide de mener sa propre enquête pour le disculper. Au fil de ses recherches, il découvre une petite ville américaine rongée par les secrets et les hypocrisies. Le roman explore la frontière entre vérité, mémoire et manipulation, tout en plongeant dans la création littéraire et la médiatisation. Alternant révélations et faux-pistes, l’intrigue maintient un suspense constant jusqu’à son dénouement.', 280, '2020-02-20 11:00:00', '2025-11-11 10:27:56', 4, 1),
(6, 'Ne le dis à personne', 9, 4.1, 'Huit ans après le meurtre brutal de sa femme, David Beck reçoit un message troublant semblant provenir d’elle. Tandis que les indices le poussent à croire qu’elle pourrait être encore vivante, il devient la cible d’une machination implacable mêlant criminels, policiers corrompus et secrets longtemps enfouis. Harlan Coben signe un thriller haletant centré sur la perte, l’espoir et la vérité, où les rebondissements s’enchaînent et où rien n’est jamais aussi simple qu’il n’y paraît.', 300, '2018-09-10 10:00:00', '0000-00-00 00:00:00', 5, 1),
(7, 'Glacé', 6, 3.9, 'Au cœur des Pyrénées, un cheval retrouvé décapité sur une plateforme d’abattoir désaffectée mène le commandant Servaz sur la piste d’un meurtrier manipulateur. L’enquête se déroule dans un décor glacial, à proximité d’un hôpital psychiatrique où est interné un tueur notoire qui semble étrangement lié à l’affaire. Entre ambiance oppressante, tensions psychologiques et secrets du passé, ce thriller plonge le lecteur dans une spirale de peur et d’incertitude.', 240, '2021-03-03 12:45:00', '2021-12-01 09:00:00', 6, 1),
(8, 'Alex', 0, 4, 'Lorsque la jeune Alex est enlevée et séquestrée dans des conditions terrifiantes, la police pense assister à un cas classique de kidnapping. Mais très vite, l’affaire bascule et révèle une femme complexe, victime et bourreau à la fois. Le commandant Verhoeven découvre une vérité bien plus sombre que prévu, mêlant vengeance, traumatismes et violence. Pierre Lemaitre construit un thriller puissant, fondé sur des retournements narratifs saisissants qui bouleversent les certitudes du lecteur.', 260, '2019-08-20 14:00:00', '0000-00-00 00:00:00', 7, 1),
(9, 'L assassin habite au 21', 3, 3.8, 'Un mystérieux tueur signant ses crimes du nom de « Monsieur Smith » sème la panique à Londres. L’inspecteur Wens est chargé de l’enquête, qui le conduit dans une pension où se côtoient des personnages excentriques, tous plus suspects les uns que les autres. Entre humour noir, ambiance policière classique et rebondissements inattendus, ce roman emblématique de Stanislas-André Steeman reprend les codes du whodunit tout en y ajoutant une touche d’ironie savoureuse.', 120, '2017-11-11 16:30:00', '2018-01-20 10:00:00', 8, 1),
(10, 'La Promesse', 5, 4.2, 'Lors d’une enquête qui tourne mal, un policier promet à une fillette dont la mère a été assassinée qu’il trouvera le coupable. Dévasté par son incapacité à tenir parole, il sombre dans l’obsession et la culpabilité. Au fil des années, il continue seul la traque du tueur, malgré les obstacles et l’incompréhension de son entourage. Ce récit sombre explore la fragilité humaine, les dérives de la justice personnelle et le poids écrasant des promesses impossibles à tenir.', 180, '2020-06-01 09:15:00', '0000-00-00 00:00:00', 9, 1),
(11, 'Dune', 9, 4.9, 'Sur la planète désertique Arrakis, seule source de l’Épice, une substance rare qui permet de voyager dans l’espace, le jeune Paul Atréides devient le centre d’un conflit politique et mystique. Trahi, exilé parmi les Fremen, il doit apprendre à maîtriser un destin qui dépasse l’entendement. « Dune » mêle écologie, pouvoir, religion et philosophie dans un univers d’une richesse exceptionnelle. Ce roman fondateur de la science-fiction moderne fascine par son ampleur et la profondeur de ses thèmes.', 450, '2019-01-10 11:30:00', '2025-11-24 22:53:19', 10, 2),
(12, 'Fondation', 8, 4.8, 'Hari Seldon, génial psychohistorien, prévoit scientifiquement l’effondrement imminent de l’Empire galactique. Pour préserver le savoir humain, il crée la Fondation, un projet destiné à raccourcir les siècles de chaos à venir. À travers intrigues politiques, crises successives et manipulations de grande ampleur, Isaac Asimov invente un univers visionnaire où la science devient un outil de prédiction et de pouvoir. Ce classique interroge la destinée humaine, la liberté et l’influence des élites.', 400, '2018-05-20 12:00:00', '0000-00-00 00:00:00', 11, 2),
(13, 'Neuromancien', 7, 4.5, 'Case, pirate informatique déchu, est recruté pour une mission impossible dans un futur dominé par les mégacorporations et les intelligences artificielles. Entre cyberspace, implants augmentés et sociétés déshumanisées, le récit plonge dans une esthétique cyberpunk devenue culte. William Gibson explore les liens entre technologie, identité et pouvoir, tout en offrant un thriller nerveux et visionnaire qui a redéfini la science-fiction moderne.', 280, '2021-03-18 09:45:00', '2021-07-10 13:20:00', 12, 2),
(14, 'La Nuit des temps', 6, 4.6, 'Lorsqu’une équipe scientifique découvre dans l’Antarctique une civilisation ensevelie depuis des millénaires, le monde entier retient son souffle. Au cœur de la glace repose un couple figé dans un sommeil artificiel, héritiers d’un monde disparu. Le roman alterne exploration scientifique et récit d’amour tragique, questionnant les choix de société, la guerre et la fragilité des civilisations. Barjavel mêle poésie, science-fiction et émotion dans un récit intemporel.', 220, '2020-08-12 08:30:00', '0000-00-00 00:00:00', 13, 2),
(15, '1984', 11, 4.9, 'Dans un régime totalitaire où Big Brother surveille chaque individu, Winston Smith tente de préserver sa liberté de pensée. Manipulation du langage, réécriture de l’Histoire et contrôle mental sont les armes d’un pouvoir oppressif qui broie tout esprit critique. À travers son héroïsme fragile, George Orwell questionne la vérité, la liberté et les dérives politiques. Ce roman visionnaire reste l’une des dystopies les plus marquantes et effrayantes du XXe siècle.', 500, '2017-09-01 10:00:00', '2025-11-24 22:10:53', 14, 2),
(16, 'Le Meilleur des mondes', 9, 4.7, 'Dans une société future où les individus sont conditionnés dès leur naissance pour occuper une place prédéterminée, le bonheur est obligatoire et les émotions réelles sont bannies. Lorsque Bernard Marx commence à remettre en question ce système parfaitement contrôlé, il découvre l’ampleur des sacrifices nécessaires pour maintenir cette stabilité. Aldous Huxley signe une dystopie glaçante sur la manipulation biologique, le conformisme et la perte de liberté individuelle.', 350, '2019-12-05 14:15:00', '0000-00-00 00:00:00', 15, 2),
(17, 'Hyperion', 5, 4.4, 'Dans un futur lointain, sept pèlerins se rendent sur la planète Hyperion, chacun portant un secret lié au mystérieux monstre appelé le Gritche. Leur voyage devient une confession collective mêlant politique galactique, poésie, amour et tragédie. Dan Simmons livre une œuvre foisonnante, inspirée à la fois de la mythologie, de la littérature classique et de la science-fiction moderne. Chaque récit apporte une pièce essentielle à une fresque à la fois épique et profondément humaine.', 250, '2020-01-20 16:00:00', '2020-12-10 09:30:00', 16, 2),
(18, 'Ubik', 4, 4.3, 'Dans un monde où les pouvoirs psychiques et la cryonie modifient les frontières de la réalité, un groupe d’employés se retrouve pris dans une succession d’événements impossibles après une attaque mystérieuse. Le temps se dérègle, les objets régressent et la mort semble devenir relative. Philip K. Dick explore la nature du réel, la perception et l’identité dans un récit labyrinthique, aussi fascinant que déstabilisant.', 340, '2021-06-10 10:45:00', '0000-00-00 00:00:00', 17, 2),
(19, 'Solaris', 3, 4.5, 'Un scientifique envoyé sur la planète recouverte d’un océan intelligent découvre que celui-ci matérialise les souvenirs et les traumatismes des humains. Confronté à une apparition liée à son passé, il doit affronter sa propre culpabilité tout en tentant de comprendre cette entité incompréhensible. Lem explore les limites de la communication et la difficulté de comprendre un véritable extraterrestre dans un récit profondément introspectif.', 200, '2018-11-11 12:30:00', '2019-03-15 14:20:00', 18, 2),
(20, 'Les Robots', 8, 4.2, 'Ce recueil de nouvelles pose les célèbres Trois Lois de la robotique et explore leur application à travers une série d’histoires où humains et robots coexistent parfois harmonieusement, parfois dans l’incompréhension. Asimov s’interroge sur l’éthique, la conscience artificielle et les responsabilités liées à la technologie. Chaque récit propose un paradoxe ou un problème moral, bâtissant peu à peu une réflexion toujours moderne sur l’intelligence artificielle.', 300, '2019-04-01 09:00:00', '0000-00-00 00:00:00', 11, 2),
(21, 'Tintin au Tibet', 10, 4.8, 'Tintin apprend qu’un ami cher, Tchang, est porté disparu dans l’Himalaya après un terrible accident d’avion. Malgré les avertissements et le danger, le jeune reporter décide de partir à sa recherche, accompagné de Milou et de quelques fidèles compagnons. L’aventure mêle exploration périlleuse, avalanches, rencontres inattendues et courage face à l’adversité. Hergé y développe un récit émouvant sur l’amitié, la persévérance et le dépassement de soi, tout en conservant son style graphique et narratif distinctif.', 480, '2017-05-10 10:00:00', '2025-11-11 15:51:38', 19, 3),
(22, 'Astérix et Cléopâtre', 9, 4.7, 'Astérix et Obélix se rendent en Égypte pour aider Cléopâtre à construire un somptueux palais en un temps record, défi lancé par César. Entre ingénieurs farfelus, chantiers spectaculaires et tours imprévues, le duo gallo-romain multiplie les exploits et les ruses. René Goscinny et Albert Uderzo livrent une aventure pleine d’humour, de références historiques et de jeux de mots, où la satire et l’esprit comique sont au service d’une intrigue dynamique et enlevée.', 420, '2018-08-15 09:30:00', '0000-00-00 00:00:00', 20, 3),
(23, 'Lucky Luke La diligence', 7, 4.5, 'Lucky Luke doit escorter une diligence transportant des passagers variés à travers l’Ouest sauvage, affrontant bandits et dangers imprévus sur la route. Chaque étape devient l’occasion d’aventures, de malentendus et de scènes comiques où le héros tire plus vite que son ombre. Morris, avec humour et précision graphique, nous plonge dans l’univers western, mêlant action, satire et personnages hauts en couleur.', 380, '2019-02-20 11:45:00', '2025-11-11 15:30:40', 21, 3),
(24, 'Corto Maltese', 5, 4.6, 'Corto Maltese, marin et aventurier, parcourt le monde au début du XXe siècle, mêlant exploration, énigmes et rencontres avec des figures historiques ou mythiques. Chaque récit est un voyage poétique et philosophique, où l’aventure sert de prétexte à la réflexion sur l’amitié, la loyauté et le destin. Hugo Pratt mêle avec finesse l’Histoire, la fiction et une atmosphère souvent mélancolique mais toujours captivante.', 220, '2020-03-15 08:30:00', '0000-00-00 00:00:00', 23, 3),
(25, 'Maus', 6, 4.9, 'Art Spiegelman raconte l’histoire de son père survivant de l’Holocauste sous la forme d’une bande dessinée où les Juifs sont représentés en souris et les nazis en chats. Ce récit puissant explore la mémoire, le traumatisme et la difficulté de transmettre un vécu aussi lourd. La relation entre le fils et le père, ainsi que les détails historiques, rendent l’œuvre à la fois intime et universelle, une lecture bouleversante et inoubliable.', 280, '2021-01-12 14:15:00', '2021-06-10 16:00:00', 24, 3),
(26, 'Persepolis', 7, 4.7, 'Marjane Satrapi raconte son enfance en Iran pendant la révolution islamique, oscillant entre traditions, répression et aspirations personnelles. À travers des illustrations simples et expressives, le récit aborde la perte de l’innocence, l’exil et la résistance individuelle face aux contraintes sociales et politiques. « Persepolis » est un témoignage poignant, alliant humour, émotion et réflexion sur la liberté et l’identité.', 300, '2019-09-10 12:00:00', '0000-00-00 00:00:00', 25, 3),
(27, 'Les Cités obscures', 4, 4.5, 'Dans un univers parallèle mystérieux, les Cités obscures présentent des villes à l’architecture impossible et à la société énigmatique. Chaque album explore un lieu et une intrigue distincts, mêlant fantastique, mystère et réflexion philosophique. François Schuiten et Benoît Peeters créent un monde riche, visuellement spectaculaire et narrativement complexe, où l’exploration de l’espace urbain devient un voyage intellectuel autant qu’esthétique.', 160, '2018-04-20 10:30:00', '2018-10-10 09:00:00', 26, 3),
(28, 'Blueberry', 3, 4.3, 'Le lieutenant Mike Blueberry, officier de l’armée américaine, vit des aventures dans l’Ouest sauvage entre Indiens, bandits et conspirations militaires. Les récits, très documentés historiquement, mêlent action, suspense et psychologie des personnages. Jean Giraud, alias Moebius, déploie un graphisme réaliste et détaillé qui transporte le lecteur dans un Far West authentique, à la fois brutal et fascinant.', 200, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 28, 3),
(29, 'Lanfeust de Troy', 5, 4.4, 'Dans le monde fantastique de Troy, Lanfeust, jeune forgeron doté d’un pouvoir magique unique, se lance dans des aventures épiques mêlant humour, amitié et créatures extraordinaires. Chaque épisode propose des énigmes, des combats et des rencontres surprenantes, le tout dans un univers inventif où magie et technologie coexistent. L’auteur, Arleston, réussit à créer une série captivante, accessible et pleine de rebondissements.', 220, '2020-06-01 15:00:00', '2020-12-20 10:00:00', 30, 3),
(30, 'Titeuf', 8, 4.2, 'Titeuf, petit garçon curieux et espiègle, raconte son quotidien à l’école, en famille et avec ses amis. Ses réflexions souvent naïves mais pleines d’humour dévoilent avec acuité les préoccupations de l’enfance et de l’adolescence. Zep mêle situations comiques, dialogues percutants et tendresse, offrant une bande dessinée drôle, touchante et universelle qui séduit enfants et adultes.', 320, '2021-08-10 09:45:00', '0000-00-00 00:00:00', 32, 3),
(31, 'Harry Potter à l’école des sorciers', 15, 4.9, 'Harry Potter, un jeune orphelin élevé par son oncle et sa tante, découvre qu’il est en réalité un sorcier et est invité à rejoindre l’école de sorcellerie de Poudlard. Là, il se fait des amis fidèles, apprend la magie et affronte des dangers mystérieux liés à un sorcier maléfique ayant assassiné ses parents. J.K. Rowling mêle humour, aventure et suspense dans un univers foisonnant où l’amitié, le courage et la découverte de soi sont au cœur de l’intrigue.', 850, '2017-09-01 10:00:00', '2025-11-11 15:30:10', 33, 4),
(32, 'Le Petit Prince', 12, 4.8, 'Le Petit Prince, venant d’une petite planète, voyage à travers l’univers et rencontre différents personnages symbolisant des aspects de la nature humaine. Antoine de Saint-Exupéry aborde avec poésie et simplicité des thèmes profonds tels que l’amitié, l’amour, la solitude et le sens de la vie, dans un récit à la fois philosophique et accessible aux enfants et aux adultes.', 650, '2018-02-15 09:30:00', '0000-00-00 00:00:00', 34, 4),
(33, 'Matilda', 10, 4.7, 'Matilda Wormwood, petite fille surdouée et passionnée de lecture, grandit dans une famille qui la sous-estime. Grâce à ses pouvoirs télékinésiques et à l’aide de son institutrice Miss Honey, elle affronte les injustices et découvre le pouvoir de la connaissance et de la bienveillance. Roald Dahl mêle humour, fantaisie et messages sur l’éducation et la justice, dans une histoire captivante pour jeunes lecteurs et adultes.', 480, '2019-05-10 11:45:00', '2020-01-20 10:15:00', 35, 4),
(34, 'Les Royaumes du Nord', 8, 4.6, 'Lyra Belacqua, jeune orpheline vivant à Oxford, découvre un complot impliquant des enfants kidnappés et une mystérieuse substance appelée la Poussière. Elle entreprend un voyage dangereux vers le Nord, accompagnée de créatures étranges et de compagnons fidèles. Philip Pullman construit un univers riche mêlant fantasy, réflexion philosophique et suspense, qui interroge la liberté, le courage et la vérité.', 380, '2020-03-15 08:30:00', '0000-00-00 00:00:00', 36, 4),
(35, 'Charlie et la chocolaterie', 7, 4.5, 'Charlie Bucket, un garçon pauvre, gagne l’accès à la célèbre chocolaterie de Willy Wonka avec quelques autres enfants. Chaque visiteur découvre les merveilles de l’usine mais subit aussi les conséquences de son comportement. Roald Dahl offre une aventure magique et gourmande, pleine d’humour, de fantaisie et de leçons de morale sur l’humilité, l’obéissance et la curiosité.', 480, '2021-01-12 14:15:00', '2021-06-10 16:00:00', 35, 4),
(36, 'Les Désastreuses Aventures des orphelins Baudelaire', 6, 4.4, 'Les orphelins Baudelaire, après la mort de leurs parents, doivent affronter le comte Olaf, qui tente de s’emparer de leur héritage. Chaque tome raconte les ruses et dangers auxquels ils sont confrontés, mêlant humour noir, mystère et intrigues complexes. Lemony Snicket crée un univers original où intelligence, courage et solidarité permettent aux enfants de survivre face aux adultes malveillants.', 320, '2019-09-10 12:00:00', '0000-00-00 00:00:00', 37, 4),
(37, 'Eragon', 5, 4.3, 'Eragon, jeune fermier, découvre un œuf de dragon et devient le dernier Dragonier. Il se lance dans une quête pour lutter contre un empire tyrannique, accompagné de créatures fantastiques et de mentors sages. Christopher Paolini mêle aventure, magie et lutte entre le bien et le mal, créant un monde riche et immersif qui captive les jeunes lecteurs et amateurs de fantasy.', 300, '2018-04-20 10:30:00', '2018-10-10 09:00:00', 38, 4),
(38, 'Artemis Fowl', 4, 4.2, 'Artemis Fowl, jeune génie criminel, décide d’enlever une fée pour obtenir une rançon en or. Mais il se heurte à un monde féerique technologiquement avancé et à des créatures magiques bien plus rusées que prévu. Eoin Colfer construit un récit mêlant humour, stratégie, aventure et magie, où l’intelligence du héros se mesure à son sens moral et à ses choix.', 270, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 39, 4),
(39, 'Le Livre de la jungle', 7, 4.6, 'Mowgli, un garçon élevé par des loups dans la jungle indienne, apprend à survivre grâce aux enseignements de Baloo et de Bagheera. Entre rencontres avec des animaux dangereux, amitiés et leçons de vie, Rudyard Kipling raconte une aventure initiatique où la nature et l’instinct sont au cœur de l’apprentissage. Le récit explore l’adaptation, le courage et l’équilibre entre l’homme et son environnement.', 350, '2020-06-01 15:00:00', '2020-12-20 10:00:00', 40, 4),
(40, 'Coraline', 3, 4.5, 'Coraline découvre une porte secrète menant à un monde parallèle où ses parents sont apparemment parfaits. Mais tout n’est qu’illusion et elle doit affronter des dangers terrifiants pour sauver sa famille et retrouver sa réalité. Neil Gaiman offre un conte sombre et fascinant sur le courage, l’ingéniosité et la confrontation aux peurs enfantines, avec un style à la fois poétique et captivant.', 420, '2021-08-10 09:45:00', '0000-00-00 00:00:00', 41, 4),
(41, 'Les Piliers de la Terre', 10, 4.9, 'Au XIIe siècle en Angleterre, la construction d’une cathédrale devient le centre de vies entremêlées : maçons, nobles, religieux et paysans se croisent dans une fresque épique. Ken Follett dépeint avec minutie l’époque médiévale, mêlant passion, intrigue politique et romance. L’architecture devient un moteur narratif qui illustre ambitions, trahisons et espoirs humains.', 400, '2017-05-10 10:00:00', '2018-07-20 11:00:00', 42, 5),
(42, 'Un monde sans fin', 8, 4.8, 'Suite des Piliers de la Terre, ce roman suit la descendance des personnages originaux à Kingsbridge, deux siècles plus tard. Entre épidémies, luttes de pouvoir et innovations techniques, les habitants doivent faire face aux bouleversements du Moyen Âge. Ken Follett mêle suspense, réalisme historique et profondeur psychologique dans un récit captivant.', 380, '2018-08-15 09:30:00', '0000-00-00 00:00:00', 42, 5),
(43, 'La Reine Margot', 6, 4.7, 'Au XVIe siècle, Marguerite de Valois est mariée au roi de Navarre pour sceller la paix entre catholiques et protestants. Alexandre Dumas raconte intrigues, trahisons et passions au sein de la cour de France, mêlant histoire et fiction avec intensité. La Reine Margot illustre les tensions religieuses et politiques d’une époque troublée, tout en explorant les ambitions personnelles et les amours contrariés.', 480, '2019-02-20 11:45:00', '2019-12-05 10:15:00', 43, 5),
(44, 'Germinal', 9, 4.6, 'Dans le nord de la France, Étienne Lantier s’engage dans la lutte des mineurs pour de meilleures conditions de travail. Émile Zola dépeint le quotidien difficile des ouvriers, les tensions sociales et la solidarité face à l’injustice. Roman naturaliste par excellence, Germinal allie réalisme brutal, critique sociale et profondeur humaine, offrant un tableau poignant des combats ouvriers au XIXe siècle.', 320, '2020-03-15 08:30:00', '0000-00-00 00:00:00', 44, 5),
(45, 'Quo Vadis', 5, 4.5, 'À Rome, sous le règne de Néron, l’amour entre le général romain Marcus Vinicius et la chrétienne Ligia se développe alors que la persécution des chrétiens s’intensifie. Henryk Sienkiewicz décrit avec intensité l’époque, mêlant passions, conflits politiques et spiritualité. Quo Vadis explore la confrontation entre pouvoir, foi et humanité dans un récit historique captivant.', 220, '2021-01-12 14:15:00', '2021-06-10 16:00:00', 45, 5),
(46, 'La Guerre et la Paix', 4, 4.4, 'Ce roman monumental de Tolstoï retrace les destins croisés de familles russes pendant les guerres napoléoniennes. À travers batailles, intrigues et relations humaines, Tolstoï explore les thèmes du destin, de la moralité et de la société. La richesse des personnages et le réalisme historique font de cette œuvre un chef-d’œuvre littéraire incontournable.', 420, '2019-09-10 12:00:00', '0000-00-00 00:00:00', 46, 5),
(47, 'Notre-Dame de Paris', 7, 4.6, 'Victor Hugo raconte l’histoire tragique de Quasimodo, le bossu de Notre-Dame, et de l’amour qu’il porte à Esmeralda. L’œuvre mêle passion, injustice sociale et architecture gothique, tout en décrivant la vie à Paris au XVe siècle. Le roman est une réflexion sur la différence, le destin et la société, avec une puissance narrative et poétique incomparable.', 520, '2018-04-20 10:30:00', '2018-10-10 09:00:00', 47, 5),
(48, 'Le Hussard sur le toit', 6, 4.3, 'Pendant l’épidémie de choléra en Provence, Angelo Pardi, jeune hussard italien, traverse la campagne en quête de sécurité et d’amour. Jean Giono mêle suspense, aventure et lyrisme poétique dans un récit vibrant où la nature, la peur et le courage façonnent le destin des personnages.', 200, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 48, 5),
(49, 'La Rose et la Croix', 5, 4.2, 'Ce roman plonge dans les sociétés secrètes et les mystères ésotériques de la France du XIXe siècle. Maurice Leblanc y mêle enquête, romance et suspense, en suivant des personnages fascinants pris dans un jeu de pouvoir et de secret. Une intrigue captivante où symboles et traditions anciennes nourrissent le récit.', 160, '2020-06-01 15:00:00', '2020-12-20 10:00:00', 49, 5),
(50, 'À l’ombre des jeunes filles en fleurs', 3, 4.5, 'Marcel Proust continue son exploration de la mémoire et des sentiments à travers le regard du narrateur sur l’aristocratie française et les jeunes filles de son entourage. Ce deuxième tome d’À la recherche du temps perdu est un voyage introspectif mêlant élégance, observations sociales et poésie subtile.', 280, '2021-08-10 09:45:00', '0000-00-00 00:00:00', 50, 5),
(51, 'Une brève histoire du temps', 9, 4.9, 'Stephen Hawking présente les concepts fondamentaux de la cosmologie moderne, expliquant les trous noirs, la relativité et l’origine de l’univers de manière accessible. L’auteur rend la science complexe compréhensible, mêlant rigueur et clarté, et invite le lecteur à réfléchir sur la nature du temps et de l’espace.', 520, '2017-09-01 10:00:00', '2025-11-24 21:27:49', 51, 6),
(52, 'Cosmos', 8, 4.8, 'Carl Sagan explore l’univers, de ses galaxies lointaines à la place de l’homme sur Terre, en mêlant science, philosophie et histoire. Cosmos est à la fois un ouvrage scientifique et poétique, encourageant la curiosité et la réflexion sur notre existence et notre place dans l’immensité de l’espace.', 420, '2018-02-15 09:30:00', '0000-00-00 00:00:00', 52, 6),
(53, 'Le Gène égoïste', 7, 4.7, 'Richard Dawkins explique comment la sélection naturelle agit principalement au niveau des gènes, et non des individus ou des espèces. L’ouvrage révolutionnaire offre une vision claire de l’évolution, illustrée par des exemples concrets et des concepts accessibles, tout en stimulant la réflexion sur la biologie et le comportement.', 380, '2019-05-10 11:45:00', '2020-01-20 10:15:00', 53, 6),
(54, 'L’Univers élégant', 6, 4.6, 'Brian Greene introduit la théorie des cordes et les concepts de physique moderne avec pédagogie, reliant cosmologie et mécanique quantique. L’auteur rend compréhensible la complexité de l’univers en expliquant les théories avancées tout en suscitant émerveillement et curiosité scientifique.', 300, '2020-03-15 08:30:00', '0000-00-00 00:00:00', 54, 6),
(55, 'Le Hasard et la Nécessité', 5, 4.5, 'Jacques Monod explore les mécanismes biologiques et l’évolution en démontrant que le hasard des mutations et la nécessité de la sélection naturelle façonnent la vie. L’ouvrage est une réflexion philosophique sur la science, le déterminisme et la place de l’homme dans le monde naturel.', 220, '2021-01-12 14:15:00', '2021-06-10 16:00:00', 55, 6),
(56, 'La Structure des révolutions scientifiques', 4, 4.4, 'Thomas Kuhn analyse la manière dont la science progresse par révolutions et changements de paradigmes plutôt que par évolution continue. L’ouvrage questionne les fondements de la connaissance scientifique et son développement, influençant profondément la philosophie des sciences.', 280, '2019-09-10 12:00:00', '0000-00-00 00:00:00', 56, 6),
(57, 'Le Cygne noir', 3, 4.3, 'Nassim Nicholas Taleb explore l’impact des événements rares et imprévisibles, les \"cygnes noirs\", sur l’histoire et la vie quotidienne. Il démontre que ces événements façonnent notre monde de manière souvent sous-estimée, et propose une réflexion sur la gestion de l’incertitude et la prise de décision.', 320, '2018-04-20 10:30:00', '2018-10-10 09:00:00', 57, 6),
(58, 'L’Ordre du temps', 4, 4.2, 'Carlo Rovelli nous invite à réfléchir sur la nature du temps, en expliquant les concepts de physique moderne qui le régissent. Le livre allie rigueur scientifique et clarté pédagogique, offrant une vision originale et fascinante du temps et de sa perception.', 300, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 58, 6),
(59, 'Sapiens Une brève histoire de l’humanité', 6, 4.7, 'Yuval Noah Harari retrace l’histoire de l’humanité, de l’apparition de Homo sapiens à nos sociétés contemporaines, en abordant les révolutions cognitive, agricole et scientifique. L’ouvrage combine histoire, anthropologie et philosophie, offrant une réflexion stimulante sur la culture, le pouvoir et l’évolution humaine.', 480, '2020-06-01 15:00:00', '2020-12-20 10:00:00', 59, 6),
(60, 'Histoire de l’art', 10, 4.8, 'Cet ouvrage propose une exploration complète de l’histoire de l’art, des civilisations antiques à l’art contemporain. L’auteur présente les mouvements artistiques, les techniques et les grands artistes, offrant au lecteur un panorama riche et structuré. L’ouvrage permet de comprendre l’évolution esthétique et culturelle à travers les siècles.', 320, '2017-05-10 10:00:00', '2018-07-20 11:00:00', 60, 7),
(61, 'La Vie des artistes', 9, 4.7, 'Giorgio Vasari retrace la vie et l’œuvre des grands artistes de la Renaissance italienne, mêlant biographies, anecdotes et analyses critiques. Cet ouvrage fondateur offre un regard à la fois historique et humain sur la création artistique, permettant de comprendre le contexte et les motivations des maîtres de l’art.', 170, '2018-08-15 09:30:00', '0000-00-00 00:00:00', 61, 7),
(62, 'L art de la couleur', 8, 4.6, 'Johann Wolfgang von Goethe explore la perception des couleurs, leur interaction et leur impact émotionnel. L’ouvrage combine philosophie, science et art, offrant des clés pour comprendre la couleur dans la peinture, la lumière et la nature, et son influence sur l’esprit humain.', 140, '2019-02-20 11:45:00', '2019-12-05 10:15:00', 62, 7),
(63, 'Le Musée imaginaire', 7, 4.5, 'André Malraux propose une réflexion sur l’art et la création, en analysant comment les œuvres d’art se répondent à travers le temps et l’espace. L’auteur invite le lecteur à concevoir un “musée imaginaire”, explorant les chefs-d’œuvre universels et leur impact sur la culture et l’histoire.', 220, '2020-03-15 08:30:00', '0000-00-00 00:00:00', 63, 7),
(64, 'Théorie de l’art moderne', 6, 4.4, 'Arnold Hauser examine les mouvements artistiques du XIXe et XXe siècle, en les inscrivant dans leur contexte social, économique et politique. L’ouvrage permet de comprendre l’évolution des idées et des formes, et la relation entre société et expression artistique dans l’art moderne.', 200, '2021-01-12 14:15:00', '2021-06-10 16:00:00', 64, 7),
(65, 'L esprit des formes', 5, 4.3, 'Gaston Bachelard explore la perception des formes et des espaces dans la création artistique et poétique. Il analyse comment la forme influence notre imagination et nos émotions, proposant une approche philosophique et esthétique de l’art.', 120, '2019-09-10 12:00:00', '0000-00-00 00:00:00', 65, 7),
(66, 'Ways of Seeing', 4, 4.5, 'John Berger invite le lecteur à repenser la manière dont nous regardons l’art et le monde. À travers essais et images, il démontre comment contexte, culture et idéologie influencent notre perception, et propose une critique accessible et stimulante de la représentation visuelle.', 240, '2018-04-20 10:30:00', '2018-10-10 09:00:00', 66, 7),
(67, 'La Condition de l’image', 3, 4.2, 'Jean-François Lyotard analyse la signification et l’impact des images dans la société contemporaine. Il explore les transformations de la perception à travers les médias et les arts, offrant une réflexion philosophique sur la culture visuelle et l’expérience esthétique.', 200, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 67, 7),
(68, 'Les Animaux Fantastiques', 6, 4.4, 'Newt Scamander, magizoologiste, parcourt le monde pour étudier et protéger des créatures magiques rares. Le livre mélange aventure, humour et imagination, en dévoilant un univers riche et détaillé qui complète l’univers de Harry Potter. Les lecteurs découvrent les caractéristiques, comportements et pouvoirs des animaux fantastiques.', 450, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 33, 4),
(69, 'Blanc mortel', 7, 3.4, 'Un thriller haletant où des crimes mystérieux se succèdent, plongeant le lecteur dans une enquête complexe. Entre suspense, fausses pistes et rebondissements, l’histoire explore les motivations humaines et les secrets enfouis, dans un cadre sombre et captivant.', 150, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 33, 1),
(70, 'Jack et la Grande Aventure du Cochon de Noël', 2, 5, 'Jack vit une aventure extraordinaire lorsqu’un cochon magique apparaît à Noël. Ce roman pour enfants mêle humour, fantaisie et leçons de courage et d’amitié, offrant un récit joyeux et imaginatif qui captive les jeunes lecteurs.', 200, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 33, 4),
(71, 'Harry Potter et le Prince de sang-mêlé', 1, 3.5, 'Harry découvre un mystérieux livre de potions appartenant au Prince de sang-mêlé et doit affronter de sombres secrets. Ce sixième tome explore l’adolescence, la magie, l’amitié et la lutte contre Voldemort, avec une intrigue plus sombre et des révélations cruciales sur l’histoire des personnages.', 700, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 33, 4),
(72, 'Harry Potter et la Chambre des secrets', 8, 4.5, 'Harry retourne à Poudlard pour sa deuxième année et découvre l’existence de la Chambre des secrets. Entre mystères, créatures magiques et menaces inquiétantes, il doit protéger ses camarades et comprendre le passé de l’école. Une aventure pleine de suspense et de magie.', 750, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 33, 4),
(73, 'La Carrière du mal', 7, 1.5, 'Le détective Cormoran Strike enquête sur une série de meurtres particulièrement brutaux. L’histoire mêle suspense, psychologie des personnages et enquête minutieuse, offrant un thriller policier sombre et captivant, où chaque indice rapproche le lecteur de la vérité.', 250, '2017-12-15 11:15:00', '0000-00-00 00:00:00', 33, 1);

-- --------------------------------------------------------

--
-- Structure de la table `book_users`
--

CREATE TABLE `book_users` (
  `id` int(11) NOT NULL,
  `take_at` datetime DEFAULT NULL,
  `deposit_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `bookId` int(11) DEFAULT NULL,
  `take` tinyint(1) DEFAULT 0,
  `deposit` tinyint(1) DEFAULT 0,
  `updateDeposit` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `book_users`
--

INSERT INTO `book_users` (`id`, `take_at`, `deposit_at`, `createdAt`, `updatedAt`, `userId`, `bookId`, `take`, `deposit`, `updateDeposit`) VALUES
(1, '2025-11-29 23:00:00', '2025-11-30 21:00:00', '2025-11-24 21:27:49', '2025-11-24 21:27:49', 2, 51, 0, 0, 0),
(2, '2025-11-26 00:00:00', '2025-11-30 22:00:00', '2025-11-24 22:10:53', '2025-11-24 22:10:53', 2, 15, 0, 0, 0),
(3, '2025-11-30 00:00:00', '2025-11-30 22:00:00', '2025-11-24 22:53:19', '2025-11-24 22:53:19', 2, 11, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Policier', '2025-10-17 10:43:37', '2025-10-17 10:43:37'),
(2, 'Science-fiction', '2025-10-17 10:43:37', '2025-10-17 10:43:37'),
(3, 'Bandes dessinées', '2025-10-17 10:43:37', '2025-10-17 10:43:37'),
(4, 'Jeunesse', '2025-10-17 10:43:37', '2025-10-17 10:43:37'),
(5, 'Historique', '2025-10-17 10:43:37', '2025-10-17 10:43:37'),
(6, 'Sciences', '2025-10-17 10:43:37', '2025-10-17 10:43:37'),
(7, 'Arts', '2025-10-17 10:43:37', '2025-10-17 10:43:37');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`userId`, `bookId`, `createdAt`, `updatedAt`) VALUES
(2, 15, '2025-11-24 19:11:02', '2025-11-24 19:11:02');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `abonnementType` enum('Passion','Découverte') NOT NULL,
  `actif` tinyint(1) DEFAULT NULL,
  `actifToken` varchar(255) DEFAULT NULL,
  `expToken` datetime DEFAULT NULL,
  `tokenAdmin` varchar(255) DEFAULT NULL,
  `abonnement` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `address`, `postalCode`, `country`, `phone`, `role`, `createdAt`, `updatedAt`, `abonnementType`, `actif`, `actifToken`, `expToken`, `tokenAdmin`, `abonnement`) VALUES
(1, 'user1', 'user1@gmail.com', '$2b$10$tQP4gO1vxkTCAR3T/L1m.usH31H9bSNWUEMWeUNZrn99/QaNIDaSK', 'adresse user1', '16000', 'Angouleme', '0600000000', 0, '2025-09-26 14:54:30', '2025-09-26 14:54:30', NULL, 1, NULL, NULL, NULL, NULL),
(2, 'user', 'user2@gmail.com', '$2b$10$7e9cyDdeca6JSM/gmC1RZeBhcmfmrZm3Gl12yK7.dYfXGF80gl3FK', 'adresse user2', '16000', 'Angouleme', '0600000001', 0, '2025-09-26 14:54:36', '2025-11-24 21:16:36', NULL, 1, NULL, NULL, NULL, '2026-11-24 19:31:22'),
(3, 'admin', 'admin1@gmail.com', '$2b$10$U4GKvtXOHhr9Jz6VsoYPFeqKcUb/dKz0cLEQB421WPJn0uNlXT0jG', 'adresse amin', '16000', 'Angouleme', '0600000002', 1, '2025-09-26 14:54:49', '2025-11-24 23:51:17', NULL, 1, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNS0xMS0yNFQyMzo1MToxNy41NjdaIiwiaXAiOlt7ImlwIjoiOjoxIiwiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIiwiYXR0ZW1wdENvdW50IjowLCJiYW4iOmZhbHNlfV0sInVzZXJJZCI6MywiaWF0IjoxNzY0MDI4Mjc3LCJleHAiOjE3NjQwNzE0Nzd9.I8sOOUS8g', '2025-11-24 18:42:33'),
(4, 'test', 'test@gmail.com', '$2b$10$4rrtqfEidUErRBz5zgwjreObYtx83KguS0Xq8lhgCV.0V6UshvtXe', 'test', '16000', 'angouleme', '052505', 1, '2025-11-24 12:42:38', '2025-11-24 18:40:52', '', 0, '&bWmeoje[dmkW([s', '2025-11-24 14:42:38', NULL, '2025-11-24 18:40:52'),
(5, 'test', 'test@gmail.com', '$2b$10$AzucmTNmP1QInRnIXh7Pfu6O9HnzrghITr0IPp4ZFIOXFBV3cG3lW', 'test', '16000', 'angouleme', 'u', 0, '2025-11-24 12:47:02', '2025-11-24 18:59:42', '', 0, '#lekhY<T[|I[uRG.', '2025-11-24 14:47:02', NULL, '0000-00-00 00:00:00'),
(6, 'Conan Doyle', 'a@a.fr', '$2b$10$iEQWY9PnoQpabc2bk01rzeuR9qqjWNH.gKhr9st4a.1eR87mZNgZ6', 'angouleme', '16000', 'angoumek', 'u', 0, '2025-11-24 13:12:55', '2025-11-24 22:09:02', '', 0, '|5KM14Nyc/|;pLGa', '2025-11-24 15:12:55', NULL, '2025-11-24 18:43:31'),
(7, 'Conan Doyle', 'a@a.fr', '$2b$10$Cr72kBK4K2ZmvUxhCDhgG.Wh7BAOHNUkI25WPBlVLx53eRhY4zio.', 'angouleme', '16000', 'angoumek', ' ', 0, '2025-11-24 13:13:45', '2025-11-24 18:59:45', '', 0, '~@.@LF6.Vq^5g<yy', '2025-11-24 15:13:45', NULL, '0000-00-00 00:00:00'),
(8, 'admin1', 'user2@gmail.com', '$2b$10$Hpx55hgjSNhFzzJZGPJSnedT4BtLiWHKTMjikTl4JL3JZYO2P/Or6', 'a', '16000', 'Arthur', NULL, 0, '2025-11-24 13:24:46', '2025-11-24 13:24:46', '', 0, 'Pt3h/];`Z_c*$3_Y', '2025-11-24 15:24:46', NULL, NULL),
(9, 'aaa', 'a@a.fr', '$2b$10$KZBG7h4F3g0ZoEpARGGnqO12Ma4lfApWC88lGMYgGDv8WSQwPXn/e', 'Arthur', '16000', 'angouleme', ' ', 0, '2025-11-24 13:41:30', '2025-11-24 19:06:35', '', 0, '2qrOUgftKD(rw@DQ', '2025-11-24 15:41:30', NULL, '2025-11-24 19:06:35'),
(10, 'qee', 'usert@gmail.com', '$2b$10$n4O5gPhYCl5R9fHow/ybeO9DrlBfqYEA0bPs0WaDBQduUiWg5qTq2', '30 rue du', '16000', 'angouleme', '00', 0, '2025-11-24 14:29:51', '2025-11-24 18:44:42', '', 0, '0X?$4M#)b=]-MzG=', '2025-11-24 16:29:51', NULL, '2025-11-24 18:44:42'),
(14, 'ruedu', 'logo@hr.fr', '$2b$10$g.P8/xw2Ei9xtMVyHzBgv.mUJ5dj61PIlTcYGKYXKUS1gOzMozIte', 'angouleme hnn', '16000', 'tyrtynhn', '0', 0, '2025-11-24 14:52:59', '2025-11-24 18:46:50', 'Découverte', 0, '$2b$10$BFArmzLsxKrbl9EWPzgXUekGS0wM9QKYuQreQ36lebCU6BISW7Lmq', '2025-11-24 16:52:59', NULL, '2025-11-24 18:46:50');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lastname` (`lastname`),
  ADD UNIQUE KEY `lastname_2` (`lastname`),
  ADD UNIQUE KEY `lastname_3` (`lastname`),
  ADD UNIQUE KEY `lastname_4` (`lastname`),
  ADD UNIQUE KEY `lastname_5` (`lastname`),
  ADD UNIQUE KEY `lastname_6` (`lastname`),
  ADD UNIQUE KEY `lastname_7` (`lastname`),
  ADD UNIQUE KEY `lastname_8` (`lastname`),
  ADD UNIQUE KEY `lastname_9` (`lastname`),
  ADD UNIQUE KEY `lastname_10` (`lastname`),
  ADD UNIQUE KEY `lastname_11` (`lastname`),
  ADD UNIQUE KEY `lastname_12` (`lastname`),
  ADD UNIQUE KEY `lastname_13` (`lastname`),
  ADD UNIQUE KEY `lastname_14` (`lastname`),
  ADD UNIQUE KEY `lastname_15` (`lastname`);

--
-- Index pour la table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Index pour la table `book_users`
--
ALTER TABLE `book_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Book_Users_bookId_userId_unique` (`userId`,`bookId`),
  ADD KEY `bookId` (`bookId`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`userId`,`bookId`),
  ADD UNIQUE KEY `Likes_bookId_userId_unique` (`userId`,`bookId`),
  ADD KEY `bookId` (`bookId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT pour la table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT pour la table `book_users`
--
ALTER TABLE `book_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_10` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_4` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_6` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_8` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_9` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `book_users`
--
ALTER TABLE `book_users`
  ADD CONSTRAINT `book_users_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_10` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_12` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_14` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_16` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_18` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_20` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_21` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_23` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_25` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_27` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_28` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_30` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_32` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_34` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_35` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `book_users_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
