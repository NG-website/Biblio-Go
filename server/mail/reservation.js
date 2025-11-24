const reservation =(bookName, takeAt, depositAt)=>{
    return(
`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
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
            BiblioNico
        </div>

        <div style="
        width: 80%; 
        background-color: rgb(245, 202, 142);
        display: flex;
        flex-direction: column;
        align-items: center;
        ">
            <p style="
            width: 95%;
            font-size: 30px;
            text-align: center;
            ">
                Vous avez reserver
            </p>
            <p style="
            width: 95%;
            font-size: 30px;
            text-align: center;
            ">
                ${bookName}
            </p>
            <img src="cid:bookImage" alt="" style="
             width: 200px;
             height: 350px;
             ">
            <hr style="
            height: 1px;
             width: 80%;
             ">
            <div style="
             display: flex;
             justify-content: space-between;
             width: 80%;
             ">
                <div>date de retrait</div>
                <div>date de rendu</div>
            </div>
            <hr style="
            height: 1px;
             width: 80%;
             ">
            <div style="
             display: flex;
             justify-content: space-between;
             width: 80%;
             ">
                <div style="
                 display: flex;
                 flex-direction: column;
                 font-size: 30px;
                 padding: 20px;
                 align-items:center;
                 justify-content:center;
                 ">
                    <div>${takeAt[0]}</div>
                    <div>${takeAt[1]}</div>
                    <div>${takeAt[2]}</div>
                    <div>${takeAt[3]}</div>
                    <div>${takeAt[4]}</div>
                    <div>${takeAt[5]}</div>
                </div>
                <div style="
                 display: flex;
                 flex-direction: column;
                 font-size: 30px;
                 padding: 20px;
                 align-items:center;
                 justify-content:center;
                 ">
                    <div>${depositAt[0]}</div>
                    <div>${depositAt[1]}</div>
                    <div>${depositAt[2]}</div>
                    <div>${depositAt[3]}</div>
                    <div>${depositAt[4]}</div>
                    <div>${depositAt[5]}</div>
                </div>

            </div>
            <hr style="
            height: 1px;
            width: 80%;
            ">

            <div style="
        width: 100%; 
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
</html>`)
}
export default reservation