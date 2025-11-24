const comfirmation = (userName, link) => {
    return (
`<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Bienvenue à la Bibliothèque de Nico !</title>
</head>

<body style="margin:0; padding:0; font-family: Arial, sans-serif;">

    <div style="       
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        ">

        <div style="
        width: 80%; 
        background-color: rgb(236, 165, 66);
        text-align: center;
        align-content: center;
        font-size: 45px;
        ">
            <img src="cid:logo" alt="" style="width: 100px;
             height: 100px;
             ">
            <p>Bienvenue ${userName}</p>
        </div>

        <div style=" width: 80%; background-color: rgb(245, 202, 142); display: flex; flex-direction: column;
                align-items: center; ">
            <p style=" width: 95%; font-size: 30px; text-align: center; ">
                Pour finaliser votre inscription, merci de confirmer votre adresse e-mail
            </p>

            <hr style="
            height: 1px;
             width: 80%;
             ">

            <a href="${link}" style="background-color:rgb(236,165,66); color:white; padding:10px 20px; border-radius:5px; text-decoration:none; font-size:18px; margin:20px 0;">
                Confirmer mon adresse e-mail
            </a>
             
            <p style=" width: 95%; font-size: 16px; text-align: center; ">
                Ce lien est valable 1 heure pour des raisons de sécurité.
            </p>

           <hr style="
            height: 1px;
             width: 80%;
             ">
             
            <div style="
        width: 80%; 
        background-color: rgb(236, 165, 66);
        text-align: center;
        align-content: center;
        font-size: 30px;
        ">
                <p>60 Rue du Capitaine Favre, 16000 Angoulême</p>
                <p>05 45 61 78 30</p>
            </div>
        </div>
</body>
</html>`
    )
}
export default comfirmation