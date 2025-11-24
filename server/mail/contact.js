const contact = (userFirstname, userLastname, userEmail, userMessage) => {
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
            <p>Un utilisateur souhaite entrer en contact avec vous</p>
        </div>

        <div style=" width: 80%; background-color: rgb(245, 202, 142); display: flex; flex-direction: column;
                align-items: center; ">
            <p style=" width: 95%; font-size: 30px; text-align: center; ">
             ${userFirstname + " " + userLastname} 
            
            </p>
            <p style=" width: 95%; font-size: 20px; text-align: center; ">
             ${userEmail} 
            </p>

            <hr style="
            height: 1px;
             width: 80%;
             ">
            <p style=" width: 95%; font-size: 20px; text-align: center; ">
            message :
            </p>
            <p style=" width: 95%; font-size: 20px; text-align: center; ">
             ${userMessage} 
            </p>
        </div>
</body>

</html>`
    )
}
export default contact