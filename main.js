//Service worker
if('serviceWorker' in navigator){
    console.log('Puedes usar los serviceWorker en tu navegador');
    navigator.serviceWorker.register('./sw.js')
                    .then(res => console.log('ServiceWorker cargado correctamente',res))
                    .catch(err => console.log('Service worker no se ha podido registrar', err));
}else{
    console.log('No puedes usar los serviceWorker en tu navegador');
}

//scroll suavizado
$(document).ready(function(){
    
    $("#menu a").click(function(e){
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });

});