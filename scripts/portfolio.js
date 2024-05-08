window.onload = function () {

    const dialog = document.getElementById("dlgExtra");

    document.getElementById("timelineSTFC").onclick = function () {
        document.getElementById("lblExtraTitle").innerHTML="Software Engineer";
        document.getElementById("lblExtraLoc").innerHTML="STFC";
        document.getElementById("textExtraInfo").innerHTML="This is more info about my time at STFC";

        dialog.showModal();
    };
    document.getElementById("timelineLboro").onclick = function () {
        document.getElementById("lblExtraTitle").innerHTML="Computer Science Student";
        document.getElementById("lblExtraLoc").innerHTML="Loughborough University";
        document.getElementById("textExtraInfo").innerHTML="This is more info about my time at Loughborough University";

        dialog.showModal();
    };

    

    document.getElementById("btnDlgExtra").onclick = function() {
        dialog.close();
    }
};
