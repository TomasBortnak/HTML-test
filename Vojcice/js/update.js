var $frm = $("#frmArt");

//Pridanie funkcionality pre kliknutie na tlacidlo "UloĹľ ÄŤlĂˇnok"
$frm.submit(function(event){  //tu potrebujem aj objekt s udalosĹĄou, aby som
    event.preventDefault(); //zruĹˇiĹĄ pĂ´vodnĂ© spracovanie udalosti
    skontrolujAOdosli();
});

function skontrolujAOdosli(){
    //1. UloĹľĂ­ Ăşdaje z formulĂˇra do objektu
    var data = {};
    $frm.serializeArray().map(
        function(item){
            var itemValueTrimmed = item.value.trim();
            if(itemValueTrimmed){//ak je hodnota neprĂˇzdny reĹĄazec
                data[item.name] = itemValueTrimmed;
            }
        }
    );

    console.log("skontrolujAOdosli> Ăšdaje po uloĹľenĂ­ z formulĂˇra do objektu:");
    console.log(JSON.stringify(data));

    //3.Kontrola, ÄŤi boli zadanĂ© povinnĂ© polia
    if(!data.title){ //toto len pre istotu
        alert("NĂˇzov ÄŤlĂˇnku musĂ­ byĹĄ zadanĂ˝ a musĂ­ obsahovaĹĄ ÄŤitateÄľnĂ© znaky");
        return;
    }
    if(!data.content){ //toto je dĂ´leĹľitĂ©, keÄŹĹľe na textarea sa nedĂˇ pouĹľiĹĄ pattern. OdchytĂ­, keÄŹ pouĹľĂ­vateÄľ do prvku content
        //zadal iba biele znaky
        alert("Obsah ÄŤlĂˇnku musĂ­ byĹĄ zadanĂ˝ a musĂ­ obsahovaĹĄ ÄŤitateÄľnĂ© znaky.");
        return;
    }


    data.content = "<div>" + data.content + "</div>";
    switch (data.zaner) {
        case "a": data.content += "<p>Tento clanok je: Prispevok o obci</p>"; break;
        case "b": data.content += "<p>Tento clanok je: oznam</p>"; break;
        case "c": data.content += "<p>Tento clanok je: dianie v obci</p>"; break;
        case "d": data.content += "<p>Tento clanok je: inzerat</p>"; break;
        case "e": data.content += "<p>Tento clanok je: staznost</p>"; break;
    }

    data.content = "<div>" + data.content + "</div>";
    switch(data.nalada){
        case "0": data.content += "<p>Vo Vojciciach netravim vela casu. </p>"; break;
        case "1": data.content += "<p>Vo Vojciciach sa mi nepaci.  </p>"; break;
        case "2": data.content += "<p>Vo Vojciciach sa mi paci.  </p>"; break;
    }
    delete data.nalada;

    data.content = "<div>" + data.content + "</div>";
    if (data.jedloR) {
        data.content += "<p>V obci mam trvaly pobyt. </p>";
    } if (data.jedloO) {
        data.content += "<p>V obci mam chatu. </p>";
    } if (data.jedloV) {
        data.content += "<p>Do obce chodim za rodinou. </p>";
    }

    console.log("prepareAndSendArticle> PovinnĂ© Ăşdaje ĂşspeĹˇne skontrolovanĂ©:");

    //4. odoslanie Ăşdajov
    if(window.confirm("SkutoÄŤne si ĹľelĂˇte ÄŤlĂˇnok odoslaĹĄ?")){
        $.ajax({
            type: "POST",
            url: "http://wt.kpi.fei.tuke.sk/api/article",
            contentType:"application/json;charset=UTF-8",
            dataType: "json",
            data:JSON.stringify(data),
            success: function (response) {
                if(response.id){
                    console.log(response.id);
                    window.alert("ÄŚlĂˇnok ĂşspeĹˇne uloĹľenĂ˝ s id=" + response.id + ".");
                    window.open('http://hron.fei.tuke.sk/~korecko/WebTechAkademia/wtKpiBlogBrowser/article.html?id='+response.id, '_blank');
                    $frm.trigger('reset');
                }
            },
            error: function (jxhr) {
                window.alert("Spracovanie neĂşspeĹˇnĂ©. Ăšdaje neboli zapĂ­sanĂ©. KĂłd chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });

    }
}

